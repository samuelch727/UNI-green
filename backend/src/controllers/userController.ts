import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import internal from "stream";
import { error } from "console";
dotenv.config({ path: __dirname + "/.env" });
var User = mongoose.model("User");

export function addUser(req: any, res: any, next: any) {
  User.findOne({
    // check for duplication
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user: any) => {
    if (!user) {
      // password hashing
      bcrypt.hash(req.body.password, 10, async (err: any, hash: any) => {
        // handle password hashing error
        if (err) {
          return res.status(500).json({
            message: err,
          });
        } else {
          // create new user
          const newUser = new User({
            username: req?.body?.username,
            password: hash,
            tel: req?.body?.tel,
            email: req?.body?.email,
          });

          try {
            // save new user to database "Users" collection
            const createdUser = await newUser.save();

            // create and save token data for token generation
            const tokenPayload = {
              userID: createdUser._id,
              email: req?.body?.email,
              username: req?.body?.username,
            };
            req.body.tokenPayload = tokenPayload;

            // saving user data for response
            const user = {
              _id: createdUser._id,
            };
            req.body.user = user;

            next();
            return;
          } catch (err: any) {
            //handle error when saving new user data
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
        // search for user matching either email or username
        $or: [{ email: req.body.email }, { username: req.body.username }],
      },
    },
    {
      // retrive only _id, username, email, password from database
      $project: {
        _id: 1,
        username: 1,
        email: 1,
        password: 1,
      },
    },
  ]).then((users: any) => {
    // handle no match found
    if (users.length < 1) {
      return res.status(400).json({
        message: "Incorrect credentials.",
      });
    } else {
      //@ts-ignore
      console.log(users[0].subusers);
      // check password
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        // handle incorrect password
        if (err) {
          return res.status(400).json({
            login: false,
            message: "Incorrect credentials.",
          });
        }

        // handle correct password
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

/**
 * response with user data
 * @param req income request
 * @param res response
 * @returns
 */
export function sendUserData(req: any, res: any) {
  return res.status(200).json({
    user: req.body.user,
  });
}

const SubUser = require("../models/SubUser");

/**
 * Create subUser
 * @param req
 * @param res
 */
export function addSubUser(req: any, res: any) {
  // check for duplicated subuser with same sid and school
  SubUser.findOne({
    sid: req.body.sid,
    schoolid: req.body.schoolid,
  }).then(async (subUser: any) => {
    if (!subUser) {
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
        //res.status(201).json(result);
        // add subuser id to user
        console.log(result._id);
        User.findByIdAndUpdate(
          req.body.userid,
          { $push: { subsuers: result._id } },
          { new: true, upsert: true }
        )
          .then((user) => {
            //@ts-ignore
            console.log(user.subusers);
            return res.status(201).json(user);
          })
          .catch((error) => {
            return res.status(401).json({
              message: error,
            });
          });
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

export function updatePassword(req: any, res: any) {
  bcrypt.hash(req.body.newpassword, 10, (err: any, hash: any) => {
    if (err) {
      console.log("error");
      return res.status(501).json({
        message: err,
      });
    }
    if (hash) {
      User.findByIdAndUpdate(req.body.userid, { password: hash })
        .then((user) => {
          return res.status(201).json({
            message: "password rested",
          });
        })
        .catch((err) => {
          return res.status(501).json({
            message: err,
          });
        });
    }
  });
}
