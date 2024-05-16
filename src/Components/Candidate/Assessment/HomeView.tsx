import candidateLoginApi from "@/api/candidate/candidate-login";
import InputField from "@/common/Controller/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import cookie from "js-cookie";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Email invalid").required("Không được để trống!"),
});

export default function HomeView() {
  const router = useRouter();
  const [currentRouter, setCurrentRouter] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const params = useParams();

  const candidateLoginMutation = useMutation(
    candidateLoginApi.handleCandidateLoginApi,
    {
      onSuccess: (data) => {
        const accessToken = data?.data?.data?.access_token;
        cookie.set("access_token_candidate", accessToken, { expires: 3 });
        toast.success("Đăng nhập thành công");
        router.push("/candidate/assessment");
      },
      onError: (error) => {
        toast.error("Đăng nhập thất bại");
      },
    }
  );

  const isLoading = candidateLoginMutation.isLoading;

  const onSubmit = async (data: any) => {
    if (currentRouter) {
      cookie.remove("access_token");
    }
    candidateLoginMutation.mutate({ token: params?.token, email: data?.email });
  };

  return (
    <div className="p-8">
      <div className="hidden md:block cursor-pointer">
        <Image
          className="w-full max-w-[200px]"
          src="/hrview/home/logo.png"
          width={200}
          height={60}
          alt=""
        />
      </div>
      <div className="mt-[40px] w-full max-w-[500px] mx-auto">
        <div
          className="md:bg-[#fff] md:p-4 md:rounded-[16px]"
          style={{ boxShadow: " 0px 0px 48px -8px #0000001A" }}
        >
          <Image
            className="mx-auto"
            src="/candidate/home/shopee-img.png"
            alt=""
            width={400}
            height={250}
          />
        </div>
        <div className="mt-[60px]">
          <h2 className="text-[#111315] text-center text-[20px] max-w-[199px] md:max-w-[485px] mx-auto md:mx-0 md:text-[48px] leading-[28px] md:leading-[56px] font-[600]">
            Welcome to Shopee assessment
          </h2>
          <div className="text-[#6F767E] md:text-[#111315] text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] font-[400] text-center mt-[20px]">
            <p>Thanks for your interest in this position!</p>
            <p>Please enter your email adress to access the assessment.</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-[30px]">
          <InputField
            name="email"
            control={control}
            placeholder="example@gmail.com"
            errors={errors}
          />

          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            className="w-full h-[45px]"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
