import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function VisualChallenge() {
  return (
    <div className="p-16">
      <div className="flex gap-[10px] items-center">
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
      <div className="w-full max-w-[600px] mx-auto mt-[80px]">
        <div className="border-[1px] border-[#DEDDDD] rounded-[16px] w-full max-w-[400px] mx-auto cursor-pointer">
          <Image
            className="w-full mx-auto"
            src="/candidate/assessment/lovelike.png"
            alt=""
            width={400}
            height={400}
          />
        </div>
        <div className="mt-[20px]">
          <h2 className="font-[600] text-[32px] leading-[44px] text-center">
            Visual challenge
          </h2>
          <ul className="list-disc mt-[20px] text-[16px] leading-[32px] font-[400] px-[40px]">
            <li>You are a newcomer to your company. </li>
            <li className="my-[10px]">
              Identify the differences of your 15 co-workers and 15 places at
              your office in 150 seconds.
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
              href={`#`}
            >
              Start
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
