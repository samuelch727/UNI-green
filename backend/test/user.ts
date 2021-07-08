import mongoose from "mongoose";
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

describe("User testing", () => {
  var token: String, userid: String, subuserid: String;
  before((done) => {
    console.log("resetting database");
    User.remove({}, (err) => {
      SubUser.remove({}, (err) => {
        done();
      });
    });
  });

  describe("/POST create new user", () => {
    it("Test create user.", (done) => {
      let request = {
        username: "testuser",
        password: "testpassword",
        tel: "12345678",
        email: "testemail@email.com",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("user");
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("token");
          done();
        });
    });

    it("Test create user with already exist username", function (done) {
      let request = {
        username: "testuser",
        password: "testpassword",
        tel: "12345678",
        email: "testemail2@email.com",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(401);
          res.body.should.have
            .property("message")
            .eql("Username exist. Fail to create account");
          done();
        });
    });

    it("Test create user with already exist email", function (done) {
      let request = {
        username: "testuser2",
        password: "testpassword",
        tel: "12345678",
        email: "testemail@email.com",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(401);
          res.body.should.have
            .property("message")
            .eql("Email exist. Fail to create account");
          done();
        });
    });

    it("Test create user with missing password", function (done) {
      let request = {
        username: "testUserMissingPassword",
        tel: "12345678",
        email: "testusermissingpassword@email.com",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create user with missing email", function (done) {
      let request = {
        username: "testInvalidInput",
        password: "testpassword",
        tel: "12345678",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create user with invalid email address", function (done) {
      let request = {
        username: "testInvalidInput",
        password: "testpassword",
        tel: "12345678",
        email: "testinvalidinput",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create user with missing tel", function (done) {
      let request = {
        username: "testUserMissingPassword",
        password: "testpassword",
        email: "testinvalidinput@email.com",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create user with missing username", function (done) {
      let request = {
        password: "testpassword",
        tel: "12345678",
        email: "testinvalidinput@email.com",
      };
      chai
        .request(server)
        .post("/api/user/signup")
        .send(request)
        .end((err, res) => {
          // console.log(res);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
  });

  describe("/GET login user", () => {
    it("Test login user with username", (done) => {
      let request = {
        username: "testuser",
        password: "testpassword",
      };
      chai
        .request(server)
        .get("/api/user/login")
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("user");
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("username").eql("testuser");
          res.body.user.should.have.property("token");
          done();
        });
    });

    it("Test login user with username", (done) => {
      let request = {
        password: "testpassword",
        email: "testemail@email.com",
      };
      chai
        .request(server)
        .get("/api/user/login")
        .send(request)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("user");
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("username").eql("testuser");
          res.body.user.should.have.property("token");
          done();
        });
    });

    it("Test login non exist user", (done) => {
      let request = {
        username: "nonExistUser",
        password: "testpassword",
      };
      chai
        .request(server)
        .get("/api/user/login")
        .send(request)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("message")
            .eql("Incorrect credentials.");
          done();
        });
    });

    it("Test login user with wrong password", (done) => {
      let request = {
        username: "nonExistUser",
        password: "worngPassword",
      };
      chai
        .request(server)
        .get("/api/user/login")
        .send(request)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have
            .property("message")
            .eql("Incorrect credentials.");
          done();
        });
    });
  });

  describe("/POST create sub user", () => {
    var userid: any, token: any;
    it("Test create sub user", (done) => {
      SubUser.remove({}).then(() => {
        var request: any = {
          schoolid: "60cb22c1e1376625c3b6e203",
          permissionLevel: 0,
          verify: false,
          name: "Chan Tai Man",
          sid: "1155000000",
          graddate: "2021-06-30",
        };
        chai
          .request(server)
          .get("/api/user/login")
          .send({ username: "testuser", password: "testpassword" })
          .end((err, res) => {
            res.should.have.status(200);
            userid = res.body.user._id;
            request = {
              ...request,
              userid: res.body.user._id,
            };
            token = res.body.user.token;
            chai
              .request(server)
              .post("/api/user/createsubuser")
              .set({ authorization: "Bearer " + token })
              .send(request)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("userid");
                res.body.should.have.property("subuser");
                done();
              });
          });
      });
    });

    it("Test create subuser with already exists sid", (done) => {
      let request = {
        userid,
        schoolid: "60cb22c1e1376625c3b6e203",
        verify: false,
        name: "Chan Tai Man",
        sid: "1155000000",
        graddate: "2021-06-30",
      };
      chai
        .request(server)
        .post("/api/user/createsubuser")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property("message").eql("User Already Created");
          done();
        });
    });

    it("Test create subuser with invalid input (missing schoolid)", (done) => {
      let request = {
        userid,
        permissionLevel: 0,
        verify: false,
        name: "Chan Tai Man",
        sid: "1155000001",
        graddate: "2021-06-30",
      };
      chai
        .request(server)
        .post("/api/user/createsubuser")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create subuser with invalid input (missing name)", (done) => {
      let request = {
        userid,
        schoolid: "60cb22c1e1376625c3b6e203",
        permissionLevel: 0,
        verify: false,
        sid: "1155000001",
        graddate: "2021-06-30",
      };
      chai
        .request(server)
        .post("/api/user/createsubuser")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create subuser with invalid input (missing user id) (token test)", (done) => {
      let request = {
        schoolid: "60cb22c1e1376625c3b6e203",
        permissionLevel: 0,
        verify: false,
        name: "Chan Tai Man",
        sid: "1155000001",
        graddate: "2021-06-30",
      };
      chai
        .request(server)
        .post("/api/user/createsubuser")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("message").eql("invalid token");
          done();
        });
    });
  });
});
