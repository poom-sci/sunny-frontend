import React from "react";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import RandomBackgroundImages from "@/components/RandomBackground";
import axios from "axios";
import IconBack from "@/components/icons/back";
import userStore from "@/stores/user";
import { createGoal } from "@/api/auth";

// Validation schema
const GoalSchema = Yup.object().shape({
  goalName: Yup.string().required("กรอกชื่อเป้าหมาย"),
  duration: Yup.number()
    .required("กรอกจำนวนวัน")
    .positive("ระยะเวลาต้องเป็นจำนวนบวก")
    .integer("ระยะเวลาต้องเป็นจำนวนเต็ม"),
  notes: Yup.string()
});

const AddGoalPage = () => {
  const router = useRouter();

  const user = userStore((state) => state.user);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await createGoal({
        uid: user.uid,
        title: values.goalName,
        duration: values.duration,
        description: values.notes
      });
      //   const response = await axios.post("/api/goals", values);
      console.log("API response:", response.data);
      setSubmitting(false);
      // Redirect to goals page or show success message
      router.push("/goal");
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-IBMPlexSanThai my-4">
      <div className="absolute inset-0 z-0">
        <RandomBackgroundImages />
      </div>
      <div className="w-full p-4 bg-white shadow-md rounded-lg z-10 relative">
        <button
          onClick={() => router.back()}
          className="self-start  rounded-lg hover:opacity-60"
        >
          <IconBack className="" width={24} height={24} color="#979797" />
        </button>
        <h1 className="text-2xl font-bold mb-4 text-center text-core-green-400">
          เพิ่มเป้าหมายของฉัน
        </h1>
        <Formik
          initialValues={{
            goalName: "",
            duration: "",
            notes: ""
          }}
          validationSchema={GoalSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="goalName" className="block text-gray-700">
                  {`เป้าหมายของ ${user.userName} คือ`}
                </label>
                <Field
                  name="goalName"
                  type="text"
                  placeholder="กรอกชื่อเป้าหมาย"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
                <ErrorMessage
                  name="goalName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="duration" className="block text-gray-700">
                  ระยะเวลา
                </label>
                <Field
                  name="duration"
                  type="number"
                  placeholder="กรอกจำนวนวัน"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
                <ErrorMessage
                  name="duration"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="notes" className="block text-gray-700">
                  รายละเอียดเพิ่มเติม
                </label>
                <Field
                  name="notes"
                  as="textarea"
                  placeholder="บรรยายเกี่ยวกับเป้าหมายของคุณ"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out"
                disabled={isSubmitting}
              >
                สร้างเป้าหมาย
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddGoalPage;
