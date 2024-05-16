import { Progress } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function TestPersonalityDiscovery() {
  // const [progress, setProgress] = useState(100);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) => {
  //       const newProgress = prevProgress - 1;
  //       if (newProgress <= 0) {
  //         clearInterval(interval);
  //         handleCountdownComplete();
  //         return 0;
  //       }
  //       return newProgress;
  //     });
  //   }, 50);

  //   return () => clearInterval(interval);
  // }, []);
  const [percent, setPercent] = useState(100); // Bắt đầu từ 100%

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prevPercent) => prevPercent - 1);
    }, 100);

    // Dừng timer sau 5 giây
    setTimeout(() => {
      clearInterval(interval);
    }, 5000);
  }, []);

  const handleCountdownComplete = () => {
    console.log("Countdown complete!");
  };

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
        href="/candidate/assessment/personality-discovery"
        className="cursor-pointer"
      >
        <Image
          src="/candidate/assessment/item-chose/verbalchallenge/ic-cancel.png"
          width={40}
          height={50}
          alt=""
          className="h-[40px] w-[40px] active:scale-[0.85] transition-all"
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
                width={48}
                height={48}
                className="w-[48px] h-[48px]"
                src="/candidate/assessment/item-chose/verbalchallenge/ic-time.png"
                alt=""
              />
              <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                50s
              </p>
            </div>
            <div className="flex gap-[10px] items-center">
              <Image
                width={48}
                height={48}
                className="w-[48px] h-[48px]"
                src="/candidate/assessment/item-chose/verbalchallenge/ic-point.png"
                alt=""
              />
              <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                1/30
              </p>
            </div>
            <div className="flex gap-[10px] items-center">
              <Image
                width={48}
                height={48}
                className="w-[48px] h-[48px]"
                src="/candidate/assessment/item-chose/verbalchallenge/ic-cup.png"
                alt=""
              />
              <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                20
              </p>
            </div>
          </div>
        </div>
        <div className="mt-[20px] h-[1px] w-full bg-gradient-to-r from-[#ffff] via-[#99D8E5] to-[#ffff]"></div>

        <div className="mt-[30px]">
          <Image
            className="w-full mx-auto max-w-[500px]"
            src="/candidate/assessment/item-chose/verbalchallenge/verbal-img.png"
            alt=""
            width={500}
            height={124}
          />
        </div>
        <div className="mt-[30px] w-full max-w-[300px] mx-auto">
          <Progress
            className="text-[#000]"
            percent={percent}
            showInfo={false}
            strokeColor="#111315"
          >
            <div className="border-[2px] border-solid border-[#111315]" />
          </Progress>
        </div>
        <div className="mt-[30px]">
          <div className="mt-[30px] bg-gradient-to-r from-[#009DBE] to-[#CBEBF1] w-full p-1 max-w-[800px] mx-auto h-[150px] rounded-[32px]">
            <input
              type="text"
              className="text-[#111315] h-full w-full mx-auto bg-gradient-to-t from-[#CCEBF2] to-[#F4FDFF] rounded-[32px] outline-none p-4 text-center text-[40px] font-[700] focus:text-[#111315]"
            />
          </div>
        </div>
        <div className="mt-[80px]">
          {/* <div>
            <p className="uppercase text-[#111315] text-[20px] leading-[28px] font-[500] text-center">
              skip
            </p>
            <div className="mx-auto w-full max-w-[80px] cursor-pointer">
              <Image
                src="/candidate/assessment/item-chose/verbalchallenge/skip-btn.png"
                alt=""
                className="active:scale-[0.9] transition w-full"
              />
            </div>
          </div> */}
          <div className="flex gap-[200px] justify-center">
            <div className="flex items-center gap-[20px]">
              <p className="text-[#111315] text-[20px] leading-[28px] font-[500] whitespace-nowrap">
                LABEL NAME
              </p>
              <button>
                <Image
                  height={100}
                  width={100}
                  className="active:scale-[0.9] transition w-[100px]"
                  src="/candidate/assessment/item-chose/verbalchallenge/prev-btn.png"
                  alt=""
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
