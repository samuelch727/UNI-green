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
  req.body.tokenPayload.subusers.map((subuserid: String) => {
    SubUser.findById(subuserid).then((subuser) => {
      if (subuser?.schoolid == req.body.schoolid && subuser?.admin) {
        console.log("User has admin permission");
        next();
        return;
      }
    });
  });
  console.log("User has no admin permission");
  return res.status(401).json({
    message: "Permission denied.",
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
  req.body.tokenPayload.subusers.map((subuserid: String) => {
    SubUser.findById(subuserid).then((subuser) => {
      if (subuser?.schoolid == req.body.schoolid && subuser?.schooladmin) {
        console.log("User has admin permission");
        next();
        return;
      }
    });
  });
  console.log("User has no admin permission");
  return res.status(401).json({
    message: "Permission denied.",
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
  req.body.tokenPayload.subusers.map((subuserid: String) => {
    SubUser.findById(subuserid).then((subuser) => {
      if (subuser?.schoolid == req.body.schoolid && subuser?.schooluser) {
        console.log("User has admin permission");
        next();
        return;
      }
    });
  });
  console.log("User has no admin permission");
  return res.status(401).json({
    message: "Permission denied.",
  });
}
