import React from 'react';

export default function ActivitieBio({ description }: { description: string }) {
  return (
    <div className="border-t border-gray200 py-[40px] flex flex-col gap-[16px]">
      <p className="text-h3-bold text-nomad-black">체험 설명</p>
      <p className="text-body1-regular text-nomad-black">{description}</p>
    </div>
  );
}
