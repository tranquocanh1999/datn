/**
 * Copyright HMS. 2022. All Rights Reserved.
 */
import axios from "axios";
import { store } from "../app/store";
import { logout, setLoading, setToast, setToken } from "../features/userSlice";
import { typeToast } from "../shared/contants/toast";
import { getToken } from "./authService";

/** Timeout of session from env */
const SESSION_TIMEOUT = 5 * 60 * 60 * 1000;

/**
 * Config instance of axios
 */
const instance = () => {
  let totalRequest = 0;
  const appState = store.getState();
  const headers: any = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  headers.Authorization = `Bearer ${appState?.user?.accessToken}`;
  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8080/api/v1/",
    headers: headers,
  });

  // Request interceptors
  axiosInstance.interceptors.request.use(
    (config) => {
      store.dispatch(setLoading(true));
      totalRequest++;
      if (
        ["auth/logout", "auth/login", "auth/token"].includes(config.url || "")
      ) {
        config.headers["Authorization"] = ``;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // Reponse interceptors
  axiosInstance.interceptors.response.use(
    (response) => {
      totalRequest--;
      if (!totalRequest) {
        store.dispatch(setLoading(false));
      }
      return response;
    },
    async (error) => {
      totalRequest--;
      if (!totalRequest) {
        store.dispatch(setLoading(false));
      }
      const timeActivity = new Date().getTime();
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      } else if (error?.response?.status === 500) {
        store.dispatch(
          setToast({
            message: error?.response?.data.message,
            type: typeToast.ERROR,
          })
        );
        return Promise.reject({ ...error });
      } else if (error?.response?.status === 401) {
        localStorage.setItem("lastActivity", timeActivity.toString());
        const originalRequest = error.config;
        try {
          const token: any = await getToken(appState?.user?.refreshToken);
          const newToken = token.data;
          if (newToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newToken.accessToken}`;
            store.dispatch(setToken(newToken));
            return axiosInstance(originalRequest);
          } else {
            return Promise.reject({ ...error });
          }
        } catch (e) {
          store.dispatch(logout(appState?.user?.idToken));
          return Promise.reject({ ...error });
        }
      } else {
        if (error?.response && error?.response?.data) {
          return Promise.reject({ ...error.response.data });
        } else {
          return Promise.reject({ ...error });
        }
      }
    }
  );

  return axiosInstance;
};

export default instance;
