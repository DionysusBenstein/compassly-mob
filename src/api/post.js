import instance from "../constants/instance";
import { getToken } from "./asyncStorage/token";

export const post = async (query, body) => {
  let result = null;
  let error = null;

  const token = await getToken();

  await instance
    .post(
      `${query}`,
      body,
      token && {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      result = res.data;
    })
    .catch((e) => {
      console.log("post error", e.response);
      error = e.response;
      // console.log(e.response);
    });

  return { result, error };
};
