import Image from 'next/image';

const SelectBox = () => {
  return (
    <div className="w-[800px] tablet:w-[429px] mobile:w-full h-[48px] mt-[42px] px-4 py-3 border border-gray500 rounded-[4px] bg-white relative flex justify-between">
      <p className="bg-white w-[45px] px-1 text-[14px] bottom-10 absolute">
        체험명
      </p>
      <p className="text-[16px]">함께 배우면 즐거운 스트릿 댄스!</p>
      <Image
        src="./icons/arrow_down.svg"
        alt="아래 화살표 아이콘"
        width={24}
        height={24}
      />
    </div>
  );
};

export default SelectBox;
