import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "antd";
import MainLayout from "@/layouts/MainLayout";
import HomeHrView from "@/Components/Hr/HomeHrView";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <HomeHrView />
    </main>
  );
}
