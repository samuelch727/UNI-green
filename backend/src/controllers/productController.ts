import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";

interface Product {
  schoolid: String;
  categoryid: String;
  stock: Number;
  available: Boolean;
  imgUrl: [String];
  price: Number;
  producttype: [ProductType];
  name: String;
}
interface ProductType {
  type: String;
  name: String;
}

export function createProduct(req: Request, res: Response, next: NextFunction) {
  if (!req.body.products) {
    return res.status(201).json({
      message: "Category created successfully",
    });
  }
  Category.findById(req.body.categoryid)
    .then((category) => {
      if (category) {
        var insertArr = new Array<Product>();
        req.body.products.map((product: any) => {
          insertArr.push({
            schoolid: req.body.schoolid,
            categoryid: req.body.categoryid,
            stock: product.stock,
            available: product.available,
            imgUrl: product.imgUrl,
            price: product.price,
            producttype: product.producttype,
            name: product.name,
          });
        });
        console.log(insertArr);
        Product.insertMany(insertArr)
          .then((products) => {
            var productid = category.productid;
            products.map((product) => {
              productid.push(product._id);
            });
            Category.findByIdAndUpdate(req.body.categoryid, {
              productid: productid,
            })
              .then((result) => {
                console.log("Successfully added all product");
                return res.status(201).json({
                  message: "Successfully added all products",
                  categoryid: req.body.categoryid,
                });
              })
              .catch((err) => {
                console.log("Error when adding product id to category");
                console.log(err);
                return res.status(401).json({
                  message: err,
                });
              });
          })
          .catch((err) => {
            console.log("Error when adding products");
            console.log(err);
            return res.status(401).json({
              message: err,
            });
          });
      } else {
        console.log("No matching category found when adding products");
        return res.status(401).json({
          message: "No matching category found when adding products",
        });
      }
    })
    .catch((err) => {
      console.log("Error when searching category");
      console.log(err);
      return res.status(401).json({
        message: err,
      });
    });
}

export function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.newcategory) {
    Category.findOne({
      name: req.body.name,
      schoolid: req.body.schoolid,
    }).then((result) => {
      if (!result) {
        Category.create({
          name: req.body.name,
          description: req.body.description,
          available: req.body.available,
          producttype: req.body.producttype,
          availabletopublic: req.body.availabletopublic,
          availabletograd: req.body.availabletograd,
          schoolid: req.body.schoolid,
        })
          .then((category) => {
            req.body.categoryid = category._id;
            console.log("Created new category");
            next();
            return;
          })
          .catch((err) => {
            console.log(err);
            res.status(401).json({ message: "invalid input" });
          });
      } else {
        console.log("Category with same name already created");
        return res.status(401).json({
          message: "Category with same name already exist.",
        });
      }
    });
  } else {
    next();
    return;
  }
}

// get product list

/*
{
    userid: user id,
    schoolid: school id,
    subuserid: subuser id,
    categoryid: category id,
}
*/

export function getProductList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var resArray: any[] = [];
  Category.findById(req.body.categoryid)
    .then((category) => {
      if (category) {
        Promise.all(
          category.productid.map((productid) => {
            return Product.findById(productid).then((product) => {
              if (product && product.available) {
                resArray.push(product);
              }
            });
          })
        )
          .then(() => {
            res.status(200).json({
              category,
              products: resArray,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: "Internal server error",
            });
          });
      } else {
        res.status(404).json({
          message: "category not found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    });
}

import {
  getSubuserDataById,
  getUserData,
  isSubuserGrad,
} from "./userController";
import { authenticateToken } from "../middleware/authentication";

// get category list
/*
{
    **OPTIONAL** userid: user id,
    **OPTIONAL** schoolid: school id,
    TODO: add search by name
}
*/

export async function getCategoryList(
  req: Request,
  res: Response,
  next: NextFunction
) {
  var query: any = {};
  let schoolidArr: any[] = [];
  let solveGivenSchool = false;
  let userIsAdmin = false;
  console.log(req.body);

  // load subuser schoolid
  if (req.body.userid) {
    await authenticateToken(req, res, () => {});
    console.log(req.body.tokenPayload.subusers);
    // if (req.body.tokenPayload.subusers.length) {
    query = {
      $or: [],
    };
    // } else {
    //   query["availabletopublic"] = true;
    // }
    if (!req.body.tokenPayload) return;
    let today = new Date();
    for (let i = 0; i < req.body.tokenPayload.subusers.length; i++) {
      var subuser: any = await getSubuserDataById(
        req.body.tokenPayload.subusers[i]
      );
      let isGrad = subuser?.graddate < today;
      if (req.body.schoolid && req.body.schoolid == subuser?.schoolid) {
        console.log("Given School ID, and match subuser");
        solveGivenSchool = true;
        query = {
          schoolid: subuser.schoolid,
          available: true,
        };
        if (isGrad) {
          console.log("Graded");
          query["availabletograd"] = true;
        }
        break;
      }
      if (subuser.admin && !req.body.schoolid) {
        query = {};
        break;
      }

      if (subuser.admin) {
        userIsAdmin = true;
      }

      if (isGrad && !subuser.schooladmin) {
        query.$or.push({
          schoolid: subuser.schoolid,
          availabletograd: true,
          available: true,
        });
      } else {
        query.$or.push({
          schoolid: subuser.schoolid,
          available: true,
        });
      }
    }
    query?.$or?.push({
      availabletopublic: true,
      available: true,
    });
  }
  if (req.body.schoolid && !solveGivenSchool) {
    console.log("Given school, no matching subuser");
    if (userIsAdmin) {
      query = {
        schoolid: req.body.schoolid,
      };
    } else {
      query = {
        schoolid: req.body.schoolid,
        availabletopublic: true,
        available: true,
      };
    }
  }

  if (!req.body.schoolid && !req.body.userid) query["availabletopublic"] = true;

  console.log("query");
  console.log(query);
  Category.find(query)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "internal server error" });
    });
}

// TODO: update product
// TODO: delete product
