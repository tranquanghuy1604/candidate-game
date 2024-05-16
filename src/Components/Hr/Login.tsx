import getListAssessment from "@/api/hr/listAssessment";
import loginApi from "@/api/hr/login";
import InputField from "@/common/Controller/InputField";
import InputFieldPassword from "@/common/Controller/InputFieldPassword";
import useAuth from "@/zustand/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as yup from "yup";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
});

export default function Login() {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);
  const [currentRouter, setCurrentRouter] = useState("");
  const useQuery = useQueryClient();
  const email = useAuth((state) => state.data);
  const updateAuth = useAuth((state) => state.upDateAuth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setCurrentRouter(router.asPath);
  }, []);

  // const onSubmit = async (data: any) => {
  //   try {
  //     if (currentRouter) {
  //       cookie.remove("access_token");
  //     }
  //     const res = await loginApi.getLoginApi(data);
  //     // console.log(await updateAuth(data));
  //     if (res) {
  //       setLoading(true);
  //       cookie.set("access_token", res?.data?.data?.access_token, {
  //         expires: 3,
  //       });
  //       toast.success("Đăng nhập thành công");
  //       router.push("/list-assessment");
  //     } else {
  //       toast.error("Đăng nhập thất bại");
  //     }
  //   } catch (error) {
  //     toast.error("Đăng nhập thất bại");
  //   }
  // };

  const loginMutation = useMutation(loginApi.getLoginApi, {
    onSuccess: async (data) => {
      cookie.set("access_token_hr", data?.data?.data?.access_token, {
        expires: 3,
      });
      toast.success("Đăng nhập thành công");
      await getListAssessment.handleGetListAssessmentApi;
      router.push("/list-assessment");
    },
    onError: (error) => {
      toast.error("Đăng nhập thất bại");
    },
  });

  const loading = loginMutation.isLoading;
  const dataAuth = loginMutation.data;
  // console.log("dataAuth", dataAuth?.data?.data?.email);

  const onSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem("email", data?.email);
    loginMutation.mutate(data);
  };

  return (
    <div className="p-8">
      <div className="cursor-pointer">
        <Image
          className="w-full max-w-[200px]"
          src="/hrview/home/logo.png"
          alt=""
          width={200}
          height={60}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="w-[50%]">
          <Image
            className="w-full mx-auto"
            src="/hrview/login/pytalent-img.png"
            alt=""
            height={680}
            width={680}
          />
        </div>
        <div className="w-[50%] flex justify-center">
          <div>
            <h3 className="text-center text-[40px] leading-[56px] font-[600] font-poppins">
              Welcome to pytalent
            </h3>
            <div className="w-full mx-auto">
              <form
                autoComplete="off"
                name="basic"
                style={{ maxWidth: 600 }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mt-[20px]">
                  <label className="text-[16px] leading-[24px] font-[600] font-poppins">
                    Email
                  </label>
                  <InputField
                    name="email"
                    control={control}
                    placeholder="'Email"
                    errors={errors}
                  />
                </div>

                <div className="mt-[20px]">
                  <label className="text-[16px] leading-[24px] font-[600] font-poppins">
                    Password
                  </label>
                  <InputFieldPassword
                    name="password"
                    placeholder="Password"
                    control={control}
                    errors={errors}
                  ></InputFieldPassword>
                </div>

                <Button
                  type="primary"
                  className="w-full mt-[20px]"
                  htmlType="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              </form>
              <div className="mt-[30px] flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-[18px] leading-[24px] font-[400] font-poppins underline underline-offset-1 text-[#009DBE]"
                >
                  Forgot password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
