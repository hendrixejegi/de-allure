import axios, { AxiosError, type AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  timeout: 10 * 1000, // 10 seconds
});

export { axiosInstance };
