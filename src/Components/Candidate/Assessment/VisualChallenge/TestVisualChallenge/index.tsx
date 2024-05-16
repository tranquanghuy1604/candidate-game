import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function TestVisualChallenge() {
  return (
    <div className="relative p-8">
      <div className="absolute top-0 z-[-1] left-0">
        <Image
          src="/candidate/assessment/item-chose/verbalchallenge/bg-1.png"
          alt=""
          className="w-full"
          width={1028}
          height={773}
        />
      </div>
      <div className="absolute top-0 z-[-1] right-0">
        <Image
          src="/candidate/assessment/item-chose/verbalchallenge/bg-2.png"
          alt=""
          className="w-full"
          width={691}
          height={1206}
        />
      </div>
      <Link
        href="/candidate/assessment/visual-challenge"
        className="cursor-pointer"
      >
        <Image
          src="/candidate/assessment/item-chose/verbalchallenge/ic-cancel.png"
          alt=""
          className="h-[40px] w-[40px] active:scale-[0.85] transition-all"
          width={40}
          height={50}
        />
      </Link>
      <div className="mt-[30px] bg-white px-24 py-12 border-[1px] border-[#009DBE] rounded-[16px] w-full max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-[10px]">
            <div className="w-[12px] rounded-[40px] bg-[#009DBE]"></div>
            <h4 className="text-[#111315] text-[32px] font-[600] leading-[44px]">
              Verbal challenge
            </h4>
          </div>
          <div className="flex items-center gap-[30px]">
            <div className="flex gap-[10px] items-center">
              <Image
                className="w-[48px] h-[48px]"
                src="/candidate/assessment/item-chose/verbalchallenge/ic-time.png"
                width={48}
                height={48}
                alt=""
              />
              <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                50s
              </p>
            </div>
            <div className="flex gap-[10px] items-center">
              <Image
                className="w-[48px] h-[48px]"
                src="/candidate/assessment/item-chose/verbalchallenge/ic-point.png"
                alt=""
                width={48}
                height={48}
              />
              <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                1/30
              </p>
            </div>
            <div className="flex gap-[10px] items-center">
              <Image
                className="w-[48px] h-[48px]"
                src="/candidate/assessment/item-chose/verbalchallenge/ic-cup.png"
                alt=""
                width={48}
                height={48}
              />
              <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                20
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[30px] flex gap-[20px] justify-center">
          <div className="cursor-pointer">
            <Image
              src="/candidate/assessment/item-chose/visualchallenge/img-test.png"
              alt=""
              width={388}
              height={388}
            />
          </div>
          <div className="cursor-pointer">
            <Image
              src="/candidate/assessment/item-chose/visualchallenge/img-test.png"
              alt=""
              width={388}
              height={388}
            />
          </div>
        </div>
        <div className="mt-[80px]">
          <div>
            <p className="uppercase text-[#111315] text-[20px] leading-[28px] font-[500] text-center">
              skip
            </p>
            <div className="mx-auto w-full max-w-[80px] cursor-pointer">
              <Image
                src="/candidate/assessment/item-chose/verbalchallenge/skip-btn.png"
                alt=""
                className="active:scale-[0.9] transition w-full"
                height={80}
                width={80}
              />
            </div>
          </div>
          <div className="flex gap-[200px] justify-center">
            <div className="flex items-center gap-[20px]">
              <p className="text-[#111315] text-[20px] leading-[28px] font-[500] whitespace-nowrap">
                LABEL NAME
              </p>
              <button>
                <Image
                  className="active:scale-[0.9] transition w-[100px]"
                  src="/candidate/assessment/item-chose/verbalchallenge/prev-btn.png"
                  alt=""
                  height={100}
                  width={100}
                />
              </button>
            </div>
            <div className="flex items-center gap-[20px]">
              <button>
                <Image
                  height={100}
                  width={100}
                  className="active:scale-[0.9] transition w-[100px]"
                  src="/candidate/assessment/item-chose/verbalchallenge/next-btn.png"
                  alt=""
                />
              </button>
              <p className="text-[#111315] text-[20px] leading-[28px] font-[500] whitespace-nowrap">
                LABEL NAME
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
