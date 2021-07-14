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
    suborderid: String,
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
        subOrderid: [],
        status: true,
        completionTime: "time",
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

    it("Test ");
  });
});
