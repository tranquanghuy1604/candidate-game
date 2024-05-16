import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ChoseItem({ menu }: any) {
  let classNameStatus = "";
  if (menu.status_text === "Completed") {
    classNameStatus =
      "mt-[5px] text-[12px] leading-[16px] font-[500] text-[#272B30] px-[12px] py-[4px] bg-[#A9F5AB] rounded-[32px] max-w-[92px]";
  } else if (menu.status_text === "In progress") {
    classNameStatus =
      "mt-[5px] text-[12px] leading-[16px] font-[500] text-[#272B30] px-[12px] py-[4px] bg-[#FFAC9F] rounded-[32px] max-w-[92px]";
  } else {
    classNameStatus =
      "mt-[5px] text-[12px] leading-[16px] font-[500] text-[#272B30] px-[12px] py-[4px] bg-[#FFD0A5] rounded-[32px] max-w-[92px]";
  }
  return (
    <Link href={`/candidate/assessment/${menu.id}`}>
      <div className="mt-[30px] p-2 border-[1px] border-solid border-[#DEDDDD] rounded-[16px] resize-x">
        <Image
          className="object-fit w-full"
          src={menu.img}
          width={166}
          height={160}
          alt=""
        />
        <p className="text-[16px] leading-[24px] font-[500] text-[#111315]">
          {menu.description}
        </p>
        <div className="mt-[5px] md:block flex justify-between items-center">
          <div className="flex items-center md:justify-between gap-[10px] md:gap-0">
            <div className="flex items-center gap-[3px]">
              <Image
                src="/candidate/assessment/ic-time.png"
                height={16}
                width={16}
                alt=""
              />
              <p className="text-[14px] leading-[20px] font-[400] text-[#111315]">
                {menu.used_time}
              </p>
            </div>
            <div className="flex items-center gap-[3px]">
              <Image
                src="/candidate/assessment/ic-cup.png"
                height={16}
                width={16}
                alt=""
              />
              <p className="text-[14px] leading-[20px] font-[400] text-[#111315]">
                {menu.score}
              </p>
            </div>
          </div>
          <div className="md:hidden">
            <div className={classNameStatus}>{menu.status_text}</div>
          </div>
        </div>
        <div className="hidden md:block">
          <div className={classNameStatus}>{menu.status_text}</div>
        </div>
      </div>
    </Link>
  );
}
