'use client';
import Image from 'next/image';
import { useState, ChangeEvent, KeyboardEvent } from 'react';

interface SearchBarType {
  onSearch: (searchTerm: string) => void;
}

/**
 *
 * @description SearchBar 컴포넌트
 * @param {function} onSearch - 검색어를 상위 컴포넌트로 전달하는 함수
 */
const SearchBar = ({ onSearch }: SearchBarType) => {
  const [inputValue, setInputValue] = useState('');

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(inputValue);
    }
  };

  const handleSearch = () => {
    onSearch(inputValue);
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
            onChange={handleInput}
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
          onClick={handleSearch}
        >
          검색하기
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
