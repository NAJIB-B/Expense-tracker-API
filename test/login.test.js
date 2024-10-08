
require("dotenv").config()
let expect

(async()=>{
  const chai = await import("chai");
  expect = chai.expect
})()

const { describe } = require("mocha");
const request = require("supertest")


const app = require("../app")
const User = require("../models/userModel")



const req = request(app)
const route = "/api/v1/user/login"

describe("User login endpoint", function() {

  before( async ()=> {
    const user = await User.create({
      name: "john doe",
      email: "johndoe@gmail.com",
      password: "test1234",
      confirmPassword: "test1234"
    })
  })
  after( async ()=> {
    await User.findOneAndDelete({email: "johndoe@gmail.com"})
  })

  it("Should return jwt for successfull user login", function (done) {
    req
    .post(route)
    .send({
      email: "johndoe@gmail.com",
      password: "test1234"
    })
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.body).to.have.property('token')
      expect(res.body.status).to.equal('success')
      done()
    })
  })

  it("Should return 400 if email is incorrect", function (done) {
    req
    .post(route)
    .send({
      email: "johndoegmail.com",
      password: "test1234"
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it("Should return 400 if email is missing", function (done) {
    req
    .post(route)
    .send({
      password: "test1234"
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it("Should return 400 if password is missing", function (done) {
    req
    .post(route)
    .send({
      email: "johndoe@gmail.com",
    })
    .expect(400)
    .end(function (err, res) {
      if (err) return done(err)
      done()
    })
  })

  it("Should return 401 if email or password is incorrect", function (done) {
    req
    .post(route)
    .send({
      email: "johndoe@gmail.com",
      password: "test12345"
    })
    .expect(401)
    .end(function (err, res) {
      if (err) return done(err)
      done()
    })
  })
})
