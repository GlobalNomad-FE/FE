interface CategoryType {
  onClick: (name: string) => void;
  isSelected: boolean;
  children: string;
}

const Categories = ({ onClick, isSelected, children }: CategoryType) => {
  const handleClick = () => {
    onClick(children);
  };

  return (
    <div
      className={`${
        isSelected ? 'bg-nomad-black text-white' : 'bg-white text-green200'
      } flex justify-center items-center min-w-[127px] h-[53px] border border-green200 rounded-[15px] font-family text-lg font-medium cursor-pointer tablet:w-[120px] mobile:min-w-[80px] mobile:h-[41px] mobile:text-[14px] mobile:font-normal`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Categories;
