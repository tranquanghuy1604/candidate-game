import logoutApi from "@/api/hr/logout";
import { Dropdown, MenuProps } from "antd";
import cookie from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import ChangePasswordModal from "./ChangePasswordModal";
import useAuth from "@/zustand/useAuth";
export default function Header() {
  const [isTab, setIsTab] = useState(true);
  const router = useRouter();
  const [openModalChange, setOpenModalChange] = useState(false);

  // const email = localStorage?.getItem("email");
  const email = useAuth((state) => state.data);

  const handleLogout = async () => {
    try {
      const res = await logoutApi.handleGetLogoutApi();
      cookie.remove("access_token");
      router.push("/login");
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Đăng xuất thất bại!");
    }
  };

  const items: MenuProps["items"] = [
    {
      label: <button onClick={handleLogout}>Log out</button>,
      key: "0",
    },
    {
      label: (
        <button onClick={() => setOpenModalChange(true)}>
          Change password
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="cursor-pointer">
          <Image
            className="w-full max-w-[200px]"
            src="/hrview/home/logo.png"
            alt=""
            width={200}
            height={60}
          />
        </div>
        <div className="flex items-center gap-[30px]">
          <button
            onClick={() => setIsTab(!isTab)}
            className={`cursor-pointer text-[20px] leading-[28px] font-[500] font-poppins + ${
              isTab
                ? "border-b-[2px] border-[#009DBE] text-[#009DBE] transition-all"
                : ""
            }`}
          >
            My assessments
          </button>
          <button
            onClick={() => setIsTab(!isTab)}
            className={`cursor-pointer text-[20px] leading-[28px] font-[500] font-poppins + ${
              !isTab
                ? "border-b-[2px] border-[#009DBE] text-[#009DBE] transition-all"
                : ""
            }`}
          >
            Test library
          </button>
        </div>
        <div className="flex items-center gap-[10px]">
          <p className="text-[#009DBE] text-[20px] font-[500] leading-[28px]">
            {email}
          </p>

          <Dropdown menu={{ items }} trigger={["click"]}>
            <Image
              className="cursor-pointer"
              src="/hrview/createassessment/avatar.png"
              alt=""
              width={60}
              height={60}
            />
          </Dropdown>
        </div>
      </div>

      <ChangePasswordModal
        open={openModalChange}
        onClose={() => setOpenModalChange(false)}
      />
    </>
  );
}
