import {
  ICreatePost,
  IGetAllPostsResponse,
  IGetPostResponse,
  IUpdatePost,
} from "@Types/";
import { AxiosResponse } from "axios";
import request from "./request";

export async function getAllPosts(category?: string, token?: string) {
  const query = category ? `?category=${category}` : "";
  return await request.get<any, AxiosResponse<IGetAllPostsResponse>>(
    `/posts/all${query}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function getPost(postId?: string, token?: string) {
  return await request.get<any, AxiosResponse<IGetPostResponse>>(
    `/posts/${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function createPost(body: ICreatePost, token?: string) {
  return await request.post<ICreatePost>(`/posts/create`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function updatePost(
  postId: string,
  body: IUpdatePost,
  token?: string
) {
  return await request.put<ICreatePost>(`/posts/${postId}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
export async function deletePost(postId: string, token?: string) {
  return await request.delete<ICreatePost>(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
