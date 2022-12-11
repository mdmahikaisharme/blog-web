import { insertQuery, mySQL } from "../../libs/db";
import { TSignupInput } from "./auth.schema";
import { TUser } from "../user/user.schema";
import bcrypt from "bcrypt";

/**
 * getUserByEmail
 */
export async function getUserByEmail(email: string) {
  return await mySQL<TUser[]>({
    query: "SELECT * FROM users WHERE email = ?",
    args: [email],
  });
}

/**
 * createUser
 */
export async function createUser(input: TSignupInput) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(input.password, salt);

  await mySQL({
    query: insertQuery(`INSERT INTO users (?) VALUES (?)`, {
      ...input,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    }),
  });
}
