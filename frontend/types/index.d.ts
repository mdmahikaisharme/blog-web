export interface IUser {
  id: string;
  name: string;
  email: string;
  img: string;
}

export interface IPost {
  id: string;
  img: string;
  title: string;
  describtion: string;
  category: string;
  userId: string;
  createdAt: string;
  userName: string;
  userImg: string;
}

export interface IAuthLogin {
  email: string;
  password: string;
}
export interface IAuthSignup {
  name: string;
  email: string;
  password: string;
  img: string;
}

// REQEUST
export interface ICreatePost {
  img: string;
  title: string;
  describtion: string;
  category: string;
}
export interface IUpdatePost {
  img: string;
  title: string;
  describtion: string;
  category: string;
  userId: string;
  createdAt: string;
}

// RESPONSE
export interface IAuthResponse {
  accessToken: string;
}
export interface IGetAllPostsResponse {
  posts: IPost[];
}
export interface IGetPostResponse {
  post: IPost;
}
export interface IGetUserResponse {
  user: IUser;
}
