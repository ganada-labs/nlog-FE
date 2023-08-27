import axios, { HttpStatusCode } from "axios";

let accessToken = ''

export const nlogAPI = axios.create({
  baseURL: "https://api.new-blog.store",
});

nlogAPI.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

nlogAPI.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    if (status === HttpStatusCode.Unauthorized) {
      const { data } = await nlogAPI.get('/auth/refresh', { withCredentials: true })

      accessToken = data.accessToken;
      config.headers.Authorization = `Bearer ${accessToken}`;
      return axios.request(config);
    }
    if (status === HttpStatusCode.Forbidden) {
      return Promise.reject('다시 로그인 하세요');
    }

    return Promise.reject(error);
  }
);
