import Image from "next/image";
import Link from "next/link";
import SunnyIcon from "public/icons/Sunny_icon.png";
import RandomBackgroundImages from "@/components/RandomBackground";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="absolute inset-0 opacity-80">
        <RandomBackgroundImages />
      </div>
      <div className="text-center z-10">
        <Link href="/home">
          <div className="flex flex-col justify-center items-center hover:cursor-pointer z-10 p-10 font-IBMPlexSanThai">
            <Image src={SunnyIcon} alt="Sunny Icon" width={200} height={200} />
            <p className="btn btn-primary mt-4 text-2xl font-bold text-white animate-pulse">
              Click to Start
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
