// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next"

import puppeteer from "puppeteer-extra"

const url_oc = "https://www.nseindia.com/option-chain"
import StealthPlugin from "puppeteer-extra-plugin-stealth"
puppeteer.use(StealthPlugin())
export default async function handler(req: NextApiRequest, res: NextApiResponse<OptionsAPIResponse | { error: any }>) {
  try {
    // const response = await fetch(`https://www.nseindia.com/api/option-chain?symbol=${req.query.symbol}&expiry=${req.query.expiry}`)
    const data = await fetchRecords()

    if (!data) {
      res.status(404).json({ error: "Not found" })
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
    }, filtered[0])
    // find 10 closest options before and after the closest option
    let startStrikePrice = closest.strikePrice - 50 * 10
    let endStrikePrice = closest.strikePrice + 50 * 10
    let startIndex = filtered.findIndex((option) => option.strikePrice >= startStrikePrice)
    let endIndex = filtered.findIndex((option) => option.strikePrice >= endStrikePrice)
    let options = filtered.slice(startIndex, endIndex + 1)

    res.status(200).json({
      filtered: {
        ...data.filtered,
        data: options,
      },
      underlyingValue: data.records.underlyingValue,
      timestamp: data.records.timestamp,
      currentStrikePrice: closest.strikePrice,
    })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error })
  }
}

async function fetchRecords() {
  console.log("Launching browser...")
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] })
  try {
    const page = await browser.newPage()

    await page.goto(url_oc, {
      waitUntil: "networkidle2",
    })
    const res = await page.evaluate(async () => {
      const res = await fetch("https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY", {
        method: "GET",
        credentials: "include",
      })
      return res.json()
    })

    return res as NSEOptionChainResponse
  } catch (error) {
    console.log(error)
  } finally {
    await browser.close()
    console.log("Browser closed")
  }
}
