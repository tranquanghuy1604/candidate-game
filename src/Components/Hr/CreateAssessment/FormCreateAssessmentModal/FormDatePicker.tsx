import React, { useState } from "react";
import { Button, DatePicker, Space, theme, type DatePickerProps } from "antd";
import { Dayjs } from "dayjs";

export default function FormDatePicker({ onDateChange }: any) {
  const [isOpenDate, setIsOpenDate] = useState(false);
  const cellRender: DatePickerProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type !== "date") {
      return info.originNode;
    }
    if (typeof current === "number" || typeof current === "string") {
      return <div className="ant-picker-cell-inner">{current}</div>;
    }
    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  };
  const { token } = theme.useToken();

  const style: React.CSSProperties = {
    border: `1px solid ${token.colorPrimary}`,
    borderRadius: "50%",
  };

  return (
    <div>
      <div className="mt-[20px] w-full">
        <label className="block text-[16px] font-[500] leading-[24px]">
          Assessment date
        </label>
        <Space size={12} direction="vertical" className="w-full">
          <DatePicker.RangePicker
            placeholder={["Start", "End"]}
            cellRender={cellRender}
            className="min-h-[56px]"
            style={{ width: "100%" }}
            onChange={onDateChange}
            format="DD-MM-YYYY"
            renderExtraFooter={() => (
              <div className="flex justify-end gap-[20px] w-full items-center my-[20px]">
                <Button
                  onClick={() => setIsOpenDate(false)}
                  className="bg-[#CCEBF2] border-none"
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={() => setIsOpenDate(false)}>
                  Apply
                </Button>
              </div>
            )}
          />
        </Space>
      </div>
    </div>
  );
}
