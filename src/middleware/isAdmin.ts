import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { sendResponse } from "../utils/sendResponse";

export const isAdmin = (...roles: ("admin" | "customer")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return sendResponse(res, 402, false, "You are not allowed!");
      }

      const decoded = jwt.verify(token, config.jwt_secret!) as JwtPayload;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return sendResponse(res, 401, false, "Unauthorized access!");
      }

      next();
    } catch (error: any) {
      console.log(error);
      sendResponse(res, 500, false, error.message);
    }
  };
};
