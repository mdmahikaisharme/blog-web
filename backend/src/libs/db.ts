import mysql from "mysql";
import { MySqlWrapper } from "./mysqlTool";
export { insertQuery, updateQuery } from "./mysqlTool";

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '2006';
export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "2006",
  database: "blog-web",
});

export const mySQL = MySqlWrapper(db);
