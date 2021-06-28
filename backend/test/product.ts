import mongoose from "mongoose";
import Category from "../src/models/Category";
import Product from "../src/models/Product";
import User from "../src/models/User";
import SubUser from "../src/models/SubUser";

import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/app";
let should = chai.should();

import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../src/.env" });

chai.use(chaiHttp);

describe("Products", () => {
  var token: String, userid: String, subuserid: String;
  beforeEach((done) => {
    Product.remove({}, (err) => {
      Category.remove({}, (err) => {
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
                  schoolid: "60cb22c1e1376625c3b6e203",
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

  describe("/POST products and categories", () => {
    it("should create a new category with new products created", (done) => {
      let request = {
        userid: userid,
        subuserid: subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
        newcategory: true,
        name: "test new category",
        description: "test new category description",
        available: true,
        producttype: ["size"],
        availabletopublic: true,
        availabletograd: false,
        products: [
          {
            name: "M Cloth",
            stock: "3",
            available: true,
            imgUrl: ["imgurl"],
            price: "12.99",
            producttype: {
              type: "size",
              name: "l",
            },
          },
        ],
      };
      chai
        .request(server)
        .post("/api/product/product")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("Successfully added all products");
          done();
        });
    });
  });
});
