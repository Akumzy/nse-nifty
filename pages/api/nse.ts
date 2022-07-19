// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<OptionsAPIResponse | { error: any }>
) {
  try {
    // const response = await fetch(`https://www.nseindia.com/api/option-chain?symbol=${req.query.symbol}&expiry=${req.query.expiry}`)


    const { data } = await axios.get<NSEOptionChainResponse>(`https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY`, {
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
        "Referrer-Policy": "strict-origin-when-cross-origin"
      }
    })
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
