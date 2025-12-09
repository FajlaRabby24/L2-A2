import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { sendResponse } from "../utils/sendResponse";

export const auth = (...roles: ("admin" | "customer")[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return sendResponse(res, 402, false, "You are not allowed!");
      }

      if (!authHeader.startsWith("Bearer ")) {
        return sendResponse(
          res,
          400,
          false,
          "Invalid token format! Use 'Bearer <token>'"
        );
      }

      const token = authHeader.split(" ")[1]!;
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
