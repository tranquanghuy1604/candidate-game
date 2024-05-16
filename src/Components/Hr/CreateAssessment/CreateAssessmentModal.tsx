import { Modal } from "antd";
import FormCreateAssessmentModal from "./FormCreateAssessmentModal/FormCreateAssessmentModal";

const CreateAssessmentModal = ({ open, onClose }: any) => {
  return (
    <Modal
      destroyOnClose={true}
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      <h2 className="text-[32px] leading-[44px] font-[600]">
        Create new assessment
      </h2>
      <div className="mt-[30px]">
        <FormCreateAssessmentModal onClose={onClose} />
      </div>
    </Modal>
  );
};

export default CreateAssessmentModal;
