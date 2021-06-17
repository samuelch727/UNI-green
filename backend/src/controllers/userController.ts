import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
            const savedUser = await newUser.save();
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

export function login(req: any, res: any) {}
