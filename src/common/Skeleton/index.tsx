import React from "react";
import styles from "./Skeleton.module.css"; // Tạo lớp CSS với các hiệu ứng animation

const Skeleton: React.FC<{ width: string; height: string }> = ({
  width,
  height,
}) => (
  <div
    className="bg-[#e0e0e0] animate-pulse rounded-[16px]"
    style={{ width, height }}
  />
);

export default Skeleton;
