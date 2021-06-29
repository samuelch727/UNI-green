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
dotenv.config({ path: "../src/.env" });

chai.use(chaiHttp);

describe("User testing", () => {
  var token: String, userid: String, subuserid: String;
  beforeEach((done) => {
    User.remove({}, (err) => {
      SubUser.remove({}, (err) => {
        done();
      });
    });
  });

  describe("/POST create new user", () => {
    it("should create a new category with new products created", (done) => {
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
  });
});
