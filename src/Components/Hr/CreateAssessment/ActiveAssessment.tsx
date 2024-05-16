import archiveAssessmentApi from "@/api/hr/archiveAssessment";
import { Tooltip } from "antd";
import Link from "antd/es/typography/Link";
import { differenceInDays, parse } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import DeleteModal from "./DeleteModal";

export default function ActiveAssessment({ item }: any) {
  const [isHover, setIsHover] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const queryClient = useQueryClient();

  const archiveAssessmentMutation = useMutation(
    archiveAssessmentApi.handleArchiveAssessmentApi,
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries(["activeAssessments"]);
        queryClient.invalidateQueries(["archivedAssessments"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  const handleUpdateArchive = async () => {
    archiveAssessmentMutation.mutate({ assessment_id: item.id });
  };

  return (
    <>
      <div
        className="mt-[20px]"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <div className="overflow-hidden group cursor-pointer relative w-full min-w-[285px] px-[20px] border-[1px] border-solid border-[#DEDDDD] hover:border-[#009DBE] rounded-[16px]">
          <Image
            className={`absolute top-0 left-0 w-full h-full z-[1] transition-all ${
              isHover ? "scale-[6]" : ""
            }`}
            src="/hrview/createassessment/bg-assessment.png"
            alt=""
            height={510}
            width={456}
          />
          <div className="z-[2] group-hover:animate-zoom-in top-0 right-3 animate-zoom-out absolute flex items-center justify-end gap-[10px] mt-[20px]">
            <Tooltip
              title="View assessment"
              placement="right"
              overlayClassName="test"
              overlayInnerStyle={{
                backgroundColor: "#fff",
                color: "#111315",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                padding: "12px",
              }}
            >
              <button className="cursor-pointer z-[2]">
                <Image
                  src="/hrview/createassessment/eye-img.png"
                  alt=""
                  className="cursor-pointer z-[2]"
                  width={20}
                  height={16}
                />
              </button>
            </Tooltip>

            <Tooltip
              title="Duplicate assessment"
              placement="right"
              overlayClassName="test"
              overlayInnerStyle={{
                backgroundColor: "#fff",
                color: "#111315",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                padding: "12px",
              }}
            >
              <button className="cursor-pointer z-[2]">
                <Image
                  src="/hrview/createassessment/copy-img.png"
                  alt=""
                  className="cursor-pointer z-[2]"
                  width={20}
                  height={16}
                />
              </button>
            </Tooltip>

            <Tooltip
              title="Archive assessment"
              placement="right"
              overlayClassName="test"
              overlayInnerStyle={{
                backgroundColor: "#fff",
                color: "#111315",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                padding: "12px",
              }}
            >
              <button
                className="cursor-pointer z-[2]"
                onClick={handleUpdateArchive}
              >
                <Image
                  src="/hrview/createassessment/download-img.png"
                  alt=""
                  className="cursor-pointer z-[2]"
                  width={20}
                  height={16}
                />
              </button>
            </Tooltip>

            <Tooltip
              title="Delete assessment"
              placement="right"
              className="test"
              overlayClassName="test"
              overlayInnerStyle={{
                backgroundColor: "#fff",
                color: "#111315",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "24px",
                padding: "12px",
              }}
            >
              <button
                onClick={() => setIsDelete(true)}
                className="cursor-pointer z-[2]"
              >
                <Image
                  src="/hrview/createassessment/delete-img.png"
                  alt=""
                  className="cursor-pointer z-[2]"
                  width={20}
                  height={16}
                />
              </button>
            </Tooltip>
          </div>
          <div className="w-full max-w-[193px] mb-[30px] mt-[130px] relative z-[4]">
            <h3 className="text-[20px] leading-[28px] font-[500] font-poppins text-[#111315]">
              {item.name}
            </h3>
            <div className="bg-gradient-to-r my-[10px] from-[#33B1CB] to-[#fff] h-[1px]"></div>
            <p className="text-[12px] leading-[16px] font-[400] font-poppins text-[#6F767E]">
              Number of participants:
              <span className="font-[600] text-[#111315] ml-[5px]">8</span>
            </p>
            <p className="mt-[8px] text-[12px] leading-[16px] font-[400] font-poppins text-[#6F767E]">
              Last activity:
              <span className="font-[600] text-[#111315] ml-[5px]">
                {Math.abs(
                  differenceInDays(
                    parse(item.start_date, "dd/MM/yyyy HH:mm:ss", new Date()),
                    parse(item.end_date, "dd/MM/yyyy HH:mm:ss", new Date())
                  )
                )}{" "}
                days ago
              </span>
            </p>
            <Link
              href={`/list-assessment/${item.id}`}
              className="mt-[8px] flex gap-[10px] items-center text-[#009DBE]"
              style={{ color: "#009DBE" }}
            >
              Details
              <Image
                src="/hrview/createassessment/btn-next.png"
                alt=""
                width={18}
                height={15}
              />
            </Link>
          </div>
        </div>
      </div>
      <div key={item.id}>
        <DeleteModal
          id={item.id}
          open={isDelete}
          onClose={() => setIsDelete(false)}
        />
      </div>
    </>
  );
}
