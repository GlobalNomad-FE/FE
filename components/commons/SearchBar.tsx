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
 * @param {string} inputValue - 검색 input 입력 값
 * @param {function} setInputValue - 업데이트될 검색 input 입력 값 함수
 * @param {function} onSearch - 검색될 값(입력할 때마다 업데이트 되지 않고 검색어 모두 입력 후 검색될 수 있게하기 위함
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
    <div className="flex flex-col justify-between max-w-[75rem] w-[100%] h-[11.125em] py-8 px-6 rounded-3xl bg-white shadow-search-bar-custom tablet:h-[10.375em] mobile:h-[8.0625em] mobile:py-4">
      <p className="text-h3-bold mobile:text-body1-bold">
        무엇을 체험하고 싶으신가요?
      </p>
      <div className="flex gap-x-3">
        <form className="flex relative w-[100%] h-14 rounded bg-gray600">
          <input
            className="w-[100%] h-14 pl-12 border border-gray500 rounded text-body1-regular mobile:text-body2-regular"
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
            className="absolute top-[0.25em]"
          />
        </form>
        <button
          type="submit"
          className="min-w-[8.5em] h-14 bg-nomad-black text-white text-body1-bold rounded mobile:min-w-24"
          onClick={onSearch}
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
