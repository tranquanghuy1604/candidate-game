import Image from "next/image";
import React from "react";

export default function Nodata() {
  return (
    <div className="mt-[30px]">
      <div className="border-[1px] border-solid border-[#DEDDDD] rounded-[16px] w-full min-h-[500px] py-[30px]">
        <div className="text-center w-full max-w-[400px] mx-auto">
          <Image
            className="max-w-[320px] mx-auto"
            src="/hrview/inviteassessment/img-nodata.png"
            alt="img-nodata"
            height={320}
            width={320}
          />
          <h4 className="text-[16px] leading-[24px] font-[500] text-[#111315]">
            It looks like you haven’t added any candidate
          </h4>
          <p className="text-[#6F767E] text-[16px] leading-[24px] font-[400]">
            Invite your candidates to do the assessment and track their
            responses here.
          </p>
        </div>
      </div>
    </div>
  );
}
