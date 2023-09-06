export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    password: string;
  }
}
