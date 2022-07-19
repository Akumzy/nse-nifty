// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from 'next'
import { fetch } from 'undici'

import { exec, spawn } from 'child_process'


export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<OptionsAPIResponse | { error: any }>
) {
  try {
    // const response = await fetch(`https://www.nseindia.com/api/option-chain?symbol=${req.query.symbol}&expiry=${req.query.expiry}`)


    // const response = await fetch("https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY", {
    //   "headers": {
    //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
    //     "accept": "*/*",
    //     "accept-language": "en-US,en;q=0.9,en-GB;q=0.8",
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": "\"macOS\"",
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-origin",
    //     "Referer": "https://www.nseindia.com/option-chain",
    //     "Referrer-Policy": "strict-origin-when-cross-origin"

    //   },
    //   "body": null,
    //   "method": "GET"
    // })
    const data = (await getOptionChain('NIFTY')) as NSEOptionChainResponse
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


function execute (command: string, callback: { (resp: any): void; (arg0: string): void }) {
  exec(command, {
    maxBuffer: 1024 * 1000 * 10
  }, function (error, stdout, stderr) {
    callback(stdout)
  })
};

function isJson (text: string) {
  try {
    return JSON.parse(text)
  } catch (err) {
    return false
  }
}

function getOptionChain (instrument: string) {
  return new Promise((resolve, reject) => {
    execute(`curl 'https://www.nseindia.com/api/option-chain-indices?symbol=${instrument}' \
    -H 'authority: www.nseindia.com' \
    -H 'cache-control: max-age=0' \
    -H 'dnt: 1' \
    -H 'upgrade-insecure-requests: 1' \
    -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1' \
    -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
    -H 'sec-fetch-site: none' \
    -H 'sec-fetch-mode: navigate' \
    -H 'sec-fetch-user: ?1' \
    -H 'sec-fetch-dest: document' \
    -H 'accept-language: en-IN,en;q=0.9,en-GB;q=0.8,en-US;q=0.7,hi;q=0.6,mr;q=0.5' \
    --compressed`, function (resp: any) {
      let isValidData = isJson(resp)
      if (isValidData) {
        resolve(isValidData)
      } else {
        resolve(null)
      }
    })

  })
}
