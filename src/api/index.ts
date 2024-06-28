import axios from "axios";
import config from "@/lib/config";
export async function request(options: any) {
  return axios
    .request({
      baseURL: config.apiEndpoint,
      ...options
    })
    .catch((error) => {
      throw error.response.data;
    });
}
