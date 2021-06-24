import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import School from "../models/School";
import express from "express";

//store data : school acc data, update data
//find id: each data has unique id
export function addSchool(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  School.findOne({ name: req.body.name }).then(async (school: any) => {
    if (!school) {
      const newSchool = new School({
        name: req.body.name,
        discription: req.body.discription,
        iconUrl: req.body.iconUrl,
        address: req.body.address,
        tel: req.body.tel,
      });
      try {
        const result = await newSchool.save();
        req.body.school = result;
        next();
        return;
      } catch (err: any) {
        return res.status(401).json({
          message: err,
        });
      }
    } else {
      return res.status(401).json({
        message: "School Already Created",
      });
    }
  });
}

export function updateSchoolData(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  School.findByIdAndUpdate(req.body.schoolid, {
    name: req.body.name,
    description: req.body.description,
    iconUrl: req.body.iconUrl,
    address: req.body.address,
    tel: req.body.tel,
  })
    .then((school) => {
      return res.status(201).json({
        schoolid: req.body.schoolid,
      });
    })
    .catch((err) => {
      return res.status(501).json({
        message: err,
      });
    });
}

export function delectSchool(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  School.findByIdAndUpdate(req.body.schoolid);
}

// req.body.tokenPayload.subusers
// [awiejgbaowej5553q2, adogubawoeigo32452]
