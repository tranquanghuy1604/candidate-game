import { Modal } from "antd";
import FormEditAssessmentModal from "./FormEditAssessmentModal/FormEditAssessmentModal";

interface EditAssessmentProps {
  open: boolean;
  onClose: () => void;
  listCandidate: () => void;
}

export default function EditAssessment({
  open,
  onClose,
  listCandidate,
}: EditAssessmentProps) {
  return (
    <Modal
      title="Edit Assessment"
      centered
      open={open}
      onCancel={onClose}
      footer={null}
    >
      <div className="mt-[30px]">
        <FormEditAssessmentModal
          listCandidate={listCandidate}
          onClose={onClose}
        />
      </div>
    </Modal>
  );
}
