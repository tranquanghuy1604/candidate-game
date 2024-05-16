import answerQuestionApi from "@/api/candidate/answerQuestionApi";
import finishGameApi from "@/api/candidate/finishGameApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

interface TestLogicalChallengeProps {
  id: number;
  question: any;
  setQuestion: (value: any) => void;
  time: number;
  useFinishGame: any;
  score: number;
}

export default function TestLogicalChallenge({
  id,
  question,
  setQuestion,
  time,
  useFinishGame,
  score,
}: TestLogicalChallengeProps) {
  const [result, setResult] = useState(-1);
  const queryClient = useQueryClient();
  const [checkNum, setCheckNum] = useState(false);
  const answer = {
    answer1: "Yes",
    answer2: "No",
  };

  const answerQuestionMutation = useMutation(
    answerQuestionApi.handleGetQuestionAnswerApi,
    {
      onSuccess: (data) => {
        setResult(data?.data?.data?.result);
        console.log(data?.data?.data?.result);
        console.log(data?.data?.data?.used_time);
        setTimeout(() => {
          setQuestion(data?.data?.data);
        }, 1500);

        if (data?.data?.data?.answered_question_num === 19) {
          setCheckNum(true);
          useFinishGame.mutate({ game_id: id });
          queryClient.invalidateQueries(["listGame"]);
        }
      },
      onError: (error) => {},
    }
  );

  const handleSkipQuestion = async () => {
    await answerQuestionMutation.mutate({
      question_id: Number(question?.question?.id),
      answer: "Yes",
      game_id: Number(question?.question?.game_id),
      is_skip: 1,
    });
  };

  const handleAnswerQuestion = async (value: any) => {
    answerQuestionMutation.mutateAsync({
      question_id: Number(question?.question?.id),
      answer: value,
      game_id: Number(question?.question?.game_id),
      is_skip: 0,
    });

    setTimeout(() => {
      setResult(-1);
    }, 1500);
  };

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "ArrowUp") {
        handleSkipQuestion();
      }
      if (event.key === "ArrowRight") {
        handleAnswerQuestion(answer.answer1);
      }
      if (event.key === "ArrowLeft") {
        handleAnswerQuestion(answer.answer2);
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [answer]);

  return (
    <>
      {question?.game_ended === true || checkNum ? (
        <div className="relative p-8">
          <div className="absolute top-0 z-[-1] left-0">
            <Image
              src="/candidate/assessment/item-chose/verbalchallenge/bg-1.png"
              alt=""
              className="w-full"
              width={1028}
              height={773}
            />
          </div>
          <div className="absolute top-0 z-[-1] right-0">
            <Image
              src="/candidate/assessment/item-chose/verbalchallenge/bg-2.png"
              alt=""
              className="w-full"
              width={691}
              height={1206}
            />
          </div>
          <Link href={`/candidate/assessment/${id}`} className="cursor-pointer">
            <Image
              src="/candidate/assessment/item-chose/verbalchallenge/ic-cancel.png"
              width={40}
              height={50}
              alt=""
              className="h-[40px] w-[40px] active:scale-[0.85] transition-all"
            />
          </Link>
          <div className="mt-[30px] bg-white px-24 py-12  h-[800px] flex justify-center items-center border-[1px] border-[#009DBE] rounded-[16px] w-full max-w-[1000px] mx-auto">
            <div className="flex items-center">
              <p className="text-[64px] font-[500] text-[#009DBE]">
                Your score:
                {score}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative px-[10px] py-[30px] md:p-8">
          {result === 1 && (
            <div className="absolute top-[50%] left-[50%] z-[10] translate-x-[-50%] translate-y-[-50%]">
              <Image
                src="/candidate/assessment/successful.png"
                width={80}
                height={80}
                alt="ic-success"
                className=""
              />
            </div>
          )}

          {result === 0 && (
            <div className="absolute top-[50%] left-[50%] z-[10] translate-x-[-50%] translate-y-[-50%]">
              <Image
                src="/candidate/assessment/fail.png"
                width={80}
                height={80}
                alt="ic-fail"
                className=""
              />
            </div>
          )}

          {result !== 0 && result !== 1 && ""}
          <div className="hidden md:block absolute top-0 z-[-1] left-0">
            <Image
              src="/candidate/assessment/item-chose/verbalchallenge/bg-1.png"
              alt=""
              className="w-full"
              width={1028}
              height={773}
            />
          </div>
          <div className="hidden md:block absolute top-0 z-[-1] right-0">
            <Image
              src="/candidate/assessment/item-chose/verbalchallenge/bg-2.png"
              alt=""
              className="w-full"
              width={691}
              height={1206}
            />
          </div>
          <Link
            href={`/candidate/assessment/${id}`}
            className="hidden md:block cursor-pointer"
          >
            <Image
              src="/candidate/assessment/item-chose/verbalchallenge/ic-cancel.png"
              alt=""
              className="h-[40px] w-[40px] active:scale-[0.85] transition-all"
              width={40}
              height={50}
            />
          </Link>
          <div className="md:mt-[30px] bg-white md:px-24 md:py-12 md:border-[1px] md:border-[#009DBE] md:rounded-[16px] w-full max-w-[1000px] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex gap-[10px]">
                <div className="hidden md:block w-[12px] rounded-[40px] bg-[#009DBE]"></div>
                <div className="flex items-center gap-[10px]">
                  <img
                    width={32}
                    height={32}
                    src="/candidate/home/mb-close.png"
                    alt=""
                    className="md:hidden"
                  />
                  <h4 className="text-[#111315] text-[16px] md:text-[32px] font-[600] leading-[20px] md:leading-[44px]">
                    Logical challenge
                  </h4>
                </div>
              </div>
              <div className="flex items-center gap-[30px]">
                <div className="flex gap-[10px] items-center">
                  <Image
                    className="w-[48px] h-[48px]"
                    src="/candidate/assessment/item-chose/verbalchallenge/ic-time.png"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                    {time}s
                  </p>
                </div>
                <div className="hidden md:flex gap-[10px] items-center">
                  <Image
                    className="w-[48px] h-[48px]"
                    src="/candidate/assessment/item-chose/verbalchallenge/ic-point.png"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                    {question?.answered_question_num + 1}/
                    {question?.total_question}
                  </p>
                </div>
                <div className="flex gap-[10px] items-center">
                  <Image
                    className="w-[48px] h-[48px]"
                    src="/candidate/assessment/item-chose/verbalchallenge/ic-cup.png"
                    width={48}
                    height={48}
                    alt=""
                  />
                  <p className="text-[#111315] font-[600] text-[20px] leading-[28px]">
                    {question?.total_score}
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:block mt-[20px] h-[1px] w-full bg-gradient-to-r from-[#ffff] via-[#99D8E5] to-[#ffff]"></div>
            <div className="hidden md:block mt-[30px]">
              <Image
                className="w-full mx-auto max-w-[500px]"
                src="/candidate/assessment/item-chose/verbalchallenge/verbal-img.png"
                alt=""
                width={500}
                height={124}
              />
            </div>
            <p className="mt-[40px] md:mt-0 text-[20px] leading-[28px] font-[500] text-[#6F767E] text-center my-[15px]">
              Does the conclusion logically follow the statements?
            </p>
            <div className="mt-[30px]">
              <div className="w-full max-w-[600px] cursor-pointer mx-auto border-[1px] border-[#DEDDDD] rounded-[16px]">
                <p className="text-center text-[#111315] text-[20px] leading-[28px] font-[500] py-[10px]">
                  <span className="mr-[10px]">A.</span>
                  {question?.question?.content?.question?.statement_1}
                </p>
                <p className="text-center text-[#111315] text-[20px] leading-[28px] font-[500] py-[10px]">
                  <span className="mr-[10px]">B.</span>
                  {question?.question?.content?.question?.statement_2}
                </p>
              </div>
              <p className="md:hidden text-[16px] leading-[24px] font-[600] mt-[30px] mb-[5px]">
                Conclusion
              </p>
              <div className="w-full md:mt-[30px] h-[80px] flex items-center justify-center max-w-[600px] cursor-pointer mx-auto border-[1px] border-[#DEDDDD] rounded-[16px]">
                <p className="text-center flex items-center text-[#111315] text-[20px] leading-[28px] font-[500] py-[10px]">
                  <span className="hidden md:block mr-[10px] bg-[#CCEBF2] p-2 rounded-[8px]">
                    Conclusion:
                  </span>
                  <div className="flex md:block gap-[20px] items-center">
                    <img
                      className="md:hidden"
                      src="/candidate/assessment/ic-right.png"
                      alt=""
                    />
                    {question?.question?.content?.question?.conclusion}
                  </div>
                </p>
              </div>
            </div>
            <div className="mt-[80px]">
              <button onClick={handleSkipQuestion} className="w-full">
                <p className="uppercase text-[#111315] text-[20px] leading-[28px] font-[500] text-center">
                  skip
                </p>
                <div className="mx-auto w-full max-w-[80px] cursor-pointer">
                  <Image
                    height={80}
                    width={80}
                    src="/candidate/assessment/item-chose/verbalchallenge/skip-btn.png"
                    alt=""
                    className="active:scale-[0.9] transition w-full"
                  />
                </div>
              </button>
              <div className="flex gap-[200px] justify-center">
                <div className="md:flex items-center gap-[20px]">
                  <p className="hidden md:block text-[#111315] text-[20px] leading-[28px] font-[500] whitespace-nowrap">
                    No
                  </p>
                  <button onClick={() => handleAnswerQuestion("No")}>
                    <Image
                      height={100}
                      width={100}
                      className="active:scale-[0.9] transition w-[100px]"
                      src="/candidate/assessment/item-chose/verbalchallenge/prev-btn.png"
                      alt=""
                    />
                  </button>
                  <p className="text-[#111315] text-center md:hidden text-[20px] leading-[28px] font-[500] whitespace-nowrap">
                    No
                  </p>
                </div>
                <div className="md:flex items-center gap-[20px]">
                  <button onClick={() => handleAnswerQuestion("Yes")}>
                    <Image
                      height={100}
                      width={100}
                      className="active:scale-[0.9] transition w-[100px]"
                      src="/candidate/assessment/item-chose/verbalchallenge/next-btn.png"
                      alt=""
                    />
                  </button>
                  <p className="text-[#111315] text-center md:text-left text-[20px] leading-[28px] font-[500] whitespace-nowrap">
                    Yes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
