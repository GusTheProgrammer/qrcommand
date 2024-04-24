import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAxios = (baseURL: string) => {
  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async ({
    url,
    method,
    data = {},
    headers = {},
    params = {},
  }) => {
    setLoading(true);
    console.log(
      `Sending ${method} request to ${baseURL}${url} with data:`,
      data,
      `and params:`,
      params
    );
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }

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
      console.log(`Request to ${url} completed.`);
    }
  };

  return { response, error, loading, fetchData };
};

export default useAxios;
