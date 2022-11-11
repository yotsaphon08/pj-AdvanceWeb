const expressFunction = require("express");
const mongoose = require("mongoose");
var expressApp = expressFunction();

const url = "mongodb://localhost:27017/pj";
const config = {
  autoIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

expressApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Option, Authorization"
  );
  return next();
});

expressApp.use(expressFunction.json());

expressApp.use(expressFunction.json({limit: '50mb'}));
expressApp.use(expressFunction.urlencoded({limit: '50mb'}));
expressApp.use((req, res, next) => {
  mongoose
    .connect(url, config)
    .then(() => {
      console.log("Connected to MongoDB...");
      next();
    })
    .catch((err) => {
      console.log("Cannot connect to MongoDB");
      res.status(501).send("Cannot connect to MongoDB");
    });
});

expressApp.use("/login", require("./auth/signup"));
expressApp.use("/login", require("./auth/signin"));
expressApp.use("/api", require("./api/menu"));
expressApp.use("/api", require("./api/employee"));
expressApp.use("/api", require("./api/addmenu"));
expressApp.use("/deletemenu", require("./api/menu"));

expressApp.listen(3000, function () {
  console.log("Listening on port 3000");
});
