import DefaultHead from "@/layouts/default-head";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function HomeHrView() {
  return (
    <>
      <DefaultHead />
      <div className="flex justify-between items-center">
        <div className="cursor-pointer">
          <Image
            className="w-full max-w-[200px]"
            src="/hrview/home/logo.png"
            alt=""
            width={200}
            height={60}
          />
        </div>
        <div className="flex gap-[20px]">
          <Button
            type="primary"
            className="bg-[#CCEBF2] text-[#009DBE] text-[16px] font-[500] leading-[24px] w-[180px] h-[44px]"
          >
            Test library
          </Button>
          <Link href="/login">
            <Button
              type="primary"
              className="text-[16px] font-[500] leading-[24px] w-[180px] h-[44px]"
            >
              Log in
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[50%] mx-auto">
          <h3 className="w-full max-w-[555px] mx-auto text-[72px] leading-[84px] font-[600] font-poppins">
            Hire the best. No bias. No stress.
          </h3>
          <p className="w-full max-w-[540px] mx-auto mt-[20px] font-[400] text-[18px] leading-[32px] font-poppins">
            Our screening tests identify the best participantss and make your
            hiring decisions faster, easier, and bias-free.
          </p>
        </div>
        <div className="w-[50%] mx-auto">
          <Image
            src="/hrview/home/pytalent-img.png"
            height={600}
            width={600}
            alt=""
          />
        </div>
      </div>
    </>
  );
}
