import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

/**
 * Authenticate if the token is valid or not
 * @param token token
 * @param userid user id
 * @returns is token valid
 */
export function authenticateToken(req: any, res: any, next: any) {
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
            next();
            return;
          }
        }
        return res.status(401).json({
          message: "invalid token",
        });
      }
    );
  }
}
