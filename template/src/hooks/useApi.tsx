import React from "react";
import axios from "axios";
import { useConfig, useAuth } from '.';

const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Allow-Credentials": true,
  Accept: "application/json",
};

interface Response<T = any> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export default function useApi() {

  const { offchainUrl: url } = useConfig();
  const { authToken } = useAuth();

  const get = React.useCallback(async <T = any,>(endpoint: string): Promise<Response<T> | T> => {

    if (endpoint[0] !== "/") throw new Error("Endpoint must start with a slash");

    const response = await axios.get(url + endpoint, {
      headers: authToken
        ? { ...HEADERS, Authorization: `Bearer ${authToken}` }
        : HEADERS,
    });

    return response.data;
  }, [url]);

  const post = React.useCallback(
    async <T = any, R = any>(endpoint: string, data: T): Promise<Response<R> | R> => {

      if (endpoint[0] !== "/") throw new Error("Endpoint must start with a slash");

      const response = await axios.post(url + endpoint, data, {
        headers: authToken
          ? { ...HEADERS, Authorization: `Bearer ${authToken}` }
          : HEADERS,
      });

      return response.data;
    },
    [url]
  );

  const put = React.useCallback(
    async <T = any, R = any>(endpoint: string, data: T): Promise<Response<R> | R> => {

      if (endpoint[0] !== "/") throw new Error("Endpoint must start with a slash");

      const response = await axios.put(url + endpoint, data, {
        headers: authToken
          ? { ...HEADERS, Authorization: `Bearer ${authToken}` }
          : HEADERS,
      });

      return response.data;
    },
    [url]
  );

  const del = React.useCallback(async <T = any,>(endpoint: string): Promise<Response<T> | T> => {

    if (endpoint[0] !== "/") throw new Error("Endpoint must start with a slash");

    const response = await axios.delete(url + endpoint, {
      headers: authToken
        ? { ...HEADERS, Authorization: `Bearer ${authToken}` }
        : HEADERS,
    });

    return response.data;
  }, [url]);

  return { get, post, put, del };
}