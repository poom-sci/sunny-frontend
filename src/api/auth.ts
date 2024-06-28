import { headers } from "next/headers";
import { request } from "./index";

export const login = async ({
  firebaseUid,
  email,
  registerType,
  token
}: {
  firebaseUid: string;
  email: string;
  registerType: string;
  token: string;
}) => {
  try {
    console.log("firebaseUid", {
      firebaseUid,
      email,
      registerType
    });
    const response = await request({
      url: "/secure/auth/log-in",
      method: "POST",
      data: {
        firebaseUid,
        email,
        registerType
      },
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const signUp = async ({
  firebaseUid,
  email,
  userName,
  firstName,
  lastName,
  phoneNumber,
  registerType,
  displayImage,
  isEmailVerified,
  token
}: {
  firebaseUid: string;
  email: string;
  userName: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  registerType: string;
  displayImage?: string | null;
  isEmailVerified?: boolean;
  token: string;
}) => {
  try {
    const response = await request({
      url: "/secure/auth/sign-up",
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      data: {
        firebaseUid,
        email,
        userName,
        firstName,
        lastName,
        phoneNumber,
        registerType,
        displayImage,
        isEmailVerified
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getUser = async (firebaseUid: string, token: string) => {
  try {
    const response = await request({
      url: `/secure/auth/user/${firebaseUid}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const createEmailVerification = async (firebaseUid: string) => {
  try {
    const response = await request({
      url: `/secure/verify-email/${firebaseUid}`,
      method: "POST"
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const verifyEmail = async (emailVerificationId: string) => {
  try {
    const response = await request({
      url: `/secure/verify-email/success/${emailVerificationId}`,
      method: "POST"
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getIsIntroComplete = async (
  firebaseUid: string,
  token: string
) => {
  try {
    const response = await request({
      url: `/secure/auth/intro/${firebaseUid}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateIntroComplete = async ({
  uid,
  age,
  color,
  gender,
  sunnyCategory,
  futureMe,
  futureMeIdeal,
  token
}: {
  uid: string;
  age: number;
  color: string;
  gender: string;
  sunnyCategory: string;
  futureMe: string;
  futureMeIdeal: string;
  token: string;
}) => {
  try {
    const response = await request({
      url: `/secure/auth/intro/${uid}`,
      method: "POST",
      headers: {
        Authorization: "Bearer " + token
      },
      data: {
        uid,
        age,
        color,
        gender,
        sunnyCategory,
        futureMe,
        futureMeIdeal
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
