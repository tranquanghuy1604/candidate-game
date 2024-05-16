import TestLogicalChallenge from "@/Components/Candidate/Assessment/LogicalChallenge/TestLogicalChallenge/TestLogicalChallenge";
import TestNumericalChallenge from "@/Components/Candidate/Assessment/NumericalChallenge/TestNumericalChallenge/TestNumericalChallenge";
import TestVerbalChallenge from "@/Components/Candidate/Assessment/VerbalChallenge/TestVerbalChallenge/TestVerbalChallenge";
import TestVisualChallenge from "@/Components/Candidate/Assessment/VisualChallenge/TestVisualChallenge";
import finishGameApi from "@/api/candidate/finishGameApi";
import generateQuestionApi from "@/api/candidate/generateQuestionApi";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function GamePlayingPage() {
  const router = useRouter();
  const [question, setQuestion] = useState(null);
  const { assessment_id } = router.query;
  const [showCountDown, setShowCountDown] = useState(false);
  const [time, setTime] = useState<number>(250);
  const [score, setScore] = useState(0);
  const queryClient = useQueryClient();

  const finishGameMutation = useMutation(finishGameApi.handleFinishGameApi, {
    onSuccess: (data) => {
      setScore(data?.data?.data?.score);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data } = useQuery({
    queryKey: ["generateQuestion"],
    queryFn: () =>
      generateQuestionApi.handleGetGenerateQuestionApi({
        game_id: Number(assessment_id),
      }),
    onSuccess: async (data) => {
      setTime(data?.data?.data?.time - data?.data?.data?.used_time);
      setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    },
    enabled: router.isReady,
  });

  useEffect(() => {
    if (data) {
      setQuestion(data?.data?.data);
    }
  }, [data]);

  useEffect(() => {
    if (time === 0) {
      finishGameMutation.mutate({ game_id: Number(assessment_id) });
      queryClient.invalidateQueries(["generateQuestion"]);
    }
  }, [time]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setShowCountDown(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
      setShowCountDown(true);
    };
  }, []);

  if (Number(assessment_id) === 2) {
    return (
      <>
        {showCountDown ? (
          <div className="min-h-screen flex justify-center items-center">
            <Image
              src="/candidate/assessment/coutdown.gif"
              width={500}
              height={500}
              alt="Countdown"
            />
          </div>
        ) : (
          <div>
            <TestNumericalChallenge
              score={score}
              useFinishGame={finishGameMutation}
              time={time}
              question={question}
              setQuestion={setQuestion}
              id={Number(assessment_id)}
            />
          </div>
        )}
      </>
    );
  }
  if (Number(assessment_id) === 3) {
    return (
      <div>
        <TestLogicalChallenge
          score={score}
          useFinishGame={finishGameMutation}
          time={time}
          question={question}
          id={Number(assessment_id)}
          setQuestion={setQuestion}
        />
      </div>
    );
  }
  if (Number(assessment_id) === 4) {
    return (
      <div>
        <TestVisualChallenge />
      </div>
    );
  }
  if (Number(assessment_id) === 1) {
    return (
      <div>
        <TestVerbalChallenge
          score={score}
          useFinishGame={finishGameMutation}
          time={time}
          question={question}
          id={Number(assessment_id)}
          setQuestion={setQuestion}
        />
      </div>
    );
  }
}
