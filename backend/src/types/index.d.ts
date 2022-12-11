export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  img: string;
  createdAt: string;
}

export interface IUserInput {
  name: string;
  email: string;
  password: string;
  img: string;
  createdAt: string;
}
