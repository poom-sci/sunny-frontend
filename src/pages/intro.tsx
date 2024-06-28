// import Intro from "@/components/intro";

import dynamic from "next/dynamic";

const Intro = dynamic(() => import("@/components/intro"));

export default function Home() {
  return <Intro />;
}
