import React from "react";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";

import { signUp } from "@/api/auth";
import useUserStore from "@/stores/user";
import { toast } from "react-toastify";
import * as firebase from "@/lib/firebase";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const setUser = useUserStore((state) => state.setUser);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required")
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await signUpHandler(
          values.email,
          values.password
          // values.confirmPassword
        );
        await router.push("/home");
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }
  });

  const signUpHandler = async (
    email: string,
    password: string
    // userName: string
  ) => {
    const toastId = toast.loading("กำลังสมัครสมาชิก...");
    try {
      const user = await firebase.signUp(email, password, "");
      const token = await user.getIdToken();
      const res = await signUp({
        email: user.email!,
        firebaseUid: user.uid!,
        registerType: "email",
        userName: "",
        token: token
      });

      await setUser({
        id: res.data.userId,
        email: email!,
        displayImage: "",
        userName: "",
        uid: user.uid!,
        token: token,
        isEmailVerified: false
      });
      await router.push(
        router.query.redirectTo ? (router.query.redirectTo as string) : "/"
      );
      await toast.update(toastId, {
        render: "สมัครสมาชิกสำเร็จ",
        type: "success",
        isLoading: false,
        autoClose: 2000
      });
    } catch (error: any) {
      console.error(error);
      const message = firebase.mapAuthCodeToMessage(error.code);
      toast.error("สมัครสมาชิกไม่สำเร็จ: " + message);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  font-IBMPlexSanThai my-4">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
        <div className="flex justify-between">
          <button
            onClick={() => router.back()}
            className="text-gray-500 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <h2 className="mb-8 text-3xl font-bold text-center text-orange-500">
          ลงทะเบียน
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              name="email"
              placeholder="อีเมล"
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="ยืนยันรหัสผ่าน"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`w-full px-3 py-2 border-2 rounded-full focus:outline-none focus:ring ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-400 focus:ring-red-200"
                  : "border-red-400 focus:ring-red-200"
              }`}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-600">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-core-lightBlue rounded-full hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-200"
            >
              ลงทะเบียน
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center mt-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-gray-200">
              <i className="fab fa-google"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
