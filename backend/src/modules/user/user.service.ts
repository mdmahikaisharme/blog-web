import { mySQL } from "../../libs/db";
import { TUser } from "./user.schema";

/**
 * getUserById
 */
export async function getUserById(userId: string | number) {
  return await mySQL<TUser[]>({
    query: `SELECT * FROM users WHERE id = "${userId}"`,
  });
}
