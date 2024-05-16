import React from "react";

export default function IncludedTest({ item }: any) {
  return (
    <div className="w-ull max-w-[330px]">
      <div className="flex items-center mt-[20px] gap-[10px]">
        <div className="cursor-pointer p-4 min-h-[84px] border-[1px] border-solid border-[#DEDDDD] rounded-[8px] text-[#111315] text-[16px] leading-[24px] font-[400]">
          <p>{item.name}</p>
          <p className="mt-[10px]">{item.time}s</p>
        </div>
      </div>
    </div>
  );
}
