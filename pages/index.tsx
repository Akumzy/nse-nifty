import type { NextPage } from "next"
import Head from "next/head"
import { useMemo } from "react"
import useSWR, { Fetcher } from "swr"
type Options = {
  strikePrice: number
  expiryDate: string
  record: NSEOptionChainResponse["filtered"]["data"][0]["CE"]
}[]
const headers = ["Strike", "Last", "Open Interest", "Change in OI", "Odin Percentage"]
const fetcher: Fetcher<OptionsAPIResponse> = (url: string) => fetch(url).then((r) => r.json())
const Home: NextPage = () => {
  const { data, error } = useSWR(`/api/nse`, fetcher, {
    // refreshInterval: 60 * 1000,
  })
  const filtered = data?.filtered
  const peOptions = useMemo(
    () =>
      filtered?.data
        ?.filter((o) => o.PE)
        ?.map((option) => ({
          strikePrice: option.strikePrice,
          expiryDate: option.expiryDate,
          record: option.PE,
        })) || [],
    [filtered],
  )
  const ceOptions = useMemo(
    () =>
      filtered?.data
        ?.filter((o) => o.CE)
        ?.map((option) => ({
          strikePrice: option.strikePrice,
          expiryDate: option.expiryDate,
          record: option.CE,
        })) || [],
    [filtered],
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" w-full ">
        <div className="flex justify-center w-full flex-col">
          <p>Timestamp: {data?.timestamp}</p>
          <p>Underlying Value: {data?.underlyingValue}</p>
        </div>
        <div className="flex">
          <div className="flex">
            <div className="w-1/2">
              <div className="sticky top-0 bg-blue-700 h-12 flex items-center justify-center">
                <h1 className="text-lg font-bold text-white">Calls</h1>
              </div>

              <OptionsTable options={ceOptions} currentStrikePrice={data?.currentStrikePrice || 0} />
            </div>
            <div className="w-1/2">
              <div className="sticky top-0 bg-blue-700 h-12 flex items-center justify-center">
                <h1 className="text-lg font-bold text-white uppercase">Puts</h1>
              </div>

              <OptionsTable options={peOptions} currentStrikePrice={data?.currentStrikePrice || 0} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
function OptionsTable({ options, currentStrikePrice }: { options: Options; currentStrikePrice: number }) {
  return (
    <table className="table-auto p-0 border-0">
      <thead className="sticky top-12 bg-blue-700">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-2 border border-slate-700 text-white truncate">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {options.map((option) => (
          <tr key={option.strikePrice} className="">
            <td className={`border border-slate-700 ${currentStrikePrice === option.strikePrice ? " bg-blue-700 text-white" : ""}`}>{option.strikePrice}</td>
            <td className="border border-slate-700">{option.record.lastPrice}</td>
            <td className="border border-slate-700">{option.record.openInterest}</td>
            <td className="border border-slate-700">{option.record.changeinOpenInterest}</td>
            <td className="border border-slate-700">{option.record.pchangeinOpenInterest}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
export default Home
