import React, { useEffect, useState } from "react";
import ChoseItem from "./ChoseItem";
import Image from "next/image";
import getListGameApi from "@/api/candidate/listGameApi";
import Skeleton from "@/common/Skeleton";
import useListGame from "@/zustand/useListGame";
import { useQuery } from "react-query";

export default function Assessment() {
  const { data, isLoading } = useQuery({
    queryKey: ["listGame"],
    queryFn: getListGameApi.handleGetListGameApi,
  });

  // console.log(data?.data?.data?.games);

  return (
    <div>
      <div className="cursor-pointer hidden md:block">
        <Image
          className="w-full max-w-[200px]"
          src="/hrview/home/logo.png"
          alt=""
          width={200}
          height={60}
        />
      </div>
      <div className="cursor-pointer md:hidden">
        <Image
          className="w-full max-w-[200px] mx-auto"
          src="/candidate/home/welcome-img.png"
          alt="welcome-img"
          width={240}
          height={240}
        />
      </div>
      <div className="md:p-16">
        <p className="text-[#111315] text-[20px] leading-[28px] font-[600]">
          Welcome to our assessment,
        </p>
        <p className="mt-[20px] text-[#111315] text-[16px] leading-[24px] font-[400]">
          These are not traditional assessment tests but fun & engaging gamified
          challenges for you to discover yourself and explore if you are the
          most SUITABLE for the applying position.
        </p>
        <p className="my-[10px] text-[#111315] text-[16px] leading-[24px] font-[400]">
          Are you up for the challenge?
        </p>
        <ul className="list-disc px-[30px] text-[#111315] text-[16px] leading-[24px] font-[400]">
          <li className="py-1">
            This assessment includes [6] tests, which will take approximately
            [20 minutes] to accomplish
          </li>
          <li className="py-1">
            Read all the instructions carefully in each challenge. You can turn
            the audio on to enter the gamified world
          </li>
          <li className="py-1">
            Make sure you are not distracted by any other factors, stay focused
            and relaxed
          </li>
          <li className="py-1">
            Do not refresh the page or close the window while playing.
          </li>
        </ul>
        <p className="text-[#111315] text-[16px] leading-[24px] font-[400] my-[5px]">
          Have fun and good luck.
        </p>

        <div>
          <p className="text-[32px] font-[600] leading-[44px] text-[#111315] text-center md:text-left">
            Choose a test
          </p>
        </div>
        <div className="md:flex md:flex-nowrap gap-[20px]">
          {isLoading ? (
            <div className="mt-[20px] flex gap-[20px] items-center">
              <Skeleton width="303px" height="500px" />
              <Skeleton width="303px" height="500px" />
              <Skeleton width="303px" height="500px" />
              <Skeleton width="303px" height="500px" />
            </div>
          ) : (
            data?.data?.data?.games.map((item: any) => (
              <div key={item.id} className="w-full md:max-w-[340px]">
                <ChoseItem menu={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
