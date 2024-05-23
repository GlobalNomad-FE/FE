'use client';
import Image from 'next/image';
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from 'react';

interface SearchBarType {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}
/**
 *
 * @description SearchBar 컴포넌트
 * @param inputValue - 검색 input 입력 값
 * @param setInputValue - 업데이트될 검색 input 입력 값 함수
 * @param onSearch - 검색될 값(입력할 때마다 업데이트 되지 않고 검색어 모두 입력 후 검색될 수 있게하기 위함
 */
const SearchBar = ({ inputValue, setInputValue, onSearch }: SearchBarType) => {
  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <div className="flex flex-col justify-between max-w-[120rem] w-[100%] h-[17.8rem] py-[3.2rem] px-[2.4rem] rounded-[16px] bg-white shadow-search-bar-custom tablet:h-[16.6rem] mobile:h-[12.9rem] mobile:py-[1.6rem]">
      <p className="text-h3-bold mobile:text-body1-bold">
        무엇을 체험하고 싶으신가요?
      </p>
      <div className="flex gap-x-3">
        <form className="flex relative w-[100%] h-[5.6rem] rounded-[4px] bg-gray600">
          <input
            className="w-[100%] h-[5.6rem] pl-[4.8rem] border border-solid border-gray500 rounded-[4px] text-body1-regular mobile:text-body2-regular"
            placeholder="내가 원하는 체험은"
            value={inputValue}
            onChange={onChangeInputValue}
            onKeyDown={handleKeyPress}
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
          className="min-w-[13.6rem] h-[5.6rem] bg-nomad-black text-white text-body1-bold rounded-[4px] mobile:min-w-[9.6rem]"
          onClick={onSearch}
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
