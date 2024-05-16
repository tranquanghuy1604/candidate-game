import deleteAssessmentApi from "@/api/hr/deleteAssessment";
import { Button, Modal } from "antd";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";

export default function DeleteModal({ open, onClose, id }: any) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    deleteAssessmentApi.handleDeleteAssessmentApi,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["activeAssessments"]);
        onClose();
        toast.success("Delete successfully");
      },
      onError: (error) => {
        toast.error("Delete fail");
      },
    }
  );

  const handleRemoveAssessment = async () => {
    await deleteMutation.mutate({ assessment_id: id });
  };
  return (
    <Modal
      centered
      open={open}
      onCancel={onClose}
      footer={[
        <div key={id}>
          <Button
            onClick={onClose}
            className="bg-[#DEDDDD] border-none hover:border-none text-[#22313F] text-[16px] font-[500] leading-[24px]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleRemoveAssessment}
            className="ml-[10px] bg-[#FFE7E1] text-[#E90C31] border-none hover:border-none text-[16px] font-[500] leading-[24px] hover:text-[#E90C31]"
          >
            Delete
          </Button>
        </div>,
      ]}
    >
      <h2 className="text-[32px] leading-[44px] font-[600]">
        Delete assessment
      </h2>
      <p className="mt-[40px] text-[16px] leading-[24px] font-[400] text-[#111315]">
        Are you sure you wish to delete this assessment and its content?
      </p>
    </Modal>
  );
}
