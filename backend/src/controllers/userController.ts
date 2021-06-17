import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: __dirname + "/.env" });
const User = require("../models/User");

export function addUser(req: any, res: any) {
  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user: any) => {
    if (!user) {
      bcrypt.hash(req.body.password, 10, async (err: any, hash: any) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        } else {
          const newUser = new User({
            username: req?.body?.username,
            password: hash,
            tel: req?.body?.tel,
            email: req?.body?.email,
          });

          try {
            await newUser.save();
            return res.status(201).json({
              accountCreated: true,
            });
          } catch (err: any) {
            return res.status(500).json({
              accountCreated: false,
              message: err,
            });
          }
        }
      });
    } else {
      if (user.username == req.body.username) {
        return res.status(401).json({
          accountCreated: false,
          message: "Username exist. Fail to create account",
        });
      }
      if (user.email == req.body.email) {
        return res.status(401).json({
          accountCreated: false,
          message: "Email exist. Fail to create account",
        });
      }
    }
  });
}

export function loginUser(req: any, res: any, next: any) {
  User.aggregate([
    {
      $match: {
        $or: [{ email: req.body.email }, { username: req.body.username }],
      },
    },
    {
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        password: 1,
      },
    },
  ]).then((users: any) => {
    if (users.length < 1) {
      return res.status(400).json({
        message: "Incorrect credentials.",
      });
    } else {
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          return res.status(400).json({
            login: false,
            message: "Incorrect credentials.",
          });
        }
        if (result) {
          if (process?.env?.ACCESS_TOKEN_SECRET) {
            const token = jwt.sign(
              {
                email: users[0].email,
                userID: users[0]._id,
                username: users[0].username,
              },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "30m",
              }
            );
            const user = {
              _id: users[0]._id,
              token,
            };
            req.body.user = user;
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
        return res.status(400).json({
          login: false,
          message: "Incorrect credentials.",
        });
      });
    }
  });
}

export function sendUserData(req: any, res: any) {
  return res.status(200).json({
    user: req.body.user,
  });
}
