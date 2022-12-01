import { LoginUser } from "../src/services/UserServices";
import express from "express";
import chaiHttp from "chai-http";
import { app } from "../src/index";
import chai, { expect } from "chai";

// AdvisorId: 638635700a36b0ced11107fe

chai.use(chaiHttp);

describe("LoginServices ", () => {
  // mocha, chai, testing for login using chaiHttp
  it("should return 200 ok if valid user", async () => {
    const result = await chai
      .request(app)
      .post("/user/login")
      .send({
        data: {
          email: "janekane@uni.com",
          password: "password",
        },
      });
    expect(result.status).to.equal(200);
  });

  it("should return 401 if invalid user", async () => {
    const result = await chai
      .request(app)
      .post("/user/login")
      .send({
        data: {
          email: "test@uni.com",
          password: "password",
        },
      });
    expect(result.status).to.equal(401);
  });

});
             
describe("should register a user", () => {
  it("should return 200 and register a user", async () => {
    const result = await chai
      .request(app)
      .post("/user/register")
      .send({
        
          email: "testt@uni.com",
          password: "passwordd",
          role: "tutor",
          firstName: "fred",
          lastName: "johns",
        
      });
    expect(result.status).to.equal(200);
  });



});

describe("return all students", () => {
  it("should return 200 and all students", async () => {
    const result = await chai
      .request(app)
      .get("/user/allStudents")
      //console.log(result);
    expect(result.status).to.equal(200);
  });



});


