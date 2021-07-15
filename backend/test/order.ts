import mongoose from "mongoose";
import Order from "../src/models/Order";
import SubOrder from "../src/models/SubOrder";
import User from "../src/models/User";
import SubUser from "../src/models/SubUser";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";
let should = chai.should();

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { describe, it } from "mocha";
dotenv.config({ path: "../src/.env" });

chai.use(chaiHttp);

describe("Order testing", () => {
  var token: String,
    orderid: String,
    suborderid: [String],
    userid: String,
    subuserid: String;
  before((done) => {
    console.log("resetting database");
    Order.remove({}, (err) => {
      SubOrder.remove({}, (err) => {
        User.remove({}, (err) => {
          SubUser.remove({}, (err) => {
            bcrypt.hash("testpassword", 10, (err: any, hash: any) => {
              User.create({
                username: "test",
                tel: "12345678",
                email: "test@email.com",
                activeuser: true,
                password: hash,
              }).then((user) => {
                SubUser.create({
                  userid: user._id,
                  schoolid: "60cb22c1e1376125c3b6e203",
                  verify: true,
                  name: "chan tai man",
                  sid: "1155000000",
                  activeuser: true,
                  graddate: Date.now(),
                  admin: true,
                  schooladmin: false,
                  schooluser: false,
                }).then((subuser) => {
                  User.findByIdAndUpdate(user._id, {
                    $push: { subusers: subuser._id },
                  }).then(() => {
                    token = jwt.sign(
                      {
                        userID: user._id,
                        email: user.email,
                        username: user.username,
                        subusers: [subuser._id],
                      },
                      process.env.ACCESS_TOKEN_SECRET ?? "",
                      { expiresIn: "30m" }
                    );
                    userid = user._id;
                    subuserid = subuser._id;
                    Order.create({
                      userid: "testorder",
                      subOrderid: [],
                      status: true,
                      completionTime: "time",
                    });
                    done();
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  describe("/POST create new order", () => {
    it("Test creating order.", (done) => {
      let request = {
        userid: "testorder",
        subOrderid: ["nkdjbjcbjkn"],
      };
      chai
        .request(server)
        .post("/api/order/create-order")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("Successfully added order");
          done();
        });
    });

    it("Test create order with missing userid", (done) => {
      let request = {
        subOrderid: ["nkdjbjcbjkn"],
      };
      chai
        .request(server)
        .post("/api/order/create-order")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create order with missing subOrderid", (done) => {
      let request = {
        userid: "testorder",
      };
      chai
        .request(server)
        .post("/api/order/create-order")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
  });

  describe("/POST create subOrder", () => {
    var orderid: any, token: any;
    it("Test create sub order", (done) => {
      var request: any = {
        userid: "testSubOrder",
        quantity: "2",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .get("/api/order/create-suborder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.have.property("order");
          res.body.order.should.have.property("token");
          res.body.order.should.have.property("suborders");
          res.body.order.suborders[0].should.have.property("_id");
          res.body.order.suborders[0].should.have
            .property("userid")
            .eql("fcvbok098765");
          res.body.order.suborders[0].should.have.property("quantity").eql("2");
          res.body.order.suborders[0].should.have
            .property("productType")
            .eql("testProductType");
          done();
          //res.body.should.have
          //.property("message")
          //.eql("SubOrder Already Created");
        });
    });

    it("Test create suborder with invalid input (missing userid)", (done) => {
      let request = {
        quantity: "2",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .get("/api/order/create-suborder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
    it("Test create suborder with invalid input (missing quantity)", (done) => {
      let request = {
        userid: "testSubOrder",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .get("/api/order/create-suborder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
    it("Test create suborder with invalid input (missing productType)", (done) => {
      let request = {
        userid: "testSubOrder",
        quantity: "2",
        status: true,
      };
      chai
        .request(server)
        .get("/api/order/create-suborder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
  });

  //describe("/GET get subOrder data", () => {});
  //describe("/PUT update subOrder", () => {});

  describe("/PUT cancel order", () => {
    it("Test cancel order", (done) => {
      let request = {
        userid: "testSubOrder",
        quantity: "2",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .put("/api/order/cancelorder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("The Order Is Canceled Successfully");
          done();
        });
    });

    it("Test delete non exist order with corresponding userid", (done) => {
      let request = {
        userid: "fakeSubOrder",
        quantity: "2",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .put("/api/order/cancelorder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(401);
          res.body.should.have.property("message").eql("Permission denied.");
          done();
        });
    });
    it("Test delete order with missing userid", (done) => {
      let request = {
        userid: "testSubOrder",
        quantity: "2",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .put("/api/order/cancelorder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
    it("Test delete order with missing quantity", (done) => {
      let request = {
        userid: "testSubOrder",
        quantity: "2",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .put("/api/order/cancelorder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test delete order with missing productType", (done) => {
      let request = {
        userid: "testSubOrder",
        quantity: "2",
        productType: "test product type",
        status: true,
      };
      chai
        .request(server)
        .put("/api/order/cancelorder")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
  });
});
