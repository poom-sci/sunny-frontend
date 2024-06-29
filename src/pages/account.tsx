import React from "react";
import { useRouter } from "next/router";
import RandomBackgroundImages from "@/components/RandomBackground";
import { logout } from "@/lib/firebase";
import useUserStore from "@/stores/user";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingLottie from "public/icons/lottie_loading.json";

import IconBack from "@/components/icons/back";

const AccountPage: React.FC = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const handleLogout = async () => {
    await logout();
    await router.push("/login");
  };

  if (!user) {
    return (
      <div className="w-screen h-screen">
        <div className="w-full h-full flex justify-center items-center">
          <Lottie
            animationData={loadingLottie}
            className="flex flex-1 justify-center items-center w-48 h-48"
            loop={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-IBMPlexSanThai my-4">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="w-[80vw] p-4 bg-white shadow-md rounded-lg z-10 flex flex-col">
        <button
          onClick={() => router.back()}
          className="self-start m-2  rounded-lg hover:opacity-60"
        >
          <IconBack className="" width={24} height={24} color="#979797" />
        </button>
        <h1 className="text-2xl font-bold mb-4">บัญชีของฉัน</h1>
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-core-lightGreen">
              ชื่อผู้ใช้
            </h2>
            <p className="text-gray-700">{user.userName}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-core-lightBlue">อีเมล</h2>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-core-coral">เพศ</h2>
            <p className="text-gray-700">{user.gender}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-core-orange">อายุ</h2>
            <p className="text-gray-700">{user.age} ปี</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-core-yellow">สีที่ชอบ</h2>
            <p className="text-gray-700">{user.color}</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-core-purple">
              หมวดซันนี่
            </h2>
            <p className="text-gray-700">{user.sunnyCategory}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-2 bg-red-100 text-white rounded-lg hover:bg-red-200"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
