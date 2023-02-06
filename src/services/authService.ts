import axiosCustom from "./axiosConf";
import axios from "axios";

export async function signIn(username: string, password: string): Promise<any> {
  return axiosCustom().get("auth/login", {
    params: {
      username,
      password,
    },
  });
}

export async function getUser(): Promise<any> {
  return axiosCustom().get("auth/info");
}

export async function signOut(tokenID: string): Promise<any> {
  return axiosCustom().get("auth/logout", {
    params: {
      tokenID,
    },
  });
}

const headers: any = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
};

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/api/v1/",
  headers: headers,
});

export async function getToken(refreshToken: string): Promise<any> {
  return axiosInstance.get("auth/token", {
    params: {
      refreshToken,
    },
  });
}
