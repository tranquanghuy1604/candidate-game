import updatePasswordApi from "@/api/hr/updatePassword";
import InputFieldPassword from "@/common/Controller/InputFieldPassword";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Modal } from "antd";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  new_password: yup
    .string()
    .min(6, "Mật khẩu phải chứa ít nhất 6 ký tự")
    .required("Mật khẩu không được để trống"),
  new_password_confirmation: yup
    .string()
    .oneOf([yup.ref("new_password")], "Xác nhận mật khẩu không khớp")
    .required("Xác nhận mật khẩu không được để trống"),
});

const ChangePasswordModal = ({ open, onClose }: any) => {
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
      new_password: data?.new_password,
      password: data?.password,
      new_password_confirmation: data?.new_password_confirmation,
      password_confirmation: data?.password,
    };
    try {
      const res = await updatePasswordApi.updatePassword(defaultValue);

      toast.success("Thay đổi thành công mật khẩu");
    } catch (error) {
      toast.error("Thay đổi thất bại mật khấu");
    }

    console.log(data);
  };

  return (
    <>
      <Modal
        footer={false}
        title="Change Password"
        open={open}
        centered
        onCancel={onClose}
      >
        <form style={{ maxWidth: 600 }} onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[20px]">
            <label className="text-[16px] leading-[24px] font-[600] font-poppins">
              Type your current password
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
              Type your new password
            </label>
            <InputFieldPassword
              name="new_password"
              control={control}
              placeholder="Confirm Password"
              errors={errors}
            />
          </div>

          <div className="mt-[20px]">
            <label className="text-[16px] leading-[24px] font-[600] font-poppins">
              Retype your new password
            </label>
            <InputFieldPassword
              name="new_password_confirmation"
              control={control}
              placeholder="Confirm Password"
              errors={errors}
            />
          </div>

          <Button
            type="primary"
            className="w-full mt-[20px] h-[40px]"
            htmlType="submit"
            onClick={onClose}
          >
            Save
          </Button>
        </form>
      </Modal>
    </>
  );
};
export default ChangePasswordModal;
