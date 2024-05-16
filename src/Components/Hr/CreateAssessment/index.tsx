import getListAssessment from "@/api/hr/listAssessment";
import Skeleton from "@/common/Skeleton";
import { Button } from "antd";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import ActiveAssessment from "./ActiveAssessment";
import ArchivedAssessment from "./ArchivedAssessment";
import CreateAssessmentModal from "./CreateAssessmentModal";
import DefaultHead from "@/layouts/default-head";

export default function CreateAssessment() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["activeAssessments"],
    queryFn: () => getListAssessment.handleGetListAssessmentApi({ status: 1 }),
  });

  const { data: dataArchive } = useQuery({
    queryKey: ["archivedAssessments"],
    queryFn: () => getListAssessment.handleGetListAssessmentApi({ status: 0 }),
  });

  const archiveAssessmentMutation = useMutation(
    getListAssessment.handleGetListAssessmentApi,
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries(["activeAssessments"]);
        queryClient.invalidateQueries(["archivedAssessments"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const unArchiveAssessmentMutation = useMutation(
    getListAssessment.handleGetListAssessmentApi,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["activeAssessments"]);
        queryClient.invalidateQueries(["archivedAssessments"]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <>
      <DefaultHead />
      <div className="mt-[20px]">
        <div className="flex justify-between">
          <h4 className="text-[32px] leading-[44px] font-[600] font-poppins">
            Active assessments
          </h4>

          <Button
            onClick={() => setIsOpen(true)}
            type="primary"
            icon={<img src="/hrview/createassessment/btn-create.png" />}
            className="h-[40px] btn-create flex items-center"
          >
            Create new assessment
          </Button>
        </div>
        <div className="flex flex-wrap items-center gap-[40px]">
          {isLoading ? (
            <div className="flex flex-wrap items-center gap-[40px] mt-[20px]">
              <Skeleton width="283px" height="241px" />
              <Skeleton width="283px" height="241px" />
              <Skeleton width="283px" height="241px" />
              <Skeleton width="283px" height="241px" />
            </div>
          ) : (
            data?.data?.data?.assessments?.map((item: any, index: any) => (
              <ActiveAssessment key={item.id} item={item} />
            ))
          )}
        </div>
        <div className="mt-[50px]">
          <h4 className="text-[32px] leading-[44px] font-[600] font-poppins">
            Archived assessments
          </h4>
          <div className="flex flex-wrap items-center gap-[40px] mt-[20px]">
            {isLoading ? (
              <div className="flex flex-wrap items-center gap-[40px]">
                <Skeleton width="283px" height="241px" />
                <Skeleton width="283px" height="241px" />
              </div>
            ) : (
              dataArchive?.data?.data?.assessments?.map(
                (item: any, index: any) => (
                  <ArchivedAssessment item={item} key={item.id} />
                )
              )
            )}
          </div>
        </div>
      </div>

      <CreateAssessmentModal open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
