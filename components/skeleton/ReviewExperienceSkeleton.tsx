export default function ReviewExperienceSkeleton() {
  return (
    <>
      <div
        className="animate-pulse max-w-[792px] mt-4 h-[204px] tablet:h-[156px] mobile:h-[128px] rounded-[24px] flex bg-white"
        style={{ boxShadow: '0px 4px 16px 0px rgba(17, 34, 17, 0.05)' }}
      >
        <div className="min-w-[204px] h-[204px] tablet:min-w-[156px] tablet:h-[156px] mobile:min-w-[128px] mobile:h-[128px] relative bg-gray-300 rounded-l-[24px]"></div>
        <div className="flex flex-col justify-between w-full p-6 tablet:p-[12px] mobile:p-[9px]">
          <div>
            <p className="bg-gray-300 h-4 w-24 mb-4 tablet:mb-3 mobile:mb-3 rounded"></p>
            <p className="bg-gray-300 h-6 tablet:h-5 mobile:h-4 w-56 mobile:w-44 mb-4 mobile:mb-3 rounded"></p>
            <p className="bg-gray-300 h-5 tablet:h-4 mobile:h-3 w-60 mobile:w-48 mt-3 tablet:mt-[5px] mobile:mt-[6px] rounded"></p>
          </div>
          <div className="h-10 mobile:h-[32px] flex justify-between mt-4 tablet:mt-[12px] mobile:mt-[5px] items-center mobile:mr-[3px]">
            <p className="bg-gray-300 h-6 tablet:h-5 mobile:h-4 w-28 mobile:w-20 rounded"></p>
            <div className="bg-gray-300 h-10 tablet:h-8 mobile:h-6 w-32 tablet:w-28 mobile:w-20 rounded"></div>
          </div>
        </div>
      </div>
    </>
  );
}
