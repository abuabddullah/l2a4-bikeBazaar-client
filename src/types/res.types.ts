export interface IApiResType<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface IUserResDataType {
  user: IUser;
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  status?: string;
  avatar?: string | undefined;
  address?: string | undefined;
  phone?: string | undefined;
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGetProfileDataType {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IChangePassResType {
  success: boolean;
  message: string;
}
