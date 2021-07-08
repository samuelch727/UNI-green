import SubUser from "../models/SubUser";
import { Request, Response, NextFunction } from "express";

export function checkUserAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.schoolid) {
    console.log("Fail to check user admin level. Missing school ID");
    return res.status(401).json({
      message: "Missing school ID, permission denied.",
    });
  }
  return Promise.all(
    req.body.tokenPayload.subusers.map((subuserid: String) => {
      return SubUser.findById(subuserid).then((subuser) => {
        if (subuser?.schoolid == req.body.schoolid && subuser?.admin) {
          console.log("User has admin permission");
          next();
          return true;
        }
      });
    })
  )
    .then((result) => {
      if (result.includes(true)) {
        return;
      }
      return res.status(401).json({
        message: "Permission denied.",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
}

export function checkUserSchoolAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.schoolid) {
    console.log("Fail to check user admin level. Missing school ID");
    return res.status(401).json({
      message: "Missing school ID, permission denied.",
    });
  }
  return Promise.all(
    req.body.tokenPayload.subusers.map((subuserid: String) => {
      return SubUser.findById(subuserid).then((subuser) => {
        if (subuser?.schoolid == req.body.schoolid && subuser?.schooladmin) {
          console.log("User has school admin permission");
          next();
          return true;
        }
      });
    })
  )
    .then((result) => {
      if (result.includes(true)) {
        return;
      }
      console.log("User has no school admin permission");
      return res.status(401).json({
        message: "Permission denied.",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
}

export function checkSchoolUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.schoolid) {
    console.log("Fail to check user admin level. Missing school ID");
    return res.status(401).json({
      message: "Missing school ID, permission denied.",
    });
  }
  return Promise.all(
    req.body.tokenPayload.subusers.map((subuserid: String) => {
      return SubUser.findById(subuserid).then((subuser) => {
        if (subuser?.schoolid == req.body.schoolid && subuser?.schooluser) {
          console.log("User has school user permission");
          next();
          return true;
        }
      });
    })
  )
    .then((result) => {
      if (result.includes(true)) {
        return;
      }
      console.log("User has no school user permission");
      return res.status(401).json({
        message: "Permission denied.",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
}

export function checkUserAdminOrSchoolAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.schoolid) {
    console.log("Fail to check user admin level. Missing school ID");
    return res.status(401).json({
      message: "Missing school ID, permission denied.",
    });
  }
  return Promise.all(
    req.body.tokenPayload.subusers.map((subuserid: String) => {
      return SubUser.findById(subuserid).then((subuser) => {
        if (
          (subuser?.schoolid == req.body.schoolid && subuser?.schooladmin) ||
          subuser?.admin
        ) {
          console.log("User has admin permission");
          next();
          return true;
        }
      });
    })
  )
    .then((result) => {
      if (result.includes(true)) {
        return;
      }
      return res.status(401).json({
        message: "Permission denied.",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    });
}
