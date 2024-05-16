import VerbalChallenge from "@/Components/Candidate/Assessment/VerbalChallenge";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";

export default function AssessmentPageId() {
  const router = useRouter();
  const { assessment_id } = router.query;
  return (
    <div>
      <VerbalChallenge id={assessment_id} />
    </div>
  );
}
