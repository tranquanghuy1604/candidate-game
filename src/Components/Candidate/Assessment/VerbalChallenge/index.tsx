import getListGameApi from "@/api/candidate/listGameApi";
import useListGame from "@/zustand/useListGame";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

interface VerbalChallengeProps {
  id: any;
}

export default function VerbalChallenge({ id }: VerbalChallengeProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["listGame"],
    queryFn: getListGameApi.handleGetListGameApi,
  });
  const filterData = data?.data?.data?.games.find(
    (item: any) => item?.id === Number(id)
  );

  return (
    <div className="px-4 md:px-16 pt-[50px] pb-[80px]">
      <div className="hidden md:flex gap-[10px] items-center">
        <Link href="/candidate/assessment">
          <Image
            width={40}
            height={40}
            src="/candidate/assessment/item-chose/backtoassessment.png"
            alt=""
            className="active:scale-[0.9] transition"
          />
        </Link>
        <p className="text-[16px] font-[500] leading-[24px]">
          Back to assessment
        </p>
      </div>
      <div className="md:hidden">
        <Link href="/candidate/assessment">
          <Image
            width={18}
            height={15}
            src="/candidate/assessment/ic-back.png"
            alt=""
            className="active:scale-[0.9] transition"
          />
        </Link>
      </div>
      <div className="w-full mx-auto mt-[80px] max-w-[600px]">
        <div className="border-[1px] max-w-[300px] border-[#DEDDDD] rounded-[16px] w-full md:max-w-[400px] mx-auto cursor-pointer">
          <Image
            className="w-full mx-auto"
            src="/candidate/assessment/lovelike.png"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="mt-[20px] md:max-w-[600px]">
          <h2 className="font-[600] text-[32px] leading-[20px] md:leading-[44px] text-center">
            {filterData?.name}
          </h2>

          <ul className="list-disc mt-[20px] text-[16px] leading-[20px] md:leading-[32px] font-[400] px-[40px]">
            <li>32 questions are given in 150 seconds.</li>
            <li className="my-[10px]">
              Decide if the two words have similar or opposite meaning.
            </li>
            <li>
              Use the keyboard’s Left ({"<"}) or Right ({">"}) arrow to answer
              the question and the Up (^) arrow to skip the question.
            </li>
          </ul>
          <Button
            type="primary"
            className="mt-[30px] h-[45px] w-full text-[16px] leading-[24px] font-[500]"
          >
            <Link
              style={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 500,
                color: "white",
              }}
              href={`/candidate/assessment/${id}/playing`}
            >
              Start
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
