import { request } from "./index";

export const createPost = async ({
  age,
  breed,
  contactPhone,
  description,
  gender,
  image,
  lat,
  long,
  lostDateTime,
  name,
  reward,
  ownerName,
  displayName,
  province,
  postcode,
  country
}: {
  age: number;
  breed: string;
  contactPhone: string;
  description: string;
  gender: string;
  image: string[];
  lat: number;
  long: number;
  lostDateTime: string;
  name: string;
  reward: string;
  ownerName: string;
  displayName: string;
  province: string;
  postcode: string;
  country: string;
}) => {
  try {
    const response = await request({
      url: "/v1/external/post",
      method: "POST",
      data: {
        age,
        breed,
        contactPhone,
        description,
        gender,
        image,
        lat,
        long,
        lostDateTime,
        name,
        reward,
        ownerName,
        locationDisplayName: displayName,
        province,
        postcode,
        country
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getPost = async ({ id }: { id: string }) => {
  try {
    const response = await request({
      url: "/v1/external/post/" + id,
      method: "GET"
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getPostsNear = async ({
  lat,
  long
}: {
  lat: number;
  long: number;
}) => {
  try {
    const response = await request({
      url: "/v1/external/post/near",
      method: "POST",
      data: {
        long,
        lat
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const getPostsWithPagination = async ({
  page,
  limit,
  breed
}: {
  page: number;
  limit: number;
  breed: string | null;
}) => {
  try {
    const response = await request({
      url: "/v1/external/posts",
      method: "POST",
      data: {
        pagination: {
          page: page,
          limit: limit
        },
        data: {
          breed: breed ?? null
        }
      }
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};
