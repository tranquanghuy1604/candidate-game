import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import UploadFIleModal from "./UploadFIleModal";
import Image from "next/image";
import inviteCandidateApi from "@/api/hr/inviteCandidate";
import getListAssessment from "@/api/hr/listAssessment";
import useStore from "@/zustand/assessmentStore";
import copyAssessmentApi from "@/api/hr/copyAssessment";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

export default function InviteParticipantsModal({
  open,
  onClose,
  id,
  token,
}: any) {
  const [value, setValue] = useState("");
  const [renderEmails, setRenderEmails] = useState<string[]>([]);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [link, setLink] = useState("http://localhost:3000/candidate");
  const [listAssessment, setListAssessment] = useState(null);

  const handleEnterEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setRenderEmails((prevRenderEmails) => [value, ...prevRenderEmails]);
      setValue("");
    }
  };

  const handleCopyLink = async (value: string) => {
    if (value) {
      navigator.clipboard.writeText(value).then(
        () => {
          console.log("Link copied successfully!");
        },
        (err) => {
          console.error("Unable to copy link: ", err);
        }
      );
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setRenderEmails(renderEmails.filter((email) => email !== emailToRemove));
  };

  useEffect(() => {
    const handleGetListAssessment = async () => {
      listAssessmentMutation.mutate({ status: 1 });
    };
    handleGetListAssessment();
  }, []);

  const listAssessmentMutation = useMutation(
    getListAssessment.handleGetListAssessmentApi,
    {
      onSuccess: (data) => {
        setListAssessment(data?.data?.data?.assessments);
      },
      onError: (error) => {},
    }
  );

  const inviteCandidateMutation = useMutation(
    inviteCandidateApi.handleInviteCandidateApi,
    {
      onSuccess: (data) => {
        toast.success("Thêm mới email thành công");
      },
      onError: (error) => {
        toast.error("Thêm mới email thất bại");
      },
    }
  );

  const handleInviteEmails = async () => {
    inviteCandidateMutation.mutate({
      list_email: renderEmails,
      assessment_id: Number(id),
      type: 1,
    });
  };

  return (
    <>
      {isOpenUpload ? (
        <UploadFIleModal
          onOpen={isOpenUpload}
          onClose={() => setIsOpenUpload(false)}
        />
      ) : (
        <Modal
          title="Invite participants"
          open={open}
          onOk={onClose}
          onCancel={onClose}
          style={{}}
          width="800px"
          footer={false}
          centered
        >
          <div className="flex justify-between gap-[10px] mt-[20px]">
            <div className="w-full p-2 overflow-y-auto flex flex-wrap gap-[10px] max-h-[152px] border-[1px] scroll-y-auto border-solid border-[#DEDDDD] rounded-[8px]">
              {renderEmails.map((item: any, index) => (
                <div
                  className={`rounded-[16px] flex gap-[5px] items-center px-[12px] h-[32px] bg-[#F4F4F4] + ${
                    !validateEmail(item) ? "border-[#DD0F05] border-[1px]" : ""
                  }`}
                  key={index}
                >
                  <p>{item}</p>
                  <Image
                    className="cursor-pointer"
                    src="/hrview/inviteassessment/invitemodal/ic-close.png"
                    alt=""
                    height={9}
                    width={9}
                    onClick={() => handleRemoveEmail(item)}
                  />
                </div>
              ))}
              <input
                placeholder="Enter email, seperated by comma"
                value={value}
                className="px-[10px] outline-none flex-1 block"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue(e.target.value)
                }
                onKeyDown={handleEnterEmail}
                type="text"
              />
            </div>
            <Button
              className="h-[56px] w-full max-w-[140px]"
              type="primary"
              onClick={handleInviteEmails}
            >
              Send invite
            </Button>
          </div>

          <div className="mt-[50px]">
            <h3 className="text-[16px] leading-[24px] font-[500] text-[#111315]">
              Share your assessment link
            </h3>
            <div className="flex justify-between gap-[20px] mt-[10px]">
              <Input
                // onChange={(e) => setLink(e.target.value)}
                value={`${link}/${token}`}
                disabled
                type="text"
                placeholder="Enter email, seperated by comma"
                className="h-[56px] text-[#6F767E] text-[16px] font-[400] leading-[24px]"
                suffix={
                  <button
                    className="text-[#009DBE] flex items-center gap-[10px]"
                    onClick={() => handleCopyLink(`${link}/${token}`)}
                  >
                    <p className="text-[16px] font-[500] leading-[24px]">
                      Copy link
                    </p>
                    <Image
                      src="/hrview/inviteassessment/ic-copy.png"
                      alt=""
                      height={24}
                      width={24}
                    />
                  </button>
                }
              />
            </div>
            <p className="mt-[10px] text-[12px] leading-[16px] font-[400] text-[#6F767E] ml-[20px]">
              Only invited participants could assess the test
            </p>
          </div>
          <div className="mt-[40px] flex items-center gap-[20px]">
            <p className="text-[16px] leading-[24px] font-[500] text-[#6F767E]">
              You can also import excel file for bulk list of email
            </p>

            <Button
              onClick={() => setIsOpenUpload(true)}
              type="default"
              className="flex items-center border-[#66C4D8] text-[#009DBE] text-[16px] leading-[24px] font-[500]"
            >
              Upload here
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
