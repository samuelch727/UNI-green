import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import User from "../models/User";

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
            username: users[0].username,
          };
          req.body.user = user;
          req.body.userid = users[0]._id;
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
  console.log(req.body.user);
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
export function addSubUser(req: any, res: any, next: any) {
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
        req.body.subuser = result;
        next();
        return;
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

export function updateSubuserList(req: any, res: any) {
  User.findByIdAndUpdate(
    req.body.userid,
    {
      $push: { subusers: req.body.subuser._id },
    },
    { new: true, upsert: true }
  )
    .then((user) => {
      return res.status(201).json({
        userid: req.body.userid,
        subuser: req.body.subuser,
      });
    })
    .catch((err) => {
      return res.status(501).json({
        message: err,
      });
    });
}

export function updatePassword(req: any, res: any) {
  bcrypt.hash(req.body.newpassword, 10, (err: any, hash: any) => {
    if (err) {
      return res.status(501).json({
        message: err,
      });
    }
    if (hash) {
      User.findByIdAndUpdate(req.body.userid, { password: hash })
        .then(() => {
          return res.status(201).json({
            message: "password reseted",
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

export function getSubuserData(req: any, res: any, next: any) {
  req.body.user = {
    ...req.body.user,
    subusers: [],
  };
  User.findById(req.body.userid)
    .then((user) => {
      user?.subusers.map((subuserID) => {
        SubUser.findById(subuserID)
          .then((subuser: any) => {
            req.body.user.subusers.push(subuser);
            next();
          })
          .catch((err: any) => {
            res.status(500).json({
              message: err,
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err,
      });
    });

  return;
}
