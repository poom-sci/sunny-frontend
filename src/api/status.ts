import { request } from "./index";

export const healthCheck = async () => {
  try {
    const response = await request({
      url: "/status",
      method: "GET"
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
