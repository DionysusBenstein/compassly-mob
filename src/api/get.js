import instance from '../constants/instance';
import { getToken } from './asyncStorage/token';

export const get = async (query, body) => {
  let result = null;
  let error = null;
  const token = await getToken();

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await instance
    .get(`${query}`, config, body)
    .then((res) => {
      result = res.data;
    })
    .catch((e) => {
      error = e.response ? e.response.data : e;
      console.log('apiresponse', error);
    });

  return { result, error };
};
