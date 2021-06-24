import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
dotenv.config({ path: __dirname + "/.env" });

/**
 * Authenticate if the token is valid or not
 * @param token token
 * @param userid user id
 * @returns is token valid
 */
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    console.log("no token");
    return res.status(401).json({
      message: "invalid token",
    });
  }
  if (process.env.ACCESS_TOKEN_SECRET) {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: any, user: any) => {
        if (err) {
          console.log("fail to verify");
          return res.status(401).json({
            message: "invalid token",
          });
        }
        if (user) {
          if (user.userID == req.body.userid) {
            req.body.tokenPayload = user;
            console.log("authenticated user");
            next();
            return;
          } else {
            return res.status(401).json({
              message: "invalid token",
            });
          }
        }
        console.log("error when authenticate");
        return res.status(401).json({
          message: "Internal server error",
        });
      }
    );
  }
}

export function generateToken(req: Request, res: Response, next: NextFunction) {
  console.log("generating token");
  if (process?.env?.ACCESS_TOKEN_SECRET) {
    const token = jwt.sign(
      req.body.tokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );
    req.body.user = {
      ...req.body.user,
      token,
    };
    console.log("token gnerated");
    next();
    return;
  } else {
    console.log("Missing access token.");
    return res.status(501).json({
      login: false,
      message: "Internal server error.",
    });
  }
}
