import React from 'react';

const FloatingBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="relative flex flex-col w-96 bg-white border rounded-2xl border-gray200 p-6 tablet:w-[251px]"
      style={{ boxShadow: '0px 4px 16px rgba(17, 34, 17, 0.05)' }}
    >
      {children}
    </div>
  );
};

export default FloatingBox;
