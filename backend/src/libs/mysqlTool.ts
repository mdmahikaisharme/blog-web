import { Connection } from "mysql";

export function insertInput<T extends {}>(input: T) {
  const keys = Object.keys(input);

  // keys -> "`{key}`, `{key}`"
  const mappedKeys = keys
    .map((key, index) => {
      const sep = index < keys.length - 1 ? ", " : "";
      return "`" + key + "`" + sep;
    })
    .join("");

  // values -> `"{value}", "{value}"`
  const mappedValues = keys
    .map((key, index) => {
      const sep = index < keys.length - 1 ? ", " : "";
      return '"' + input[key as keyof T] + '"' + sep;
    })
    .join("");

  return { keys: mappedKeys, values: mappedValues };
}
/**
 * insertQuery
 * ------------
 * ```insertQuery("INSERT INTO users (?) VALUES (?)", {
        name: "mahiya",
        email: "mahiya@gamil.com",
        password: "mahiya",
        createdAt: "now",
      }),
      connection: db,
    }```
 */
export function insertQuery(sentence: string, input: object = {}) {
  // "INSER INTO users (?) VALUES (?)"
  const mappedSentences = sentence.split("?");
  const { keys, values } = insertInput(input);

  const newSentence =
    mappedSentences[0] +
    keys +
    mappedSentences[1] +
    values +
    mappedSentences[2];

  return newSentence;
}

export function updateInput<T extends {}>(input: T) {
  const keys = Object.keys(input);

  // sentence -> '`{key}` = "{value}", `{key}` = "{value}", `{key}` = "{value}"'
  const mappedSentence = keys
    .map((key, index) => {
      const sep = index < keys.length - 1 ? ", " : "";

      // `{key}`
      const newKey = "`" + key + "`";
      // "{value}"
      const newValue = '"' + input[key as keyof T] + '"';

      // `{key}` = "{value}"
      return newKey + " = " + newValue + sep;
    })
    .join("");

  return mappedSentence;
}
export function updateQuery(sentence: string, input: object = {}) {
  // "UPDATE posts SET (?) WHERE id = postId"
  const mappedSentences = sentence.split("?");
  const updatedSentence = updateInput(input);
  const newSentence = mappedSentences[0] + updatedSentence + mappedSentences[1];
  return newSentence;
}

interface IMySqlSuperQuery {
  query: string;
  args?: string[] | string[][];
}
// mysql Wrapper
export function MySqlWrapper(db: Connection) {
  return function mySQL<T = string>({ query, args = [] }: IMySqlSuperQuery) {
    return new Promise(
      (resolve: (data: T) => void, reject: (error: any) => void) => {
        // query
        db.query(query, args, (error: any, data: T) =>
          error ? reject(error) : resolve(data)
        );
      }
    );
  };
}
