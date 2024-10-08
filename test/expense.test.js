require("dotenv").config()
let expect;

(async () => {
  const chai = await import("chai");
  expect = chai.expect;
})();

const { describe } = require("mocha");
const request = require("supertest");

const app = require("../app");
const User = require("../models/userModel")
const Expense = require("../models/expenseModel");



let token, userId, expenseId
describe("Expense endpoint tests", function () {
  before(async()=> {
    try {
      
      //create user
      const user = await request(app).post("/api/v1/user/register").send({
        name: "test user",
        email: "test@gmail.com",
        password: "test1234",
        confirmPassword: "test1234"
      })

      userId = user.body.user._id
      token = user.body.token

     //create expense 
      const expense = await request(app).post("/api/v1/expense").set("Authorization", `Bearer ${token}`).send({
        title: "Facial cream",
        category: "health",
        amount: 1380000,
        description: "I bought skin care product to treat myy sun burn",
        owner: userId
      }
      )

      
      expenseId = expense.body.expense._id

    } catch (error) {
      console.log(error)
      
    }
  })
  after(async ()=> {
    await User.findOneAndDelete({email: "test@gmail.com"})
  })
  it("Should return 201 for expense created successfully", function (done) {
    request(app)
    .post("/api/v1/expense")
    .set("Authorization", `Bearer ${token}`)
    .send({
        title: "Facial cream",
        category: "health",
        amount: 1380000,
        description: "I bought skin care product to treat myy sun burn",
        owner: userId
    })
    .expect(201)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.body.message).to.equal('success')
      done()
    })

  })

  it("Should return 200 for getting all expenses successfully", function (done) {
    request(app)
    .get("/api/v1/expense")
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.body).to.have.property("expenses")
      done()
    })
    
  })

  it("Should return 200 for getting an expense successfully", function (done) {
    request(app)
    .get(`/api/v1/expense/${expenseId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.body).to.have.property("expense")
      done()
    })
    
  })

  it("Should return 201 for updating an expense successfully", function (done) {
    request(app)
    .patch(`/api/v1/expense/${expenseId}`)
    .set("Authorization", `Bearer ${token}`)
    .send({
      description: "Just changing for fun"
    })
    .expect(201)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.body).to.have.property("expense")
      done()
    })
    
  })

  it("Should return 204 for deleting an expense successfully", function (done) {
    request(app)
    .delete(`/api/v1/expense/${expenseId}`)
    .set("Authorization", `Bearer ${token}`)
    .expect(204)
    .end(function (err, res) {
      if (err) return done(err)

      expect(res.status).to.equal(204)
      done()
    })
    
  })
})
