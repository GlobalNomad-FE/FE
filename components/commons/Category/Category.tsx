interface CategoryType {
  onClick: () => void;
  isSelected: boolean;
  children: string;
}

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
