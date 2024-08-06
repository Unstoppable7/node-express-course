require("dotenv").config();
require("express-async-errors");
const express = require("express");
const router = require("./routes/main");
const app = express();
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandlerMiddleware);

const port = 3000;

const start = async () => {
   try {
      app.listen(port, () => console.log(`Server is running on port ${port}`));
   } catch (error) {
      console.log(error);
   }
};

start();
