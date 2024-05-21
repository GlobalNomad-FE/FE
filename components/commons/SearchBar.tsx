import Image from 'next/image';

const SearchBar = () => {
  return (
    <div>
      <p>무엇을 체험하고 싶으신가요?</p>
      <form>
        <Image
          src="/icons/search.svg"
          alt="검색바 아이콘"
          width={48}
          height={48}
        />
        <input placeholder="내가 원하는 체험은" />
      </form>
      <button type="button">검색하기</button>
    </div>
  );
};

export default SearchBar;
