import { Request } from "express";

export interface IReqUser extends Request {
  user: {
    role: string;
    roles:string[];
    id: string;
  };
}
