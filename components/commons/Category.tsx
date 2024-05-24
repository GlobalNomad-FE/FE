interface CategoryType {
  onClick: () => void;
  isSelected: boolean;
  children: string;
}

// TODO filter 기능은 추가해야됨
/**
 *
 * @description 메인페이지에 쓰이는 카테고리 컴포넌트
 * @param {object} onClick 클릭이벤트
 * @param {boolean} isSelected index 선택 여부
 * @param {string} children 카테고리 이름
 */
const Category = ({ onClick, isSelected, children }: CategoryType) => {
  return (
    <div
      className={`${
        isSelected ? 'bg-nomad-black text-white' : 'bg-white'
      } flex justify-center items-center w-[7.9375rem] h-[3.3125rem] border border-solid border-green200 rounded-[15px] font-family text-lg font-medium cursor-pointer tablet:w-[7.5rem] mobile:w-[5rem] mobile:h-[41px] mobile:text-[14px] mobile:font-normal`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Category;
