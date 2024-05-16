import getListCandidateApi from "@/api/hr/listCandidate";
import { Button, Select } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface TableResultCandidateProps {
  listGame: any;
  listCandidate: any;
  setListCandidate: (item: any) => void;
}
type SortOrder = "default" | "asc" | "desc";

export default function TableResultCandidate({
  listCandidate,
  listGame,
  setListCandidate,
}: TableResultCandidateProps) {
  const [isActive, setIsActive] = useState(true);
  const queryClient = useQueryClient();
  const param = useParams();
  const [isSortField, setIsSortField] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const getStarColor = (value: number, grading: number) => {
    return value <= grading
      ? "/hrview/inviteassessment/ic-star-vote.png"
      : "/hrview/inviteassessment/ic-star-novote.png";
  };

  const listCandidateMutation = useMutation(
    getListCandidateApi.handleGetListCandidateApi,
    {
      onSuccess: (data) => {
        setListCandidate(data?.data?.data?.result);
      },
    }
  );

  const handleSortField = async (value: string) => {
    let newSortOrder: SortOrder = "default";

    if (isSortField !== value) {
      newSortOrder = "desc";
    } else if (sortOrder === "desc") {
      newSortOrder = "asc";
    } else if (sortOrder === "asc") {
      newSortOrder = "desc";
    }

    setIsSortField(value);
    setSortOrder(newSortOrder);

    const sortType = newSortOrder === "default" ? undefined : newSortOrder;

    if (sortType) {
      listCandidateMutation.mutate({
        type: 1,
        option: 2,
        sort_field: value,
        sort_type: sortType,
        assessment_id: Number(param?.assessment_id),
      });
    }
  };

  console.log("isSortField", isSortField);

  return (
    <div className="mt-[30px]">
      <div className="border-[1px] border-solid border-[#DEDDDD] rounded-[16px] w-full py-[30px] px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[10px]">
            <button
              className={`text-[20px] font-[500] leading-[28px]  ${
                isActive
                  ? "text-[#009DBE] border-[#009DBE] border-b-[2px] transition-all"
                  : "text-[#111315] "
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              Applicants
            </button>
            <button
              className={`text-[20px] font-[500] leading-[28px]  ${
                !isActive
                  ? "text-[#009DBE] border-[#009DBE] border-b-[2px] transition-all"
                  : "text-[#111315]"
              }`}
              onClick={() => setIsActive(!isActive)}
            >
              Employees
            </button>
          </div>
          <Button className="flex items-center justify-between gap-[10px] text-[#009DBE] rounded-[16px] border-[#66C4D8] leading-[24px] font-[500]">
            Export result
            <Image
              src="/hrview/inviteassessment/ic-export.png"
              alt="ic-export"
              width={24}
              height={24}
            />
          </Button>
        </div>
        <div className="mt-[30px] flex items-center gap-[10px]">
          <div className="px-[20px] border-[1px] border-solid border-[#DEDDDD] rounded-[16px] max-w-[370px] flex items-center">
            <p className="text-[#111315] leading-[24px] font-[500] text-[16px]">
              View by:
            </p>
            <Select
              defaultValue="Percentile rank with market data"
              style={{ border: "none", width: "250px" }}
              className="ant-select-table"
              options={[
                {
                  value: "email",
                  label: "Email",
                },
                {
                  value: "rank data",
                  label: "Percentile rank with market data",
                },
              ]}
            />
          </div>
          <div className="cursor-pointer">
            <Image
              alt="ic-question"
              src="/hrview/inviteassessment/ic-question.png"
              height={32}
              width={32}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full mt-[40px] min-w-[1000px]">
            <thead>
              <tr>
                <th
                  className="text-left cursor-pointer"
                  onClick={() => handleSortField("email")}
                >
                  Email
                </th>

                <th className="text-center text-[#009DBE]">Average Aptitude</th>
                {listGame?.games?.map((item: any) => (
                  <th
                    key={item.id}
                    onClick={() => {
                      if (item.name === "Logical challenge") {
                        handleSortField("rank_logical_game");
                      }
                      if (item.name === "Numerical challenge") {
                        handleSortField("rank_numerical_game");
                      }
                      if (item.name === "Visual challenge") {
                        handleSortField("rank_visual_game");
                      }
                      if (item.name === "Verbal challenge") {
                        handleSortField("rank_verbal_game");
                      }
                    }}
                  >
                    <div className="flex items-center gap-[5px] cursor-pointer justify-center">
                      {item?.name}
                      {isSortField !==
                        `rank_${item?.name
                          .split(" ")[0]
                          .toLowerCase()}_game` && (
                        <Image
                          src="/hrview/inviteassessment/ic-sort.png"
                          alt="ic-sort"
                          width={10}
                          height={12}
                        />
                      )}
                      {isSortField ===
                        `rank_${item?.name.split(" ")[0].toLowerCase()}_game` &&
                        sortOrder !== "default" && (
                          <Image
                            src={
                              sortOrder === "asc"
                                ? "/hrview/inviteassessment/ic-2click.png"
                                : "/hrview/inviteassessment/ic-1click.png"
                            }
                            alt="sort order"
                            width={10}
                            height={12}
                          />
                        )}
                    </div>
                  </th>
                ))}
                {/* <th className="text-center text-[#009DBE]">Personality</th> */}
                <th
                  className="text-center"
                  onClick={() => handleSortField("grading")}
                >
                  <div className="flex items-center gap-[5px] cursor-pointer justify-center">
                    Grading
                    {isSortField !== `grading` && (
                      <Image
                        src="/hrview/inviteassessment/ic-sort.png"
                        alt="ic-sort"
                        width={10}
                        height={12}
                      />
                    )}
                    {isSortField === "grading" && sortOrder !== "default" && (
                      <Image
                        src={
                          sortOrder === "asc"
                            ? "/hrview/inviteassessment/ic-2click.png"
                            : "/hrview/inviteassessment/ic-1click.png"
                        }
                        alt="sort order"
                        width={10}
                        height={12}
                      />
                    )}
                  </div>
                </th>
                <th className="text-center">Note</th>
                <th className="text-center">Hiring stage</th>
              </tr>
            </thead>
            <tbody>
              {listCandidate.map((item: any) => (
                <tr key={item.id}>
                  <td className="py-[10px]">{item.email}</td>
                  <td className="text-center py-[10px]">
                    <p className="bg-[#CCEBF2] max-w-[57px] p-2 rounded-[8px] mx-auto">
                      85%
                    </p>
                  </td>
                  {listGame?.games?.map((items: any) => (
                    <td key={items.id} className="text-center py-[10px]">
                      {items?.name === "Numerical challenge" &&
                        item?.numerical_game}
                      {items?.name === "Verbal challenge" && item?.verbal_game}
                      {items?.name === "Logical challenge" &&
                        item?.logical_game}
                      {items?.name === "Visual challenge" && item?.visual_game}
                    </td>
                  ))}
                  {/* <td className="text-center py-[10px] cursor-pointer">
                    <p className="bg-[#CCEBF2] max-w-[50px] p-2 rounded-[8px] mx-auto">
                      <Image
                        src="/hrview/inviteassessment/ic-personality.png"
                        alt="ic-personality"
                        height={19}
                        width={19}
                        className="mx-auto"
                      />
                    </p>
                  </td> */}
                  <td className="text-center ">
                    <div className="py-[10px] flex h-full items-center gap-[5px] justify-center">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Image
                          key={value}
                          src={getStarColor(value, item?.grading)}
                          height={20}
                          width={20}
                          alt="ic-grading"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="mx-auto py-[10px]">
                    <Image
                      src="/hrview/inviteassessment/ic-note.png"
                      alt="ic-note"
                      className="mx-auto cursor-pointer"
                      width={24}
                      height={24}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
