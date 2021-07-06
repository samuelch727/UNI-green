import express from "express";
const router = express.Router();
import {
  createProduct,
  createCategory,
  getProductList,
  getCategoryList,
} from "../controllers/productController";
import { authenticateToken } from "../middleware/authentication";
import {
  checkUserAdmin,
  checkUserSchoolAdmin,
  checkUserAdminOrSchoolAdmin,
} from "../middleware/userPermission";

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
router.post(
  "/product",
  authenticateToken,
  checkUserAdminOrSchoolAdmin,
  createCategory,
  createProduct
);

/*
    request body for getting product list
    {
      "userid": userid,
      "categoryid": categoryid
    }

    return:
    {
      "category" : category object,
      "products" : array of product objects
    }
*/

router.get("/product", authenticateToken, getProductList);
router.get("/getcategory", getCategoryList);

export default router;
