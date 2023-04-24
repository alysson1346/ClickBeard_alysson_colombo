export interface IUserCreate {
  name: string;
  email: string;
  is_admin: boolean;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
