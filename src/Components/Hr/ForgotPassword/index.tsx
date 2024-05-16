import InputField from "@/common/Controller/InputField";
import { Button, Form, Input } from "antd";
import Link from "antd/es/typography/Link";
import React, { useState } from "react";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import getForgotPassword from "@/api/hr/forgotPassword";
import Image from "next/image";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
});

export default function ForgotPassword() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    // Submit logic here
    try {
      const res = await getForgotPassword.getForgotPasswordApi(data);
      router.push("/forgot-password/mailcheck");
    } catch (error) {
      console.log(error);
    }
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
            width={680}
            height={680}
          />
        </div>
        <div className="w-[50%] flex justify-center">
          <div>
            <h3 className="text-[40px] leading-[56px] font-[600] font-poppins">
              Welcome to <span className="text-[#009DBE]">pytalent</span>
            </h3>
            <p className="w-full max-w-[444px] mt-[10px] text-[16px] leading-[24px] font-[400] font-poppins text-[#111315]">
              Enter your email address and we will send you instructions to
              reset your password.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[30px]">
              <label className="text-[16px] leading-[24px] font-[600] font-poppins">
                Email
              </label>
              <InputField
                name="email"
                control={control}
                placeholder="Email"
                errors={errors}
              />
              <Button
                type="primary"
                htmlType="submit"
                className="w-full h-[40px] mt-[30px]"
              >
                Submit
              </Button>
            </form>

            <div className="flex justify-end items-center mt-[20px]">
              <p className="text-[18px] leading-[24px] font-[400] font-poppins">
                Take me back to
                <Link
                  href="#"
                  className="text-[#009DBE] ml-[5px] text-[18px] leading-[24px] font-[400] "
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
