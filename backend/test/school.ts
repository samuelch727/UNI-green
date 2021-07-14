import mongoose from "mongoose";
import School from "../src/models/School";
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

describe("School testing", () => {
  var token: String, schoolid: String, userid: String, subuserid: String;
  before((done) => {
    console.log("resetting database");
    School.remove({}, (err) => {
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

  describe("/POST create school", () => {
    it("Test create school.", (done) => {
      let request = {
        name: "CUHK",
        description: "run la",
        iconUrl: "njnjnnndjfjjfjf",
        address: "Loscyr PArk",
        tel: "92876543",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.have.property("message").eql("School Created");
          done();
        });
    });

    it("Test create school with missing name.", (done) => {
      let request = {
        description: "run la",
        iconUrl: "njnjnnndjfjjfjf",
        address: "Loscyr PArk",
        tel: "2345678",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create school with missing description", (done) => {
      let request = {
        name: "FKU",
        iconUrl: "njnjnnndjfjjfjf",
        address: "Loscyr PArk",
        tel: "92876543",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create school with missing address.", (done) => {
      let request = {
        name: "FKU",
        description: "run la",
        iconUrl: "njnjnnndjfjjfjf",
        tel: "92876543",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test create school with missing tel", (done) => {
      let request = {
        name: "FKU",
        description: "run la",
        iconUrl: "njnjnnndjfjjfjf",
        address: "Loscyr PArk",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
  });

  describe("/PUT update school", () => {
    it("Test update school's information", (done) => {
      let request = {
        name: "FKU",
        description: "run la",
        iconUrl: "kjhgf",
        address: "Loscyr PArk",
        tel: "92876543",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .put("/api/school/update-school-info")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.have.property("message").eql("School updated");
          done();
        });
    });
    it("Test update school's information with missing name.", (done) => {
      let request = {
        description: "run la",
        iconUrl: "dk3456789kjhbvcdrt6",
        address: "Lohas Park",
        tel: "92876543",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test update school's information with missing description", (done) => {
      let request = {
        name: "FKU",
        iconUrl: "njnjnnndjfjjfjf",
        address: "Loscyr PArk",
        tel: "987654987",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test update school's information with missing address.", (done) => {
      let request = {
        name: "FKU",
        description: "run la",
        iconUrl: "fdtdkfhgljhih67866",
        tel: "9876545678",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });

    it("Test update school's information with missing tel", (done) => {
      let request = {
        name: "FKU",
        description: "run la",
        iconUrl: "65vib65g54fcug",
        address: "Loscyr PArk",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .post("/api/school/signup")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(400);
          res.body.should.have.property("message").eql("Invalid input");
          done();
        });
    });
  });

  describe("/PUT delete school", () => {
    it("Test delete school account", (done) => {
      let request = {
        name: "CUHK",
        description: "run la",
        iconUrl: "njnjnnndjfjjfjf",
        address: "Loscyr PArk",
        tel: "92876543",
        userid,
        subuserid,
        schoolid: "60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .put("/api/school/delete-school")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(201);
          res.body.should.have
            .property("message")
            .eql("School account is deleted.");
          done();
        });
    });

    it("Test delete non exist school account", (done) => {
      let request = {
        name: "FKU",
        description: "newDescription",
        iconUrl: "newIconUrl",
        address: "newAddress",
        tel: "newTel",
        userid,
        subuserid,
        schoolid: "new60cb22c1e1376625c3b6e203",
      };
      chai
        .request(server)
        .put("/api/school/delete-school")
        .set({ authorization: "Bearer " + token })
        .send(request)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(401);
          res.body.should.have.property("message").eql("Permission denied.");
          done();
        });
    });
  });
});
