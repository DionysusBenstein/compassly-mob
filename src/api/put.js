import instance from "../constants/instance";
import { getToken } from "./asyncStorage/token";

export const put = async (query, body) => {
  let result = null;
  let error = null;

  const token = await getToken();

  await instance
    .put(
      `${query}`,
      body,
      token && {
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      result = res.data;
    })
    .catch((e) => {
      error = e.response.data;
      console.log(e.response);
    });

  return { result, error };
};
