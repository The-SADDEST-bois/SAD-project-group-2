export interface IUser {
  email: string;
  password: string;
  role: Roles;
  name?: string;
}

export interface ISession {
  sessionName: string;
  date: string;
}
