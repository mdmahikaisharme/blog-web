import { insertQuery, mySQL, updateQuery } from "../../libs/db";
import { TPost, TPostCreateInput, TPostUpdateInput } from "./post.schema";

const postProperty =
  "post.id as id, post.title as title, post.describtion as describtion, post.img as img, post.category as category, post.userId as userId, post.createdAt as createdAt";
const userProperty = "user.name as userName, user.img as userImg";
const postJoinWithUser =
  "FROM users as user CROSS JOIN posts as post ON post.userId=user.id";

/**
 * createPost
 */
export async function createPost(
  input: TPostCreateInput & { userId: any | string }
) {
  await mySQL({
    query: insertQuery(`INSERT INTO posts (?) VALUES (?)`, {
      ...input,
      createdAt: new Date().toISOString(),
    }),
  });
}

/**
 * updatePostById
 */
export async function updatePostById(input: TPostUpdateInput, postId: string) {
  await mySQL({
    query: updateQuery(
      //
      `UPDATE posts SET ? WHERE id = "${postId}"`,
      {
        ...input,
        createdAt: new Date().toISOString(),
      }
    ),
  });
}

/**
 * deletePostById
 */
export async function deletePostById(postId: string | number) {
  await mySQL({
    query: `DELETE FROM posts WHERE id = ${postId}`,
  });
}

/**
 * getPostById
 */
export async function getPostById(postId: string | number) {
  return await mySQL<TPost[]>({
    query: `SELECT ${postProperty}, ${userProperty} ${postJoinWithUser} WHERE post.id = "${postId}"`,
  });
}

/**
 * getAllPosts
 */
export async function getAllPosts() {
  return await mySQL<TPost[]>({
    query: `SELECT ${postProperty}, ${userProperty} ${postJoinWithUser}`,
  });
}

/**
 * getAllPosts
 */
export async function getCategoryPosts(category?: string) {
  return await mySQL<TPost[]>({
    query: `SELECT ${postProperty}, ${userProperty} ${postJoinWithUser} WHERE post.category = "${category}"`,
  });
}
