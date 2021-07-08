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
import { describe } from "mocha";
dotenv.config({ path: "../src/.env" });

chai.use(chaiHttp);

describe("Products", () => {
  var token: String, userid: String, subuserid: String;
  before((done) => {
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
                    Category.create({
                      name: "test category 2",
                      description: "test category 2 (not available to public)",
                      available: true,
                      producttype: [],
                      availabletopublic: false,
                      availabletograd: true,
                      productid: [],
                      schoolid: "60cb22c1e1376625c3b6e203",
                    });
                    Category.create({
                      name: "test category 3",
                      description: "test category 3 (available to public)",
                      available: true,
                      producttype: [],
                      availabletopublic: true,
                      availabletograd: true,
                      productid: [],
                      schoolid: "60cb22c1e1376625c3b6e204",
                    });
                    Category.create({
                      name: "test category 4",
                      description: "test category 4 (not available)",
                      available: false,
                      producttype: [],
                      availabletopublic: true,
                      availabletograd: true,
                      productid: [],
                      schoolid: "60cb22c1e1376625c3b6e203",
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

  describe("/POST products and categories", () => {
    it("Test creating new category and adding one product.", (done) => {
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
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("Successfully added all products");
          done();
        });
    });

    it("Test creating already exist category", (done) => {
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
        products: [],
      };
      chai
        .request(server)
        .post("/api/product/product")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property("message")
            .eql("Category with same name already exist.");
          done();
        });
    });

    it("Test creating category with invalid input (missing schoolid)", (done) => {
      let request = {
        userid: userid,
        subuserid: subuserid,
        newcategory: true,
        name: "test new category",
        description: "test new category description",
        available: true,
        producttype: ["size"],
        availabletopublic: true,
        availabletograd: false,
        products: [],
      };
      chai
        .request(server)
        .post("/api/product/product")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have
            .property("message")
            .eql("Missing school ID, permission denied.");
          done();
        });
    });

    it("Test creating category with invalid input (missing category name)", (done) => {
      let request = {
        userid: userid,
        subuserid: subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
        newcategory: true,
        description: "test new category description",
        available: true,
        producttype: ["size"],
        availabletopublic: true,
        availabletograd: false,
        products: [],
      };
      chai
        .request(server)
        .post("/api/product/product")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("invalid input");
          done();
        });
    });
  });

  describe("/GET search categories", () => {
    it("Test searching all category with admin user.", (done) => {
      let request = {
        userid,
      };
      chai
        .request(server)
        .get("/api/product/getcategory")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(4);
          done();
        });
    });
    it("Test searching all category with invalid input (missing token with userid)", (done) => {
      let request = {
        userid,
      };
      chai
        .request(server)
        .get("/api/product/getcategory")
        .send(request)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("invalid token");
          done();
        });
    });
    it("Test searching all category with normal user", (done) => {
      let userid, token;
      bcrypt.hash("testpassword", 10, (err: any, hash: any) => {
        User.create({
          username: "test2",
          tel: "12345678",
          email: "test2@email.com",
          activeuser: true,
          password: hash,
        }).then((user) => {
          userid = user._id;
          SubUser.create({
            userid: user._id,
            schoolid: "60cb22c1e1376625c3b6e203",
            verify: true,
            name: "chan tai man",
            sid: "1155000000",
            activeuser: true,
            graddate: Date.now(),
            admin: false,
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
            });
          });
        });
      });
      let request = {
        userid,
      };
      chai
        .request(server)
        .get("/api/product/getcategory")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
    it("Test searching category for public", (done) => {
      let request = {};
      chai
        .request(server)
        .get("/api/product/getcategory")
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
    it("Test searching category with given school", (done) => {
      let request = {
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .get("/api/product/getcategory")
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(1);
          done();
        });
    });
    it("Test searching category with given schoolid and userid", (done) => {
      let request = {
        schoolid: "60cb22c1e1376625c3b6e203",
        userid,
      };
      chai
        .request(server)
        .get("/api/product/getcategory")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
});
