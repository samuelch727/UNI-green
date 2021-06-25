import express, { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import Category from "../models/Category";

// TODO: create product
/*
    request body for creating new product / category
    {
        "userid": userid,
        "subuserid": subuserid,
        "schoolid": mongoose.Types.ObjectId,
        "newcategory": Boolean,
        **OPTIONAL** "categoryid": mongoose.Types.ObjectId,
        **OPTIONAL** "name": String, 
        **OPTIONAL** "description": category description,
        **OPTIONAL** "available": boolean,
        **OPTIONAL** "producttype": [String],
        **OPTIONAL** "availabletopublic": boolean,
        **OPTIONAL** "availabletograd": boolean,
        "products": [
            "stock": Number,
            "available": Boolean,
            "imgUrl": [String],
            "price": mongoose.Types.Decimal128,
            "producttype": [{ 
                "typename": typename,
                "name": name
            }];
        ]
    }
*/

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
              .then(() => {
                console.log("Successfully added all product");
                return res.status(201).json({
                  message: "Successfully added all products",
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

// TODO: create category

export function createCategory(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.body.newcategory == "true") {
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
        }).then((category) => {
          req.body.categoryid = category._id;
          console.log("Created new category");
          next();
          return;
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
