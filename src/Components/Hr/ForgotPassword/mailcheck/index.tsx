import Link from "antd/es/typography/Link";
import Image from "next/image";
import React from "react";

export default function MailCheck() {
  return (
    <div className="p-8">
      <div className="cursor-pointer">
        <Image
          className="w-full max-w-[200px]"
          src="/hrview/home/logo.png"
          alt=""
          width={200}
          height={60}
        />
      </div>
      <div className="flex justify-between ">
        <div className="w-[50%]">
          <Image
            className="w-full mx-auto"
            src="/hrview/login/pytalent-img.png"
            alt=""
            width={680}
            height={680}
          />
        </div>
        <div className="w-[50%] pt-[130px]">
          <div className="w-full max-w-[444px] mx-auto">
            <h3 className="text-[40px] leading-[56px] font-[600] font-poppins">
              Check your email
            </h3>
            <p className="w-full max-w-[444px] mt-[20px] text-[16px] leading-[24px] font-[500] font-poppins text-[#111315]">
              We have sent an email to limdim@gmail.com. Follow the instructions
              to reset your password. The email will expire in 30 minutes.
            </p>
            <div className="mt-[50px]">
              <p className="text-[16px] leading-[24px] font-[400] font-poppins">
                Take me back to{" "}
                <Link
                  href="#"
                  style={{ color: "#009DBE", textUnderlineOffset: 2 }}
                >
                  Sign in
                </Link>
              </p>
              <p className="text-[16px] mt-[10px] leading-[24px] font-[400] font-poppins">
                Did not receive our email?{" "}
                <Link href="/reset-password" style={{ color: "#009DBE" }}>
                  Resend
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
