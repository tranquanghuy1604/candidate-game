import InviteAssessment from "@/Components/Hr/DetailAssessment";
import MainLayout from "@/layouts/MainLayout";
import { useRouter } from "next/router";

export default function AssessmentDetail() {
  const router = useRouter();
  const { assessment_id, token } = router.query;
  console.log(token);
  // Hiển thị chi tiết của đánh giá
  return (
    <div>
      <MainLayout>
        <InviteAssessment id={assessment_id} />
      </MainLayout>
    </div>
  );
}
