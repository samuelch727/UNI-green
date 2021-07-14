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
        description: req.body.description,
        iconUrl: req.body.iconUrl,
        address: req.body.address,
        tel: req.body.tel,
      });
      if (newSchool.validateSync()) {
        return res.status(400).json({
          message: "Invalid input",
        });
      }
      try {
        const result = await newSchool.save();
        req.body.school = result;
        console.log(result);
        return res.status(201).json({
          result,
          message: "School Created",
        });
      } catch (err: any) {
        console.log("error when creating school");
        console.log(err);
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

export function sendSchoolData(req: express.Request, res: express.Response) {
  console.log(req.body.school);
  return res.status(200).json({
    school: req.body.school,
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
        name: req.body.name,
        description: req.body.description,
        iconUrl: req.body.iconUrl,
        address: req.body.address,
        tel: req.body.tel,
        message: "School updated",
      });
    })

    /*
      {
        name

      }
      */

    // console.log(school);
    // if (school) {
    //   School.findOneAndUpdate({
    //     name: req.body.name,
    //     description: req.body.description,
    //     iconUrl: req.body.iconUrl,
    //     address: req.body.address,
    //     tel: req.body.tel,
    //   }).then(function () {
    //     School.findOne({ _id: school._id }).then(function (result: any) {
    //       assert(result.name === req.body.name);
    //     });
    //   });
    //   return res.status(201).json({
    //     schoolid: req.body.schoolid,
    //   });
    // } else {
    //   return res.status(501).json({
    //     message: "school not found",
    //   });
    // }
    .catch((err) => {
      return res.status(501).json({
        message: "internal server error",
      });
    });
}

export function deleteSchool(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log("start deleting");
  School?.deleteOne({ school: req.body.schoolid }, function (err) {
    if (err) return res.status(500).json({ message: err });
    return res.status(201).json({
      message: "School account is deleted.",
    });
  });
  // .catch((err: any) => {
  //   return res.status(500).json({
  //     message: err,
  //   });
  // });
}

// req.body.tokenPayload.subusers
// [awiejgbaowej5553q2, adogubawoeigo32452]

//For front end -- Require user's input: name, description, iconUrl, address, tel

export function addProduct(schoolid: any, categoryid: any) {
  School.findByIdAndUpdate(
    schoolid,
    {
      $push: { category: categoryid },
    },
    { new: true, upsert: true }
  )
    .then((school) => {
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}
