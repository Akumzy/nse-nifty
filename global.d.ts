type CEOption = {
    strikePrice: number
    expiryDate: string
    CE: {
        strikePrice: number
        expiryDate: string
        underlying: string
        identifier: string
        openInterest: number
        changeinOpenInterest: number
        pchangeinOpenInterest: number
        totalTradedVolume: number
        impliedVolatility: number
        lastPrice: number
        change: number
        pChange: number
        totalBuyQuantity: number
        totalSellQuantity: number
        bidQty: number
        bidprice: number
        askQty: number
        askPrice: number
        underlyingValue: number
    }
}
type PEOption = {
    strikePrice: number
    expiryDate: string
    PE: {
        strikePrice: number
        expiryDate: string
        underlying: string
        identifier: string
        openInterest: number
        changeinOpenInterest: number
        pchangeinOpenInterest: number
        totalTradedVolume: number
        impliedVolatility: number
        lastPrice: number
        change: number
        pChange: number
        totalBuyQuantity: number
        totalSellQuantity: number
        bidQty: number
        bidprice: number
        askQty: number
        askPrice: number
        underlyingValue: number
    }
}

type NSEOptionChainResponse = {
    records: {
        expiryDates: Array<string> // ISO-8601 date with format of yyyy-mm-dd
        data: Array<PEOption | CEOption>
        timestamp: string
        underlyingValue: number
        strikePrices: Array<number>
    }
    filtered: {
        data: Array<{
            strikePrice: number
            expiryDate: string
            CE: CEOption["CE"]
            PE: PEOption["PE"]
        }>
        CE: {
            totOI: number
            totVol: number
        }
        PE: {
            totOI: number
            totVol: number
        }
    }
}


type OptionsAPIResponse = {
    filtered: NSEOptionChainResponse['filtered']
    underlyingValue: number
    timestamp: string
    currentStrikePrice: number
}