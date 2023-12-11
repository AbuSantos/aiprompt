const FeedSkeleton = () => {
  return (
    <div className="myt-16   prompt_layout animate_pulse bg-red-500">
      <div className="prompt_card bg-gray-300 ">
        <div className="flex bg-gray-300  justify-between gap-5 items-center">
          <div className="flex bg-gray-300  flex-1 cursor-pointer items-center justify-start">
            <div className="h-2  bg-gray-300 rounded">
              <img alt="" />
            </div>
            <div className="flex bg-gray-300  flex-col">
              <h3 className=" bg-gray-300  text-gray-800 ml-4 font-bold font-satoshi"></h3>
              <p className="text-sm bg-gray-300  text-gray-500 ml-4"></p>
            </div>
            <div className="copy_btn bg-gray-300 ">
              <img alt="" />
            </div>
          </div>
        </div>
        <p className="my-4 bg-gray-300  font-satoshi text-sm text-gray-700"></p>
        <p className="font-inter bg-gray-300  text-sm blue_gradient cursor-pointer"></p>
        <div className="h-2 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}

export default FeedSkeleton
