const Rows: any = () => {
  return (
    <>
      <div className="pl-8 flex">
        <div className="mr-6 grid gap-2.5">
          <span className="not-italic font-medium text-xs leading-4 text-gray-600 h-4 pt-5 pb-3 pr-0 font-serif">
            Indices
          </span>
          <select
            name="Indices"
            className="w-56 bg-white rounded-sm not-italic font-medium text-sm leading-4 text-gray-500 h-8 font-inter border border-solid border-gray-300 "
          >
            <option value="Nifty 50">Nifty 50</option>
          </select>
        </div>
        <div className="grid gap-2.5 mr-5">
          <span className="not-italic font-medium text-xs leading-4 text-gray-600 h-4 pt-5 pb-3 pr-0 font-serif">
            Expiry Date
          </span>
          <select
            name="Expiry date"
            className="w-56 bg-white rounded-sm not-italic font-medium text-sm leading-4 text-gray-500 h-8 font-inter border border-solid border-gray-300"
          >
            <option value="12/08/2022">12/08/2022</option>
          </select>
        </div>
        <div className="grid gap-2.5 mr-8">
          <span className="not-italic font-medium text-xs leading-4 text-gray-600 h-4 pt-5 pb-3 pr-0 font-serif">
            Timeframe
          </span>
          <select
            name="Timeframe"
            className=" bg-white rounded-sm not-italic font-medium text-sm leading-4 text-gray-500 h-8 font-inter border border-solid border-gray-300 w-32"
          >
            <option value="15 mins">15 mins</option>
          </select>
        </div>
        <div className="mr-20 ml-8 grid overflow-hidden">
          <span className="not-italic font-medium text-xs leading-4 text-gray-600 h-4 pt-5 pb-2 pr-0 font-serif">
            Overall Changes(%)
          </span>
          <span className="not-italic font-bold text-xs leading-4 font-inter text-green-600">
            130.12 (0.20%)
          </span>
        </div>
        <div className="grid gap-0.5 mr-14 overflow-hidden">
          <span className="not-italic font-medium text-xs leading-4 text-gray-600 h-4 pt-5 pb-1 pr-0 font-serif">
            Lot Size
          </span>
          <span className="not-italic font-bold text-xs leading-4 font-inter text-gray-700">
            50
          </span>
        </div>
        <div className="grid  mr-14 overflow-hidden">
          <div className="flex">
            <span className="not-italic font-medium text-xs leading-4 text-gray-600 h-4 pt-5 pb-3 pr-0 font-serif">
              Expected Range
            </span>
            <svg
              className="mt-6"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00002 11.8333C2.77827 11.8333 0.166687 9.22174 0.166687 5.99999C0.166687 2.77824 2.77827 0.166656 6.00002 0.166656C9.22177 0.166656 11.8334 2.77824 11.8334 5.99999C11.8334 9.22174 9.22177 11.8333 6.00002 11.8333ZM5.41669 5.41666V8.91666H6.58335V5.41666H5.41669ZM5.41669 3.08332V4.24999H6.58335V3.08332H5.41669Z"
                fill="black"
              />
            </svg>
          </div>
          <span className="not-italic font-bold text-xs leading-4 font-inter text-gray-600">
            17700 ~ 18000
          </span>
        </div>
        <div className="grid gap-0.5">
          <span
            className="not-italic font-medium text-xs leading-4 text-gray-600 h-4 pt-5 pb-3 pr-0 font-serif"
            id="mark"
          >
            Market Tend
          </span>
          <span className="not-italic font-bold text-xs leading-4 font-inter text-green-700">
            Bulish
          </span>
        </div>
      </div>
    </>
  );
};
export default Rows;
