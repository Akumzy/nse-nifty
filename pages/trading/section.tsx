const SectionThree: any = () => {
  return (
    <>
      <p className="w-full font-times pl-8 h-12 pt-5 not-italic font-bold text-xl leading-4 text-slate-700">
        Intraday Data (Use this indicator only after 10:30 a.m.)
      </p>
      <p className="w-full h-10 pl-8 pt-4 pb-3 text-bold font-serif">
        Strike Price
      </p>
      <div className="flex justify-between w-full pl-8 h-12 pb-5">
        <select
          name="price"
          className="w-32 h-8 bg-white rounded-sm border border-solid border-gray-300 font-small"
        >
          <option value="17900">17900</option>
        </select>
        <div className="flex flex-row justify-around pr-4">
          <div className="flex">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="9" r="9" fill="#AAE0CA" />
            </svg>
            <p className="not-italic font-semibold text-sm leading-4 text-black pl-1 font-inter">
              Put option {">"} Call option
            </p>
          </div>
          <div className="flex pl-5 float-right">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="9" cy="9" r="9" fill="#FEBDB7" />
            </svg>
            <p className="not-italic font-semibold text-sm leading-4 text-black pl-1 font-inter">
              Call option {">"} Put option
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-10 bg-gray-200 not-italic font-semibold text-sm leading-4 text-center text-gray-600 flex pt-3 border-gray-300  border-solid border">
        <p className=" w-24">Time</p>
        <p className=" w-40">Calls</p>
        <p className=" w-40">Puts</p>
        <p className="w-44">Difference</p>
        <p className=" w-24">PCR</p>
        <p className=" w-32">Signal</p>
        <p className=" w-40">VWAP</p>
        <p className=" w-40">Price</p>
        <p className=" w-32">VWAP Signal</p>
      </div>
      <div className="flex w-full bg-slate-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          11:30
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-gray-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-slate-300  border-solid not-italic  font-bold text-green-600 text-sm leading-4  font-inter">
          Buy
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  border-b bg-slate-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-green-600">
          Buy
        </p>
      </div>
      <div className="flex w-full bg-slate-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          11:15
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-gray-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-slate-300  border-solid not-italic  font-bold text-green-600 text-sm leading-4  font-inter">
          Buy
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  border-b bg-slate-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-green-600">
          Buy
        </p>
      </div>
      <div className="flex w-full bg-slate-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          11:00
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-gray-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-slate-300  border-solid not-italic  font-bold text-green-600 text-sm leading-4  font-inter">
          Buy
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  border-b bg-slate-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-green-600">
          Buy
        </p>
      </div>
      <div className="flex w-full bg-slate-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          10:45
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-gray-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-slate-300  border-solid not-italic  font-bold text-green-600 text-sm leading-4  font-inter">
          Buy
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  border-b bg-slate-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-green-600">
          Buy
        </p>
      </div>
      <div className="flex w-full bg-slate-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          10:30
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-gray-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-slate-300  border-solid not-italic  font-bold text-green-600 text-sm leading-4  font-inter">
          Buy
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  border-b bg-slate-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-green-600">
          Buy
        </p>
      </div>
      <div className="flex w-full bg-slate-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          10:15
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-gray-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-slate-300  border-solid not-italic  font-bold text-green-600 text-sm leading-4  font-inter">
          Buy
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  border-b bg-slate-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-green-600">
          Buy
        </p>
      </div>
      <div className="flex w-full bg-slate-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          10:00
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-gray-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-slate-300  border-solid not-italic  font-bold text-green-600 text-sm leading-4  font-inter">
          Buy
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  border-b bg-slate-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-green-600">
          Buy
        </p>
      </div>
      <div className="flex w-full bg-red-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          11:45
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-red-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-red-300  border-solid not-italic  font-bold text-red-600 text-sm leading-4  font-inter">
          Sell
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14 h-10 pt-2  bg-red-300  border-b border-solid  not-italic text-sm leading-4  font-inter  font-bold text-red-600">
          Sell
        </p>
      </div>
      <div className="flex w-full bg-red-300">
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          9:30
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-44 text-center h-10 pt-2 bg-red-300 border-b border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          211249876
        </p>
        <p className="w-24 text-center h-10 pt-2 border bg-white border-solid not-italic font-normal text-sm leading-4 text-green-700 font-inter">
          3.56
        </p>
        <p className="w-32 text-center h-10 pt-2  border-b bg-red-300  border-solid not-italic  font-bold text-red-600 text-sm leading-4  font-inter">
          Sell
        </p>
        <p className="w-40 text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className="w-40  text-center h-10 pt-2 border bg-white border-solid  not-italic font-normal text-sm leading-4 text-gray-700 font-inter">
          18888
        </p>
        <p className=" text-center px-14   h-10 pt-2  bg-red-300  border-solid  not-italic text-sm leading-4  font-inter  font-bold text-red-600">
          Sell
        </p>
      </div>
    </>
  );
};
export default SectionThree;
