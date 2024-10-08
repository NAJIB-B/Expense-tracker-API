let expect;

(async () => {
  const chai = await import("chai");
  expect = chai.expect;
})();

const { describe } = require("mocha");
const request = require("supertest");

const app = require("../app");
const User = require("../models/userModel");
const Expense = require("../models/expenseModel");

let token1, token2, userId1, userId2, expenseId;
describe("Authentication and authorization for the expense endpoint", function () {
  before(async () => {
    try {
      //create user 1
      const user1 = await request(app).post("/api/v1/user/register").send({
        name: "meee tooo",
        email: "test@gmail.com",
        password: "test1234",
        confirmPassword: "test1234",
      });

      token1 = user1.body.token;
      userId1 = user1.body.user._id;

      //create user 2
      const user2 = await request(app).post("/api/v1/user/register").send({
        name: "meee tooo",
        email: "test2@gmail.com",
        password: "test1234",
        confirmPassword: "test1234",
      });

      token2 = user2.body.token;
      userId2 = user2.body.user._id;

      // create expense with user1
      const expense = await request(app).post("/api/v1/expense").set("Authorization", `Bearer ${token1}`).send({
        title: "Facial cream",
        category: "health",
        amount: 1380000,
        description: "I bought skin care product to treat myy sun burn",
        owner: userId1
      }
      )

      
      expenseId = expense.body.expense._id

} catch (err) {
  console.log(err);
}
  });

after(async () => {
  await User.findOneAndDelete({ email: "test@gmail.com" });
  await User.findOneAndDelete({ email: "test2@gmail.com" });
});

it("Should return 401 for unauthenticated user", function (done) {
  request(app)
    .get("/api/v1/expense")
    .expect(401)
    .end(function (err, res) {
      if (err) return done(err);

      done();
    });
});

it("Should return 403 for unauthorized access", function (done) {
  request(app)
    .get(`/api/v1/expense/${expenseId}`)
  .set("Authorization", `Bearer ${token2}`)
    .expect(403)
    .end(function (err, res) {
      if (err) return done(err);

      done();
    });
});

});
