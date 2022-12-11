// import {} from "./auth";
import {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "./post";
import { login, logout, signup } from "./auth";
import { getCurrentUser, getUser } from "./user";

export default {
  // auth
  login,
  signup,
  logout,
  // user
  getUser,
  getCurrentUser,
  // post
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
