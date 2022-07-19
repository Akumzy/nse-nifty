// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from 'undici'

import { exec, spawn } from 'child_process'
const url_oc = "https://www.nseindia.com/option-chain"

let cookie = ""
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<OptionsAPIResponse | { error: any }>
) {
  try {
    // const response = await fetch(`https://www.nseindia.com/api/option-chain?symbol=${req.query.symbol}&expiry=${req.query.expiry}`)
    if (cookie === "") {
      const cookie_response = await fetch(url_oc)
      cookie = cookie_response.headers.get("set-cookie") || ""
    }


    const response = await fetch("https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY", {
      "headers": {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
        'cookie': cookie,
        "accept-language": "en-US,en;q=0.9,en-GB;q=0.8",
        "referer": "https://www.nseindia.com/option-chain",
      },
      "method": "GET"
    })
    const data = (await response.json()) as NSEOptionChainResponse

    console.log(data)
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


// function execute (command: string, callback: { (resp: any): void; (arg0: string): void }) {
//   exec(command, {
//     maxBuffer: 1024 * 1000 * 10
//   }, function (error, stdout, stderr) {
//     callback(stdout)
//   })
// };

// function isJson (text: string) {
//   try {
//     return JSON.parse(text)
//   } catch (err) {
//     return false
//   }
// }

// function getOptionChain (instrument: string) {
//   return new Promise((resolve, reject) => {
//     execute(`curl 'https://www.nseindia.com/api/option-chain-indices?symbol=${instrument}' \
//     -H 'authority: www.nseindia.com' \
//     -H 'cache-control: max-age=0' \
//     -H 'dnt: 1' \
//     -H 'upgrade-insecure-requests: 1' \
//     -H 'user-agent: Mozilla/5.0 (X11; CentOS; Linux x86_64; rv:36.0) Gecko/20100101 Firefox/36.0' \
//     -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
//     -H 'sec-fetch-site: none' \
//     -H 'sec-fetch-mode: navigate' \
//     -H 'sec-fetch-user: ?1' \
//     -H 'sec-fetch-dest: document' \
//     -H 'accept-language: en-IN,en;q=0.9,en-GB;q=0.8,en-US;q=0.7,hi;q=0.6,mr;q=0.5' \
//     --compressed`, function (resp: any) {

//       let isValidData = isJson(resp)
//       if (isValidData) {
//         resolve(isValidData)
//       } else {
//         resolve(null)
//       }
//     })

//   })
// }
