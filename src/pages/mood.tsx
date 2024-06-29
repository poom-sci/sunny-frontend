import React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import RandomBackgroundImages from "@/components/RandomBackground";
import axios from "axios";
import { toast } from "react-toastify";
import { createMood } from "@/api/auth";

import useUserStore from "@/stores/user";
const OverviewPage = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const categories = [
    { name: "work", thName: "งาน", color: "bg-blue-700" },
    { name: "play", thName: "เล่น", color: "bg-green-500" },
    { name: "study", thName: "เรียน", color: "bg-purple-400" },
    { name: "relationship", thName: "ความสัมพันธ์", color: "bg-orange-500" },
    { name: "health", thName: "สุขภาพ", color: "bg-yellow-400" }
  ];

  const validationSchema = Yup.object().shape({
    work: Yup.number()
      .min(1, "กรุณาเลือกค่าความสำเร็จ")
      .required("จำเป็นต้องเลือก"),
    play: Yup.number()
      .min(1, "กรุณาเลือกค่าความสำเร็จ")
      .required("จำเป็นต้องเลือก"),
    study: Yup.number()
      .min(1, "กรุณาเลือกค่าความสำเร็จ")
      .required("จำเป็นต้องเลือก"),
    relationship: Yup.number()
      .min(1, "กรุณาเลือกค่าความสำเร็จ")
      .required("จำเป็นต้องเลือก"),
    health: Yup.number()
      .min(1, "กรุณาเลือกค่าความสำเร็จ")
      .required("จำเป็นต้องเลือก")
  });

  const handleSubmit = async (values) => {
    try {
      const response = await createMood({ ...values, uid: user.uid });
      console.log(response.data);

      //   if (response.status === 200) {
      toast.success("บันทึกข้อมูลสำเร็จ");
      router.push("/home");
      //   }

      console.log("API response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-IBMPlexSanThai my-4">
      <div className="absolute inset-0 z-0">
        <RandomBackgroundImages />
      </div>
      <div className="flex flex-col w-[80vw] p-8 bg-white shadow-md rounded-lg z-10 opacity-95">
        <div className="flex items-center justify-center mb-4">
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
          <h1 className="text-xl font-semibold text-gray-500 ml-2">ภาพรวม</h1>
        </div>
        <Formik
          initialValues={{
            work: 0,
            play: 0,
            study: 0,
            relationship: 0,
            health: 0
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            handleSubmit(values);
          }}
        >
          {({ setFieldValue, values, errors, touched, isValid }) => (
            <Form>
              {categories.map((category, index) => (
                <div key={index} className="mb-4">
                  <h2 className="text-lg font-bold text-gray-500">
                    {category.thName}
                  </h2>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1/6 h-6 rounded-full mx-1 cursor-pointer ${
                          i < values[category.name.toLowerCase()]
                            ? category.color
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          setFieldValue(category.name.toLowerCase(), i + 1)
                        }
                      ></div>
                    ))}
                  </div>
                  {/* {errors[category.name.toLowerCase()] &&
                    touched[category.name.toLowerCase()] && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors[category.name.toLowerCase()]}
                      </div>
                    )} */}
                </div>
              ))}
              <button
                type="submit"
                className="mt-4 w-full btn btn-primary py-2 text-white rounded-full shadow-md transition duration-300 ease-in-out"
                disabled={!isValid}
                onClick={() => {
                  if (isValid) {
                    handleSubmit(values);
                  } else {
                    toast.error("กรุณาเลือกค่าความสำเร็จให้ครบทุกหมวด");
                  }
                }}
              >
                ยืนยัน
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OverviewPage;
