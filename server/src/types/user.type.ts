import { Document } from "mongodb";

export interface User {
  username: string;
  password: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface UserDocument extends User, Document {}
