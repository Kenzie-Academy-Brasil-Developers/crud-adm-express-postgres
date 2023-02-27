import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user: {
        admin: string;
        isActive: boolean;
        mail: string;
        sub: number;
      };
    }
  }
}
