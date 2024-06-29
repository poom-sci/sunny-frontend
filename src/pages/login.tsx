import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import useUserStore from "@/stores/user";
import { useEffect } from "react";
import { toast } from "react-toastify";

import { login, signUp } from "@/api/auth";
import * as firebase from "@/lib/firebase";

import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import loadingLottie from "public/icons/lottie_loading.json";

import RandomBackgroundImages from "@/components/RandomBackground";

export default function Login() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = React.useState(false);

  const logInHandler = async (email: string, password: string) => {
    const toastId = toast.loading("กำลังเข้าสู่ระบบ...");
    try {
      const user = await firebase.login(email, password);
      const token = await user.getIdToken();
      const res = await login({
        token: token,
        email: user.email!,
        firebaseUid: user.uid!,
        registerType: "email"
        // userName: user.displayName!
      });

      await setUser({
        id: res.data.userId,
        email: res.data.email,
        displayImage: res.data.displayImage,
        userName: res.data.userName,
        uid: res.data.firebaseUid,
        token: token,
        isEmailVerified: res.data.isEmailVerified
      });

      toast.update(toastId, {
        render: "เข้าสู่ระบบสำเร็จ",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });

      await router.push(
        router.query.redirectTo ? (router.query.redirectTo as string) : "/"
      );
    } catch (error: any) {
      const message = firebase.mapAuthCodeToMessage(error.code);
      toast.error("เข้าสู่ระบบไม่สำเร็จ: " + message);
    }
    toast.dismiss(toastId);
  };

  const signUpWithGoogle = async () => {
    try {
      const user = await firebase.signUpWithGoogle();
      const token = await user.getIdToken();
      const res = await signUp({
        email: user.email!,
        firebaseUid: user.uid!,
        registerType: "google",
        userName: user.displayName!,
        displayImage: user.photoURL,
        isEmailVerified: user.emailVerified,
        token: token
      });

      console.log("ererer", res);

      const q = await setUser({
        id: res.user.userId,
        email: user.email!,
        userName: user.displayName!,
        uid: user.uid!,
        token: token,
        displayImage: user.photoURL,
        isEmailVerified: user.emailVerified
      });
      console.log("asdfasdfas", q);
      await toast.success("เข้าสู่ระบบด้วย Google สำเร็จ");
      await router.push(
        router.query.redirectTo ? (router.query.redirectTo as string) : "/home"
      );
    } catch (error: any) {
      console.error(error);
      const message = firebase.mapAuthCodeToMessage(error.code);
      toast.error("เข้าสู่ระบบด้วย Google ไม่สำเร็จ: " + message);
    }
  };

  // const signUpWithGithub = async () => {
  //   try {
  //     const user = await firebase.signUpWithGithub();
  //     const token = await user.getIdToken();
  //     const res = await signUp({
  //       email: user.email!,
  //       firebaseUid: user.uid!,
  //       registerType: "github",
  //       userName: user.displayName!,
  //       displayImage: user.photoURL,
  //       isEmailVerified: user.emailVerified,
  //       token: token
  //     });

  //     setUser({
  //       id: res.data.userId,
  //       email: user.email!,
  //       userName: user.displayName!,
  //       uid: user.uid!,
  //       token: token,
  //       displayImage: user.photoURL,
  //       isEmailVerified: user.emailVerified
  //     });
  //     toast.success("สมัครสมาชิกสำเร็จ");
  //     await router.push(
  //       router.query.redirectTo ? (router.query.redirectTo as string) : "/"
  //     );
  //   } catch (error: any) {
  //     console.error(error);
  //     const message = firebase.mapAuthCodeToMessage(error.code);
  //     toast.error("สมัครสมาชิกไม่สำเร็จ: " + message);
  //   }
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        logInHandler(values.email, values.password);
        await router.push("/home");
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  });

  // useEffect(() => {
  //   if (router.query.action === "signup") {
  //     setIsLogin(false);
  //   }
  // }, [router.query.action]);

  if (loading) {
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
    <div className="flex items-center justify-center min-h-screen  font-IBMPlexSanThai my-4">
      <div className="">
        <RandomBackgroundImages />
      </div>
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg z-10">
        <h2 className="mb-8 text-3xl font-bold text-center text-orange-500">
          เข้าสู่ระบบ
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="email"
              placeholder="ชื่อผู้ใช้งาน"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400 focus:ring-red-200"
                  : "border-green-400 focus:ring-green-200"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="รหัสผ่าน"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400 focus:ring-red-200"
                  : "border-blue-400 focus:ring-blue-200"
              }`}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-core-lightBlue rounded-full hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-200"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <div className="text-sm">
            คุณยังไม่มีบัญชีผู้ใช้งาน?{" "}
            <Link href="/sign-up">
              <div className="text-blue-500">ลงทะเบียน</div>
            </Link>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              className="flex items-center px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-gray-200"
              onClick={signUpWithGoogle}
            >
              <i className="fab fa-google"></i>
              {/* Sign in with Google */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
