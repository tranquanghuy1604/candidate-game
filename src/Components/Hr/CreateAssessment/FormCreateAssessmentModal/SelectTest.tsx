import { Button, Checkbox, Radio } from "antd";
import { useState } from "react";
import { treeData } from "../projectData";

export default function SelectTest({
  valueList,
  setValueList,
  selectedValueRadioButton,
  setSelectValueRadioButton,
  setValue,
  errors,
  register,
  listGame,
}: any) {
  const [showOptionCheckBox, setShowOptionCheckBox] = useState(false);
  const [checkedState, setCheckedState] = useState({});

  const handleCheckboxChange = (title: string, value: any) => {
    if (valueList.includes(title as never)) {
      setValueList(valueList.filter((item: string) => item !== title));
    } else {
      setValueList([...valueList, title] as any);
    }
    // }
    setCheckedState((prevState: string[]) => ({
      ...prevState,
      [title]: !prevState[title as any],
    }));
    setValue("selectTest", [...value]);
  };

  return (
    <div className="mt-[20px]">
      <label className="block text-[16px] font-[500] leading-[24px]">
        Select tests *
      </label>
      <div className="relative text-left w-full min-h-[56px] border-[1px] border-solid border-[#DEDDDD] rounded-[8px] p-4">
        <div
          onClick={() => setShowOptionCheckBox(!showOptionCheckBox)}
          className="text-[16px] leading-[24px] flex justify-between font-[400] text-[#6F767E]"
        >
          {valueList.length > 0 ? (
            <div className="flex flex-wrap">
              {valueList.map((item: string, index: any) => (
                <div key={index}>
                  {item} {","}
                </div>
              ))}
            </div>
          ) : (
            <p>List of test</p>
          )}
          <svg
            className="-mr-1 ml-2 h-5 w-5 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {errors?.selectTest && valueList.length === 0 && (
        <span className="text-red-500">{errors?.selectTest.message}</span>
      )}
      {showOptionCheckBox && (
        <div className="absolute px-4 z-10 py-[20px] mt-2 min-w-[400px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <p className="text-[#6F767E] text-[16px] leading-[24px] font-[400]">
            Choose tests for your assessmentes
          </p>
          {listGame.map((item: any) => (
            <div
              key={item.id}
              className="py-1cursor-pointer flex items-center gap-[5px]"
              role="menu"
            >
              <Checkbox
                value={selectedValueRadioButton}
                checked={checkedState[item.name as never]}
                className="w-full hover:bg-gray-100 hover:text-gray-900 hover:rounded-[8px]"
                {...register("selectTest")}
                onChange={() =>
                  handleCheckboxChange(item.name, [...valueList, item.name])
                }
              >
                <div
                  className="block py-2 text-sm text-gray-700"
                  role="menuitem"
                >
                  {item.name}
                </div>
              </Checkbox>
            </div>
          ))}
          {/* {showOptionRadioButton && (
            <div>
              <>
                {errors?.radioButton && (
                  <span className="text-red-500 ml-8">
                    {errors?.radioButton.message}
                  </span>
                )}
                <Radio.Group
                  defaultValue={valueList.find((value: string) =>
                    value.startsWith("Personality test")
                  )}
                  className="flex flex-col ml-8 gap-3"
                  {...register("radioButton")}
                  onChange={handleRadioButtonChange}
                >
                  <Radio value={"Personality test in English"}>
                    Personality test in English
                  </Radio>
                  <Radio value={"Personality test in Vietnamese"}>
                    Personality test in Vietnamese
                  </Radio>
                </Radio.Group>
                <span className="flex flex-col ml-8 mt-[10px]  w-4/5 opacity-70">
                  PyTalent offers two languague versions of personality test.
                  You can choose which one is most suitable for your candidates.
                </span>
              </>
            </div>
          )} */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-[20px]"
            onClick={() => setShowOptionCheckBox(false)}
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
