import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAxios = (baseURL: string) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const refreshToken = async () => {
    // Implement refresh logic here
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) return null;
    try {
      const response = await axios.post(`${baseURL}/refresh`, {
        token: refreshToken,
      });
      const { accessToken, expiresIn } = response.data;
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("expiresIn", expiresIn.toString());
      return accessToken;
    } catch (error) {
      return null;
    }
  };

  // Interceptor to insert token
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor to handle 401 Unauthorized
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const accessToken = await refreshToken();
        if (accessToken) {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + accessToken;
          return axiosInstance(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  const fetchData = async ({
    url,
    method,
    data = {},
    headers = {},
    params = {},
  }) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        headers,
        data,
        params,
      });
      setResponse(result.data);
      return result.data;
    } catch (err) {
      setError(err);
      return { error: err };
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
