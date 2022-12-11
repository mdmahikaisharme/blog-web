import { IAuthLogin, IAuthResponse, IAuthSignup } from "@Types/";
import { AxiosResponse } from "axios";
import request from "./request";

export async function signup(body: IAuthSignup) {
  return await request.post<IAuthSignup, AxiosResponse<IAuthResponse>>(
    `/auth/signup`,
    body
  );
}
export async function login(body: IAuthLogin) {
  return await request.post<IAuthLogin, AxiosResponse<IAuthResponse>>(
    `/auth/login`,
    body
  );
}
export async function logout() {
  return await request.post(`/auth/logout`);
}
