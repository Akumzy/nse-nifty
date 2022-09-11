import type { NextPage } from "next";
import Head from "next/head";
import Paragraph from "./trading/para";
import { useMemo, useState } from "react";
import useSWR, { Fetcher } from "swr";
import Rows from "./trading/rows";
import SectionThree from "./trading/section";
type Options = {
  strikePrice: number;
  expiryDate: string;
  record: NSEOptionChainResponse["filtered"]["data"][0]["CE"];
}[];
const headers = [
  "Strike",
  "Last",
  "Open Interest",
  "Change in OI",
  "Odin Percentage",
];
const fetcher: Fetcher<OptionsAPIResponse> = (url: string) =>
  fetch(url).then((r) => r.json());
const Home: NextPage = () => {
  const { data, error } = useSWR(`/api/nse`, fetcher, {
    // refreshInterval: 60 * 1000,
  });
  const filtered = data?.filtered;
  const peOptions = useMemo(
    () =>
      filtered?.data
        ?.filter((o) => o.PE)
        ?.map((option) => ({
          strikePrice: option.strikePrice,
          expiryDate: option.expiryDate,
          record: option.PE,
        })) || [],
    [filtered]
  );
  const ceOptions = useMemo(
    () =>
      filtered?.data
        ?.filter((o) => o.CE)
        ?.map((option) => ({
          strikePrice: option.strikePrice,
          expiryDate: option.expiryDate,
          record: option.CE,
        })) || [],
    [filtered]
  );

  return (
    <>
      <Head>
        <title>Trade</title>
      </Head>
      <div className="w-fit h-screen px-9  m-0">
        <nav className="w-full h-20 flex border-solid border-b px-2">
          <div className="h-full flex flex-row w-full justify-between">
            <div className="flex flex-row pt-3">
              <h1 className="font-bold  font-inter mr-7 text-2xl leading-none tracking-tight w-44 mt-4 text-slate-1000">
                Intradaysignals
              </h1>
              <div className="flex h-9 rounded bg-slate-200 mt-3 pl-2">
                <svg
                  className="mt-2"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.0258 12.8475L17.595 16.4159L16.4158 17.595L12.8475 14.0259C11.5198 15.0902 9.86834 15.6691 8.16667 15.6667C4.02667 15.6667 0.666672 12.3067 0.666672 8.16669C0.666672 4.02669 4.02667 0.666687 8.16667 0.666687C12.3067 0.666687 15.6667 4.02669 15.6667 8.16669C15.6691 9.86835 15.0902 11.5198 14.0258 12.8475ZM12.3542 12.2292C13.4118 11.1416 14.0024 9.68371 14 8.16669C14 4.94335 11.3892 2.33335 8.16667 2.33335C4.94334 2.33335 2.33334 4.94335 2.33334 8.16669C2.33334 11.3892 4.94334 14 8.16667 14C9.6837 14.0024 11.1416 13.4118 12.2292 12.3542L12.3542 12.2292Z"
                    fill="#79838D"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search"
                  className="box-border w-96 h-9 bg-slate-200 pl-1 border-none font-inter font-medium text-sm"
                />
              </div>
            </div>
            <div className="pt-2">
              <button className="w-20 h-10 bg-white border border-solid border-slate-300 rounded font-serif text-xs font-semibold mt-3 text-slate-700 text-center">
                Sign In
              </button>
              <button className="w-20 h-10 font-serif text-white font-semibold text-xs rounded border border-solid border-blue-500 bg-blue-500 ml-1 text-center">
                Sign Up
              </button>
            </div>
          </div>
        </nav>
        <Paragraph />
        <div className="w-full border border-solid h-auto  bg-white">
          <Rows />
          <main className=" w-full ">
            <div className="flex justify-center w-full flex-col pt-6">
              <p className="font-semibold font-inter pl-2">
                Timestamp: {data?.timestamp}
              </p>
              <p className="font-semibold font-inter pl-2">
                Underlying Value: {data?.underlyingValue}
              </p>
            </div>
            <div className="grid w-full grid-cols-2 gap-5 mt-2">
              <div className="h-12 bg-blue-200 text-center not-italic font-bold text-sm leading-4 uppercase text-green-600 pt-4 font-serif">
                CALLS options
              </div>
              <div className="bg-red-200 h-12 text-center not-italic font-bold text-sm leading-4 uppercase text-red-700 pt-4 font-serif">
                PUTS options
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="">
                <OptionsTable
                  options={ceOptions}
                  currentStrikePrice={data?.currentStrikePrice || 0}
                />
              </div>
              <div className="">
                <OptionsTable
                  options={peOptions}
                  currentStrikePrice={data?.currentStrikePrice || 0}
                />
              </div>
            </div>
          </main>
          <div className="flex w-full h-15 not-italic font-semibold text-lg leading-3 text-gray-700 justify-center pt-10 pb-10 font-serif">
            <p>Total buy in Put {">"} Call </p>
            <p className="pl-2 text-green-700">Market may go up</p>
          </div>
        </div>
        <div className="bg-white border border-solid h-auto mt-10 w-full">
          <SectionThree />
        </div>
      </div>
    </>
  );
};
function OptionsTable({
  options,
  currentStrikePrice,
}: {
  options: Options;
  currentStrikePrice: number;
}) {
  return (
    <div className="">
      <div className=" bg-gray-200 text-gray-600 h-10 border border-solid border-gray-300 text-sm font-normal font-serif leading-4 not-italic">
        <div className="flex justify-around pt-2">
          {headers.map((header) => (
            <span key={header} className="">
              {header}
            </span>
          ))}
        </div>
      </div>
      <div>
        {options.map((option) => (
          <div key={option.strikePrice} className="flex">
            <div
              className={`w-24 bg-teal-50 border-solid  not-italic font-normal text-center text-sm leading-4 h-10  pt-3 font-inter border ${
                currentStrikePrice === option.strikePrice
                  ? " bg-blue-700 text-white"
                  : ""
              }`}
            >
              {option.strikePrice}
            </div>
            <div className=" w-24 border bg-white border-solid not-italic font-normal text-sm leading-4 text-center text-gray-600 pt-3  font-inter ">
              {option.record.lastPrice}
            </div>
            <div className=" w-32 bg-white  border-solid not-italic font-normal text-sm leading-4 text-center text-gray-600 pt-3 font-inter border">
              {option.record.openInterest}
            </div>
            <div className=" w-32 bg-white border border-solid not-italic font-normal text-sm leading-4 text-center text-gray-600 pt-3 font-inter">
              {option.record.changeinOpenInterest}
            </div>
            <div
              className={`w-48 bg-white border border-solid pt-3 not-italic font-normal text-sm leading-4 text-green-600  font-inter text-center ${
                option.record.pchangeinOpenInterest <= 0 ? "text-red-600" : ""
              }`}
            >
              {option.record.pchangeinOpenInterest.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Home;
