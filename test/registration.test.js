require("dotenv").config()
let expect

(async()=>{
  const chai = await import("chai");
  expect = chai.expect
})()

const { describe } = require("mocha");
const request = require("supertest")


const app = require("../app")


describe("User registration endpoint", function() {
  it("It should return a jwt and status 201 for successful user registration", function (done) {
    request(app)
      .post("/api/v1/user/register")
    .send({
      email: "testUser@gmail.com",
      name: "john doe",
      password: "test1234",
      confirmPassword: "test1234"
    })
    .expect(201)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.body).to.have.property("token")
      done()
    })
  })

  it("Should return 400 for incorrect email", function (done) {
    request(app)
      .post("/api/v1/user/register")
    .send({
      email: "testUsergmail.com",
      name: "john doe",
      password: "test1234",
      confirmPassword: "test1234"
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.status).to.equal(400)
      done()
    })

  })    

  const requiredFields = ["email", "name", "password", "confirmPassword"]
    const requestBody = {
    email: "test@gmail.com",
    name: "test name",
    password: "test1234",
    confirmPassword: "test1234",
  };

  for (const field of requiredFields) {

    const incorrectBody = {...requestBody}
    delete incorrectBody[field]

    it(`Should return 400 for missing ${field}`, function (done) {


      request(app)
        .post("/api/v1/user/register")
        .send(incorrectBody)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)

          expect(res.status).to.equal(400)
          done()
        })
    })

  } 

  it("Should return 400 for if password and confirmPassword are not the same", function (done) {
    request(app)
      .post("/api/v1/user/register")
    .send({
      email: "testUser@gmail.com",
      name: "john doe",
      password: "test12345",
      confirmPassword: "test1234"
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err)
      done()
    })

  })    

})
