import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_API_URL } from '../constants/domain.constant';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

const settings = {
  baseURL: BASE_API_URL,
};

const instance = axios.create(settings);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

export const ajaxService = async <T, R = unknown>(
  method: HttpMethod,
  apiUrl: string,
  data?: T,
  config?: AxiosRequestConfig<T>
): Promise<R> => {
  let response: AxiosResponse<R>;

  switch (method) {
    case 'get':
      response = await instance.get<R>(apiUrl, config);
      break;
    case 'post':
      response = await instance.post<R>(apiUrl, data, config);
      break;
    case 'put':
      response = await instance.put<R>(apiUrl, data, config);
      break;
    case 'patch':
      response = await instance.patch<R>(apiUrl, data, config);
      break;
    case 'delete':
      response = await instance.delete<R>(apiUrl, config);
      break;
    default:
      throw new Error('Unsupported method');
  }

  return response.data;
};
