const mongoose = require("mongoose");

require("dotenv").config();

const app = require("./app");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("database connection successful"));

const port = process.env.PORT 
app.listen(port , ()=> {
  console.log(`server running on port ${port}`)
})
