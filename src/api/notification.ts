import { headers } from "next/headers";
import { request } from "./index";

export const upsertNotificationToken = async ({
  firebaseUid,
  notificationToken,
  token
}: {
  firebaseUid: string;
  notificationToken: string;
  token: string;
}) => {
  try {
    const response = await request({
      url: "/notification/token",
      method: "POST",
      data: {
        firebaseUid,
        token: notificationToken
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
