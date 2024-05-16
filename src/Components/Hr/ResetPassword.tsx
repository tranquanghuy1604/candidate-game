import updatePasswordApi from "@/api/hr/updatePassword";
import InputFieldPassword from "@/common/Controller/InputFieldPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import Link from "antd/es/typography/Link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Xác nhận mật khẩu không khớp")
    .required("Xác nhận mật khẩu không được để trống"),
});

export default function ResetPassword() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const defaultValue = {
      new_password: data?.password,
      password: "12345678",
      new_password_confirmation: data?.confirmPassword,
      password_confirmation: "12345678",
    };
    try {
      const res = await updatePasswordApi.updatePassword(defaultValue);

      toast.success("Đăng nhập thành công");
    } catch (error) {
      toast.error("Đăng nhập thất bại");
    }

    console.log(data);
  };
  return (
    <div className="p-8">
      <div className="cursor-pointer">
        <img
          className="w-full max-w-[200px]"
          src="/hrview/home/logo.png"
          alt=""
          width={200}
          height={60}
        />
      </div>
      <div className="flex justify-between ">
        <div className="w-[50%]">
          <img
            className="w-full mx-auto"
            src="/hrview/login/pytalent-img.png"
            alt=""
          />
        </div>
        <div className="w-[50%] flex justify-center pt-[100px]">
          <div>
            <h3 className="text-[40px] leading-[56px] font-[600] font-poppins">
              Welcome to <span className="text-[#009DBE]">pytalent</span>
            </h3>
            <p className="w-full max-w-[444px] mt-[10px] text-[16px] leading-[24px] font-[400] font-poppins text-[#111315]">
              Please type a new password.
            </p>
            <form style={{ maxWidth: 600 }} onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-[20px]">
                <label className="text-[16px] leading-[24px] font-[600] font-poppins">
                  Password
                </label>
                <InputFieldPassword
                  name="password"
                  control={control}
                  placeholder="Password"
                  errors={errors}
                />
              </div>

              <div className="mt-[20px]">
                <label className="text-[16px] leading-[24px] font-[600] font-poppins">
                  Confirm Password
                </label>
                <InputFieldPassword
                  name="confirmPassword"
                  control={control}
                  placeholder="Confirm Password"
                  errors={errors}
                />
              </div>

              <Button
                type="primary"
                className="w-full mt-[20px] h-[40px]"
                htmlType="submit"
              >
                Reset password
              </Button>
            </form>
            <div className="flex justify-end items-center mt-[20px]">
              <p className="text-[18px] leading-[24px] font-[400] font-poppins">
                Take me back to
                <Link
                  href="/login"
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
