import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import internal from "stream";
dotenv.config({ path: __dirname + "/.env" });
const User = require("../models/User");

export function addUser(req: any, res: any, next: any) {
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
            const createdUser = await newUser.save();
            const tokenPayload = {
              userID: createdUser._id,
              email: createdUser.email,
              username: createdUser.username,
            };
            req.body.tokenPayload = tokenPayload;
            const user = {
              _id: createdUser._id,
            };
            req.body.user = user;
            next();
            return;
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
          const tokenPayload = {
            email: users[0].email,
            userID: users[0]._id,
            username: users[0].username,
          };
          req.body.tokenPayload = tokenPayload;
          const user = {
            _id: users[0]._id,
          };
          req.body.user = user;
          next();
          return;
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

const SubUser = require("../models/SubUser");

export function addSubUser(req: any, res: any) {
  SubUser.findOne({
    sid: req.body.sid,
    schoolid: req.body.schoolid,
  }).then(async (user: any) => {
    if (!user) {
      const newSubUser = SubUser({
        userid: req.body.userid,
        schoolid: req.body.schoolid,
        permissionLevel: 0,
        verify: false,
        name: req.body.name,
        sid: req.body.sid,
      });
      try {
        const result = await newSubUser.save();
        return res.status(201).json(result);
      } catch (err: any) {
        return res.status(401).json({
          message: err,
        });
      }
    } else {
      return res.status(401).json({
        message: "User Already Created",
      });
    }
  });
}
