import { Modal, Progress } from "antd";
import React, { useState } from "react";
import type { UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import Link from "antd/es/typography/Link";

export default function UploadFIleModal({ onOpen, onClose }: any) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [uploadError, setUploadError] = useState(false);

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setUploading(true);
      setProgress(Math.floor((info.file.percent || 0) * 100) / 100);
    } else {
      if (info.file.status === "done") {
        setUploadSuccess(true);
        setFileName(info.file.name); // Lưu tên file vào state
        setTimeout(() => {
          setUploading(false);
          setProgress(0);
        }, 500);
      } else if (info.file.status === "error") {
        setUploadError(true);
      } else {
        setFileName("");
      }
    }
  };
  return (
    <Modal
      centered
      open
      onCancel={onClose}
      title="Import participants email list"
      footer={false}
      width={800}
    >
      <div
        className={`${
          uploadError ? "bg-[#FFF7F5]" : "bg-[#F0F9FB]"
        } p-10 rounded-[8px] border-[1px] border-[#6F767E] border-dashed`}
      >
        {uploadSuccess ? (
          <div>
            {uploading ? (
              <div>
                <img
                  className="w-[60px] h-[60px] mx-auto"
                  src="/hrview/inviteassessment/invitemodal/upload-file/upload-img.png"
                  alt=""
                />
                <p className="mt-[10px] text-center text-[#111315] text-[16px] leading-[24px] font-[400]">
                  {fileName}
                </p>
              </div>
            ) : (
              <div>
                <img
                  className="w-[60px] h-[60px] mx-auto"
                  src="/hrview/inviteassessment/invitemodal/upload-file/img-success.png"
                  alt=""
                />
                <p className="mt-[10px] text-center text-[#111315] text-[16px] leading-[24px] font-[400]">
                  {fileName}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-[#111315] text-[16px] leading-[24px] font-[400]">
            {uploadError
              ? "Drag and drop .xls or .xlsx file here or"
              : fileName}
            {fileName ? fileName : "Drag and drop .xls or .xlsx file here or"}
          </p>
        )}

        <Upload
          onChange={handleChange}
          className="upload-list-inline mt-[10px] "
          accept=".xls,.xlsx"
          multiple={false}
          showUploadList={false}
        >
          {uploadSuccess ? (
            <div className="text-[#009DBE] text-[16px] leading-[24px] font-[500]">
              Upload list participants successfully!
            </div>
          ) : (
            <div>
              <Button className="bg-[#CCEBF2] text-[16px] leading-[24px] font-[500] text-[#009DBE]">
                Select file
              </Button>
              {uploadError ? (
                <div className="text-[#DD0F05] text-[16px] leading-[24px] font-[500]">
                  Upload failed, please try again
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </Upload>
        {uploading && (
          <div className="mt-4">
            <Progress percent={progress} />
            <p>Uploading...</p>
          </div>
        )}
      </div>
      <div className="mt-[10px]">
        <p>
          Your excel file upload must only contains collumn.A for list of
          participants email, no header. Upload participants using your own file
          or{" "}
          <Link href="#" style={{ color: "#009DBE" }}>
            Download sample file
          </Link>
        </p>
        {uploadSuccess && !uploadError ? (
          <div className="w-full max-w-[263px] mx-auto h-[44px] mt-[30px]">
            <Button className="h-full w-full text-center" type="primary">
              View your assessment
            </Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
}
