import { IGetUserResponse } from "@Types/";
import { AxiosResponse } from "axios";
import request from "./request";

export async function getUser(userId?: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetUserResponse>>(
    `/users/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getCurrentUser(token?: string) {
  return await request.get<any, AxiosResponse<IGetUserResponse>>(
    `/users/current`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
