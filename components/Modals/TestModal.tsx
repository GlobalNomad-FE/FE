import React from 'react';

const TestModal = () => {
  return (
    <div>
      <div className="text-red100 mt-5 w-[400px]">내용</div>
      <input
        className="mt-3 w-[400px] p-2 border border-black200 placeholder-gray-400"
        placeholder="값 입력"
      />
    </div>
  );
};

export default TestModal;
