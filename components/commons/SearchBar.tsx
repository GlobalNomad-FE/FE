import Image from 'next/image';

const SearchBar = () => {
  return (
    <div className="flex flex-col justify-between max-w-[120rem] w-[100%] h-[17.8rem] py-[3.2rem] px-[2.4rem] rounded-[1.6rem] bg-white shadow-search-bar-custom tablet:h-[16.6rem] mobile:h-[12.9rem] mobile:py-[1.6rem]">
      <p className="text-h3-bold mobile:text-body1-bold">
        무엇을 체험하고 싶으신가요?
      </p>
      <div className="flex gap-x-3">
        <form className="flex relative w-[100%] h-[5.6rem] rounded-[0.4rem] bg-gray600">
          <input
            className="w-[100%] h-[5.6rem] pl-[4.8rem] border border-solid border-gray500 rounded-[0.4rem] text-body1-regular mobile:text-body2-regular"
            placeholder="내가 원하는 체험은"
          />
          <Image
            src="/icons/search.svg"
            alt="검색바 아이콘"
            width={48}
            height={48}
            className="absolute top-[0.4rem]"
          />
        </form>
        <button
          type="button"
          className="min-w-[13.6rem] h-[5.6rem] bg-nomad-black text-white text-body1-bold rounded-[0.4rem] mobile:min-w-[9.6rem]"
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
