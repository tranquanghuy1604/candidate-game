import detailAssessmentApi from "@/api/hr/detailAssessment";
import { Button, Dropdown, type MenuProps } from "antd";
import { differenceInCalendarDays, format, parse } from "date-fns";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import IncludedTest from "./IncludedTest";
import InviteParticipantsModal from "./InviteParticipantsModal";
import Nodata from "./Nodata";
import Skeleton from "@/common/Skeleton";
import { useMutation, useQuery } from "react-query";
import getListCandidateApi from "@/api/hr/listCandidate";
import TableResultCandidate from "./TableResultCandidate";
import EditAssessment from "./EditAssessment";

export default function InviteAssessment({ id }: any) {
  const [isOpenInvite, setIsOpenInvite] = useState(false);
  const [menu, setMenu] = useState<any>([]);
  const [menuCandidate, setMenuCandidate] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const items: MenuProps["items"] = [
    {
      label: (
        <button onClick={() => setIsOpenInvite(true)}>Invite applicants</button>
      ),
      key: "0",
    },
    {
      label: <button>Invite employees</button>,
      key: "1",
    },
  ];

  const details: MenuProps["items"] = [
    {
      label: (
        <button onClick={() => setIsOpenEdit(true)}>Edit Assessment</button>
      ),
      key: "0",
    },
    {
      label: <button>Archive Assessment</button>,
      key: "1",
    },
    {
      label: <button>Delete Assessment</button>,
      key: "2",
    },
  ];

  const param = useParams();

  const { data: listCandidate } = useQuery({
    queryKey: ["listCandidate"],
    queryFn: () =>
      getListCandidateApi.handleGetListCandidateApi({
        type: 1,
        option: 2,
        assessment_id: Number(param?.assessment_id),
      }),
    onSuccess: (data) => {
      setMenuCandidate(data?.data?.data?.result);
    },
    enabled: !!param?.assessment_id,
  });

  // console.log(menuCandidate);

  const detailAssessmentMutation = useMutation(
    detailAssessmentApi.handleGetDetailAssessmentApi,
    {
      onSuccess: (data) => {
        setMenu(data?.data?.data?.assessment);
      },
      onError: (error) => {},
    }
  );

  const isLoading = detailAssessmentMutation.isLoading;

  useEffect(() => {
    if (param?.assessment_id) {
      detailAssessmentMutation.mutateAsync(param.assessment_id[0]);
    }
  }, [param]);

  const formatDateRange = (
    startDateStr: string | undefined,
    endDateStr: string | undefined
  ) => {
    if (!startDateStr || !endDateStr) {
      return "";
    }
    const startDate = parse(startDateStr, "dd/MM/yyyy HH:mm:ss", new Date());
    const endDate = parse(endDateStr, "dd/MM/yyyy HH:mm:ss", new Date());
    const formattedStartDate = format(startDate, "dd MMMM yyyy");
    const formattedEndDate = format(endDate, "dd MMMM yyyy");
    const daysDifference = differenceInCalendarDays(endDate, startDate);
    const formattedString = `Date: From ${formattedStartDate} to ${formattedEndDate} • ${daysDifference} days`;
    return formattedString;
  };
  const formattedString = formatDateRange(menu?.start_date, menu?.end_date);
  // console.log(formattedString);

  return (
    <div className="mt-[30px]">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[10px]">
          <Link href="/list-assessment">
            <Button
              icon={
                <img
                  className="w-full h-full"
                  src="/hrview/inviteassessment/ic-back.png"
                />
              }
              className="border-none rounded-full btn-create flex items-center active:scale-90"
              style={{ width: "40px" }}
            />
          </Link>
          <div>
            <p className="text-[20px] leading-[28px] font-[500] text-[#111315]">
              {menu?.name}
            </p>
            <p className="text-[12px] leading-[16px] font-[400] text-[#111315]">
              <span className="text-[#6F767E]">Date: </span>From{" "}
              {formattedString}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-[10px]">
          <Dropdown
            menu={{
              items: items,
            }}
            trigger={["click"]}
          >
            <Button
              type="primary"
              icon={<img src="/hrview/inviteassessment/ic-add.png" />}
              className="h-[40px] btn-create flex items-center"
            >
              Invite participants
            </Button>
          </Dropdown>

          <Dropdown menu={{ items: details }} trigger={["click"]}>
            <Button
              icon={<img src="/hrview/inviteassessment/ic-select.png" />}
              className="border-none rounded-full btn-create flex items-center"
              style={{ width: "40px" }}
            />
          </Dropdown>
        </div>
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-[#fff] via-[#000] to-[#fff] mt-[20px]"></div>

      <div>
        <h2 className="text-[20px] mt-[20px] leading-[28px] font-[500] text-[#111315]">
          IncludedTest
        </h2>
        <div className="flex items-center gap-[20px] flex-wrap">
          {isLoading ? (
            <div className="flex items-center gap-[20px] flex-wrap">
              <Skeleton width="147px" height="91px" />
              <Skeleton width="147px" height="91px" />
              <Skeleton width="147px" height="91px" />
              <Skeleton width="147px" height="91px" />
            </div>
          ) : (
            menu?.games?.map((item: any) => (
              <IncludedTest key={item.id} item={item} />
            ))
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="mt-[30px]">
          <Skeleton width="1177px" height="500px" />
        </div>
      ) : (
        <div>
          {menuCandidate && menuCandidate.length > 0 ? (
            <TableResultCandidate
              listCandidate={menuCandidate}
              listGame={menu}
              setListCandidate={setMenuCandidate}
            />
          ) : (
            <Nodata />
          )}
        </div>
      )}
      {isOpenInvite && (
        <InviteParticipantsModal
          open={isOpenInvite}
          id={id}
          onClose={() => setIsOpenInvite(false)}
          token={menu?.token}
        />
      )}
      {isOpenEdit && (
        <EditAssessment
          listCandidate={menu}
          open={isOpenEdit}
          onClose={() => setIsOpenEdit(false)}
        />
      )}
    </div>
  );
}
