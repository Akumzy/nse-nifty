// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'

import axios from 'axios'
const url_oc = "https://www.nseindia.com/option-chain"
// Init instance of axios which works with BASE_URL
const axiosInstance = axios.create({ baseURL: url_oc })

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<OptionsAPIResponse | { error: any }>
) {
  try {
    // const response = await fetch(`https://www.nseindia.com/api/option-chain?symbol=${req.query.symbol}&expiry=${req.query.expiry}`)

    const { data } = await axiosInstance.get<NSEOptionChainResponse>(`https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY`, {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,en-GB;q=0.8",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "Referer": "https://www.nseindia.com/option-chain",
      },

    })
    if (!data) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    let filtered = data.filtered.data
    let underlyingValue = data.records.underlyingValue
    let timestamp = data.records.timestamp
    // find the option that is closest to the strike price
    let closest = filtered.reduce((prev, curr, index) => {
      let prevDiff = Math.abs(prev.strikePrice - underlyingValue)
      let currDiff = Math.abs(curr.strikePrice - underlyingValue)
      return prevDiff < currDiff ? prev : curr
    }
      , filtered[0])
    // find 10 closest options before and after the closest option
    let startStrikePrice = closest.strikePrice - (50 * 10)
    let endStrikePrice = closest.strikePrice + (50 * 10)
    let startIndex = filtered.findIndex(option => option.strikePrice >= startStrikePrice)
    let endIndex = filtered.findIndex(option => option.strikePrice >= endStrikePrice)
    let options = filtered.slice(startIndex, endIndex + 1)

    res.status(200).json(({
      filtered: {
        ...data.filtered,
        data: options
      },
      underlyingValue: data.records.underlyingValue,
      timestamp: data.records.timestamp,
      currentStrikePrice: closest.strikePrice
    }))

  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error })
  }

}


const createSession = async () => {

  const resp = await axios.get(url_oc)
  const [cookie] = resp.headers["set-cookie"] || []// getting cookie from request
  // @ts-ignore
  axiosInstance.defaults.headers.Cookie = cookie // attaching cookie to axiosInstance for future requests
  return cookie // return Promise<cookie> because func is async
}

let isGetActiveSessionRequest = false
let requestQueue: any[] = []

const callRequestsFromQueue = (cookie: string) => {
  requestQueue.forEach(sub => sub(cookie))
}
const addRequestToQueue = (sub: (cookie: any) => void) => {
  requestQueue.push(sub)
}
const clearQueue = () => {
  requestQueue = []
}

// registering axios interceptor which handle response's errors
// @ts-ignore
axiosInstance.interceptors.response.use(null, error => {
  console.error(error.message) //logging here

  const { response = {}, config: sourceConfig } = error

  // checking if request failed cause Unauthorized
  if (response.status === 401) {
    // if this request is first we set isGetActiveSessionRequest flag to true and run createSession
    if (!isGetActiveSessionRequest) {
      isGetActiveSessionRequest = true
      createSession().then(cookie => {
        // when createSession resolve with cookie value we run all request from queue with new cookie
        isGetActiveSessionRequest = false
        callRequestsFromQueue(cookie)
        clearQueue() // and clean queue
      }).catch(e => {
        isGetActiveSessionRequest = false // Very important!
        console.error('Create session error %s', e.message)
        clearQueue()
      })
    }

    // and while isGetActiveSessionRequest equal true we create and return new promise
    const retryRequest = new Promise(resolve => {
      // we push new function to queue
      addRequestToQueue(cookie => {
        // function takes one param 'cookie'
        console.log("Retry with new session context %s request to %s", sourceConfig.method, sourceConfig.url)
        sourceConfig.headers.Cookie = cookie // setting cookie to header
        resolve(axios(sourceConfig)) // and resolve promise with axios request by old config with cookie
        // we resolve exactly axios request - NOT axiosInstance's request because it could call recursion
      })
    })

    return retryRequest
  } else {
    // if error is not related with Unauthorized we just reject promise
    return Promise.reject(error)
  }
})