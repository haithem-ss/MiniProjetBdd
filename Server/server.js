const express = require("express");
const cors = require("cors");
//import .env
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//global variables (including app)

PORT = process.env.PORT;
app = express();
app.use(cors());

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//define GET / home request response
app.get("/", function (req, res) {
  res.status(200).send("We are up and running");
});

app.listen(PORT, function () {
  console.log(`server running on localhost:${PORT}`);
});
//

module.exports = app;