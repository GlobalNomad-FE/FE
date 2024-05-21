interface CategoryType {
  onClick: () => void;
  isSelected: boolean;
  children: string;
}

// TODO filter 기능은 추가해야됨
/**
 *
 * @description 메인페이지에 쓰이는 카테고리 컴포넌트
 * @param onClick 클릭이벤트
 * @param isSelected index 선택 여부
 * @param children 카테고리 이름
 */
const Category = ({ onClick, isSelected, children }: CategoryType) => {
  return (
    <div
      className={`flex justify-center items-center w-[12.7rem] h-[5.3rem] border border-solid border-green200 rounded-[1.5rem] font-family text-[1.8rem] font-medium cursor-pointer ${
        isSelected ? 'bg-nomad-black text-white' : ''
      } tablet:w-[12rem] mobile:w-[8rem] mobile:h-[4.1rem] mobile:text-[1.4rem]`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Category;
