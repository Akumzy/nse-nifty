// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse<OptionsAPIResponse | { error: any }>
) {
  console.log('Fetching NSE data...')
  try {
    const resp = await (fetch("https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,en-GB;q=0.8",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "ak_bmsc=000FFF088CDCDCBB46ADA2116321F1F5~000000000000000000000000000000~YAAQEQ8DF7MUQPGBAQAAvBEhFhC7oN01phRzsYxIlsHKVkJOukNXNLm17mUHTKb8HbCbJMcfQhrxWxQo3c7e6D5bSNVeezuANGYNeS5DfNdD3XC21hWT63mQ8qXp5PdzpDCiNBOklofwqPnFS5aWixjPI6lNZ/y9SesjHxAofjsivMJcABkg4akvDgk0aUrdmQS1nOqPnTatK8xXOu97EnLJMx+69RuWid4tdBbwz+jRo0dq1nGfFO2bTKoJ1OeIFW2hGnD6omu5yXrzpm90FdnXWt4K1KiHvP3/O9XFO7NRVomaq4D1dox/r8jFh7iK9le8vUjx0O2luxZRLF00PeCGjwvWNI32ecH9KL6Rjjjcli/aK7fqb++7hcACZFUkkMIEQl+miHCAtj7wFw==; nsit=eUqUptszRYHi4UguPpkevxQO; nseappid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhcGkubnNlIiwiYXVkIjoiYXBpLm5zZSIsImlhdCI6MTY1ODIyODY0NiwiZXhwIjoxNjU4MjMyMjQ2fQ._rSl0BOPGcqOYSAP6i6iBVc6zCp4j7v4QRV3qFIjMpw; AKA_A2=A; bm_mi=B8020A2D403052DC3C1EE334AD478B24~YAAQEQ8DF9YWQPGBAQAA4CQhFhD4Ti48sSZylcXsbA2PYz1vqNgSJZtpWSpnkjmWIzIo51dZYMeftZsbAos2W+Gizz9E58PLOPN+hTNkQpzhIvzBeBzOHBEUGp2d8Gvgh4qltGbEZ1V4TPNOOMmo91589DbRwx7J7ifNH7vDI4HP0TVstBIuDpze8kfzfLEPO2OBdC9M4gZ5CIouQpz+Y7lUhQOUi+nZ2Z+l4KU8EGu4A9OpNEDcyPye6X8MZN41MmdUl+scCVplUPgUqL9WiLNW8CAAvu5xg5OIr6pjeFG0OzncHgbYNdTN1DVU8ZwEfJQYaCew9U3nUrR/~1; _ga=GA1.1.1421472574.1658228649; RT=\"z=1&dm=nseindia.com&si=44e5f8e6-62e7-4d7c-a720-04ab01042f00&ss=l5rt59in&sl=0&tt=0&bcn=%2F%2F02179914.akstat.io%2F&nu=kpaxjfo&cl=9ds7o\"; _ga_PJSKY6CFJH=GS1.1.1658228647.7.1.1658228658.49; bm_sv=10E6A7BA6A2E3C891E4E2762072C3A90~YAAQEQ8DF1YaQPGBAQAAeVMhFhBYJ+yQKl3SnF85QxrMiUU9nVv1xpGcwJhHs7i6R1Fc4D4tNFatim65/SG6My//W2eeM6Snez8xGsop7+WZJKvXTJIiemT68X4tlDN6L43ADLsIbYJ02P4/FPHDvv5SSYzxxg0WmuD1Oy7ODfBxbrA5MRHxlR845JFBBG+N0e6VLCPXQI6ez4PGOZ/isupwY/znH7gCvdvJ/d7JhV5h9uLkWtK3DRa+fPlc6mvjYJg=~1",
        "Referer": "https://www.nseindia.com/option-chain",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then(res => res.json())) as NSEOptionChainResponse
    let filtered = resp.filtered.data
    let underlyingValue = resp.records.underlyingValue
    let timestamp = resp.records.timestamp
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
        ...resp.filtered,
        data: options
      },
      underlyingValue: resp.records.underlyingValue,
      timestamp: resp.records.timestamp,
      currentStrikePrice: closest.strikePrice
    }))
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error })

  }

}
