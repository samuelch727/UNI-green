import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import User from "../models/User";
import express from "express";
import SubUser from "../models/SubUser";

export function addUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
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
            activeuser: true,
          });
          if (newUser.validateSync()) {
            return res.status(501).json({
              message: "invalid input",
            });
          }
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

//TODO: reactiveate user when login
export function loginUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  User.aggregate([
    {
      $match: {
        // search for user matching either email or username
        $or: [{ email: req.body.email }, { username: req.body.username }],
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
          console.log("correct password");
          if (!users[0].activeuser) {
            req.body.user = {
              ...req.body.user,
              message: "Account has been reactivated.",
            };
            console.log("reactivatiing user");
            console.log(users[0]);
            User.findByIdAndUpdate(users[0]._id, { activeuser: true })
              .then((user) => {
                console.log("activated user, reactivating subusers");
                console.log(users[0]);
                users[0].subusers.map((subuserid: any) => {
                  SubUser.findByIdAndUpdate(subuserid, {
                    activeuser: true,
                  })
                    .then((subuser: any) => {
                      console.log("reactivating subuser: ");
                      console.log(subuser);
                    })
                    .catch((err: any) => {
                      // return res.status(500).json({
                      //   message: err,
                      // });
                      console.log("fail to reactivate user");
                      console.log(err);
                      return;
                    });
                });
                // req.body.user = {
                //   ...req.body.user,
                //   message: "Account has been reactivated.",
                // };
              })
              .catch((err) => {
                return res.status(500).json({
                  message: err,
                });
              });
          }
          const tokenPayload = {
            tel: users[0].tel,
            email: users[0].email,
            userID: users[0]._id,
            username: users[0].username,
            subusers: users[0].subusers,
          };
          req.body.tokenPayload = tokenPayload;
          const user = {
            ...req.body.user,
            _id: users[0]._id,
            username: users[0].username,
          };
          req.body.user = user;
          req.body.userid = users[0]._id;
          console.log("login success");
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
export function sendUserData(req: express.Request, res: express.Response) {
  console.log(req.body.user);
  return res.status(200).json({
    user: req.body.user,
  });
}

/**
 * Create subUser
 * @param req
 * @param res
 */
// check for duplicated subuser with same sid and school
export function addSubUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  SubUser.findOne({
    sid: req.body.sid,
    schoolid: req.body.schoolid,
  }).then(async (subUser: any) => {
    if (!subUser) {
      const newSubUser = new SubUser({
        userid: req.body.userid,
        schoolid: req.body.schoolid,
        permissionLevel: 0,
        verify: false,
        name: req.body.name,
        sid: req.body.sid,
        activeuser: true,
      });
      try {
        const result = await newSubUser.save();
        //res.status(201).json(result);
        // add subuser id to user
        const subuser = {
          _id: result._id,
          schoolid: result.schoolid,
          name: result.name,
          sid: result.sid,
        };
        req.body.subuser = subuser;
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

export function updateSubuserList(req: express.Request, res: express.Response) {
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

export function updatePassword(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  bcrypt.hash(req.body.newpassword, 10, (err: any, hash: any) => {
    if (err) {
      return res.status(501).json({
        message: err,
      });
    }
    if (hash) {
      User.findByIdAndUpdate(req.body.userid, { password: hash })
        .then((user) => {
          next();
          // return res.status(201).json({
          //   message: "password reseted",
          //   token: req.body.user.token,
          // });
          return;
        })
        .catch((err) => {
          return res.status(501).json({
            message: err,
          });
        });
    }
  });
}

export function getSubuserData(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  req.body.user = {
    ...req.body.user,
    subusers: [],
  };
  console.log("getting subuser data");
  console.log(req.body.tokenPayload.subusers);
  Promise.all(
    req.body.tokenPayload.subusers.map((subuserID: any) => {
      return SubUser.findById(subuserID)
        .then((result: any) => {
          const subuser = {
            _id: result._id,
            schoolid: result.schoolid,
            name: result.name,
            sid: result.sid,
          };
          req.body.user.subusers.push(subuser);
        })
        .catch((err: any) => {
          return res.status(500).json({
            message: err,
          });
        });
    })
  ).then(() => {
    console.log("Finish adding subuser");
    next();
  });
  return;
}

export function updateUserDetails(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {}

export function deleteUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("start deleting");
  User.findByIdAndUpdate(req.body.userid, { activeuser: false })
    .exec()
    .then((user) => {
      return Promise.all(
        //@ts-ignore
        user?.subusers.map((subuserid) => {
          return SubUser.findByIdAndUpdate(subuserid, {
            activeuser: false,
          })
            .exec()
            .then(() => {
              return;
            })
            .catch((err: any) => {
              return res.status(500).json({
                message: err,
              });
            });
        })
      ).then(() => {
        return res.status(201).json({
          message:
            "User account will be deactivated before deletion after 30 days. Login to reactivate account.",
        });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
}
