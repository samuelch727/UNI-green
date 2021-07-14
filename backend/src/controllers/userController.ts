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
      if (!req.body.password) {
        return res.status(400).json({
          message: "Invalid input",
        });
      }
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
            return res.status(400).json({
              message: "Invalid input",
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
              subusers: [],
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
          if (!users[0].activeuser) {
            req.body.user = {
              ...req.body.user,
              message: "Account has been reactivated.",
            };
            User.findByIdAndUpdate(users[0]._id, { activeuser: true })
              .then((user) => {
                users[0].subusers.map((subuserid: any) => {
                  SubUser.findByIdAndUpdate(subuserid, {
                    activeuser: true,
                  })
                    .then((subuser: any) => {})
                    .catch((err: any) => {
                      // return res.status(500).json({
                      //   message: err,
                      // });
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
  return res.status(req.method == "POST" ? 201 : 200).json({
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
      var userData = await getUserData(req.body.userid);

      const userAdmin = await checkUserAdmin(
        req.body.schoolid,
        //@ts-ignore
        userData.subusers
      );
      const userSchoolAdmin = await checkUserSchoolAdmin(
        req.body.schoolid,
        //@ts-ignore
        userData.subusers
      );
      const newSubUser = new SubUser({
        userid: req.body.userid,
        schoolid: req.body.schoolid,
        verify: userSchoolAdmin || userAdmin ? req.body.verify ?? false : false,
        name: req.body.name,
        sid: req.body.sid,
        activeuser: true,
        graddate: req.body.graddate,
        admin: userAdmin ? req.body.admin ?? false : false,
        schooladmin:
          userSchoolAdmin || userAdmin ? req.body.schooladmin ?? false : false,
        schooluser:
          userSchoolAdmin || userAdmin ? req.body.schooluser ?? false : false,
      });

      if (newSubUser.validateSync()) {
        return res.status(422).json({
          message: "Invalid input",
        });
      }

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
        req.body.tokenPayload.subusers.push(result._id);
        next();
        return;
      } catch (err: any) {
        return res.status(401).json({
          message: err,
        });
      }
    } else {
      return res.status(400).json({
        message: "User Already Created",
      });
    }
  });
}

// future features
export function addBatchSubUser(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // check user have permission to perform action
  req.body.user.subusers.find(
    (result: any) => result.schoolid == req.body.addschoolid
  );
  Promise.all(
    req.body.subusers.map((subuser: any) => {
      return SubUser.findOne({
        sid: subuser.sid,
        schoolid: subuser.schoolid,
      }).then((result) => {
        if (!result) {
        }
      });
    })
  );
}

export function updateSubuserList(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  User.findByIdAndUpdate(
    req.body.userid,
    {
      $push: { subusers: req.body.subuser._id },
    },
    { new: true, upsert: true }
  )
    .then((user) => {
      next();
      return;
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
  Promise.all(
    req.body.tokenPayload.subusers.map((subuserID: any) => {
      return SubUser.findById(subuserID).then((result: any) => {
        const subuser = {
          _id: result._id,
          schoolid: result.schoolid,
          name: result.name,
          sid: result.sid,
        };
        req.body.user.subusers.push(subuser);
      });
    })
  )
    .then(() => {
      next();
    })
    .catch((err: any) => {
      return res.status(500).json({
        message: "Error when loading subuser",
      });
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

export async function checkUserAdmin(
  schoolid: string,
  subusersid: Array<string>
): Promise<Boolean> {
  // await subusersid?.map(async (subuserid: String) => {
  //   return await SubUser.findById(subuserid).then((subuser) => {
  //     if (subuser?.schoolid.toString() == schoolid && subuser?.admin) {
  //       return true;
  //     }
  //   });
  // });
  // return false;
  return Promise.all(
    subusersid?.map((subuserid: String) => {
      return SubUser.findById(subuserid).then((subuser) => {
        if (subuser?.schoolid.toString() == schoolid && subuser?.admin) {
          return true;
        }
      });
    })
  )
    .then((result) => {
      if (result.includes(true)) return true;
      return false;
    })
    .catch((err) => {
      return false;
    });
}

export async function checkUserSchoolAdmin(
  schoolid: string,
  subusersid: Array<string>
): Promise<Boolean> {
  return Promise.all(
    subusersid?.map((subuserid: String) => {
      return SubUser.findById(subuserid).then((subuser) => {
        if (subuser?.schoolid.toString() == schoolid && subuser?.schooladmin) {
          return true;
        }
      });
    })
  )
    .then((result) => {
      if (result.includes(true)) return true;
      return false;
    })
    .catch((err) => {
      return false;
    });
}

export async function checkSchoolUser(
  schoolid: string,
  subusersid: Array<string>
): Promise<Boolean> {
  return Promise.all(
    subusersid?.map((subuserid: String) => {
      return SubUser.findById(subuserid).then((subuser) => {
        if (subuser?.schoolid.toString() == schoolid && subuser?.schooluser) {
          return true;
        }
      });
    })
  )
    .then((result) => {
      if (result.includes(true)) return true;
      return false;
    })
    .catch((err) => {
      return false;
    });
}

export async function getUserData(userid: String) {
  var returnData = {};
  await User.findById(userid)
    .then((user) => {
      returnData = user ?? {};
      return user;
    })
    .catch((err) => {
      return null;
    });
  return returnData;
}

export async function isSubuserGrad(subuserid: String) {
  await SubUser.findById(subuserid)
    .then((subuser) => {
      if (subuser) {
        let today = new Date();
        if (subuser.graddate < today) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
