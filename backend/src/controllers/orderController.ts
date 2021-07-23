import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
import Order from "../models/Order";
import express from "express";
import SubOrder from "../models/SubOrder";

export function addOrder(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (!req.body.userid) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  if (!req.body.subOrderid) {
    return res.status(400).json({
      message: "Invalid input",
    });
  }
  Order.findOne({ orderid: req.body.orderid }).then(async (orderid: any) => {
    if (!orderid) {
      //create new order
      const newOrder = new Order({
        userid: req.body.userid,
        subOrderid: [req.body.subOrderid],
        status: req.body.status,
        completionTime: req.body.completionTime ?? Date.now(),
      });
      let err = newOrder.validateSync();
      if (err) {
        console.log(err);
        return res.status(400).json({
          message: "Invalid input",
        });
      }
      try {
        // save new order to database "Orders" collection
        const createdOrder = await newOrder.save();
        //saving order data for response
        const order = {
          _id: createdOrder._id,
        };
        req.body.order = createdOrder;
        // TODO: save user data

        console.log(createdOrder);
        return res.status(201).json({
          createdOrder,
          message: "Order Created",
        });
      } catch (err: any) {
        console.log("Error When Creating Order");
        console.log(err);
        return res.status(401).json({
          message: err,
        });
      }
    } else {
      return res.status(401).json({ message: "Order Already Created" });
    }
  });
}

/**
 * response with order data
 * @param req income request
 * @param res response
 * @returns
 */
export function sendOrderData(req: express.Request, res: express.Response) {
  console.log(req.body.order);
  return res.status(200).json({
    order: req.body.order,
  });
}

export async function getOrderData(orderid: String) {
  var returnData = {};
  await Order.findById(orderid)
    .then((order) => {
      returnData = order ?? {};
      return order;
    })
    .catch((err) => {
      return null;
    });
  return returnData;
}

export function getSubOrderData(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  req.body.order = {
    ...req.body.order,
    suborder: [],
  };
  SubOrder.findById(req.body.suborderid)
    .then((result: any) => {
      const suborder = {
        _id: result._id,
        userid: result.userid,
        quantity: result.quantity,
        productType: result.productType,
        status: result.status,
        completionTime: result.completionTime,
      };
      req.body.order.suborder.push(suborder);
    })
    .catch((err: any) => {
      return res.status(500).json({
        message: "Error When Loading SubOrder",
      });
    });
  return;
}

export async function getSubOrderDataById(userid: String) {
  var obj: any;
  await SubOrder.findById(userid)
    .then((suborder) => {
      console.log("SubOrder found");
      console.log(suborder);
      obj = suborder;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
  return obj;
}

export function addSubOrder(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  SubOrder.findOne({
    userid: req.body.userid,
    quantity: req.body.quantity,
    productType: req.body.productType,
    status: req.body.status,
    completionTime: req.body.completionTime,
  }).then(async (subOrder: any) => {
    if (!subOrder) {
      var orderData = await getOrderData(req.body.orderid);

      const newSubOrder = new SubOrder({
        userid: req.body.userid,
        quantity: req.body.quantity,
        productType: req.body.productType,
        status: req.body.status,
        completionTime: req.body.completionTime,
      });

      if (newSubOrder.validateSync()) {
        return res.status(422).json({
          message: "Invalid input",
        });
      }

      try {
        const result = await newSubOrder.save();
        //res.status(201).json(result);
        // add suborder id to order
        const suborder = {
          _id: result._id,
          userid: result.userid,
          quantity: result.quantity,
          productType: result.productType,
          status: result.status,
          completionTime: result.completionTime,
        };
        req.body.suborder = suborder;
        next();
      } catch (err: any) {
        return res.status(401).json({
          message: err,
        });
      }
    } else {
      return res.status(400).json({
        message: "SubOrder Already Created",
      });
    }
  });
}

export function updateOrderDetails(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {}

export function updateSubOrderList(
  req: express.Request,
  res: express.Response
) {
  Order.findByIdAndUpdate(
    req.body.order,
    {
      $push: { suborders: req.body.suborder._id },
    },
    { new: true, upsert: true }
  )
    .then((order) => {
      return res.status(201).json({
        orderid: req.body.orderid,
        suborderid: req.body.suborder,
      });
    })
    .catch((err) => {
      return res.status(501).json({
        message: err,
      });
    });
}

export function cancelOrder(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // each product shd be able to cancel one by one
  Order.findByIdAndUpdate(req.body.orderid)
    .exec()
    .then((order) => {
      return Promise.all(
        //@ts-ignore
        order?.suborders.map((suborderid) => {
          return SubOrder.findByIdAndUpdate(suborderid)
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
          message: "The Order Is Canceled Successfully",
        });
      });
    })
    .catch((err: any) => {
      return res.status(500).json({
        message: err,
      });
    });
}
