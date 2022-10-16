const expressFunction = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

var Schema = require("mongoose").Schema;

const signIn = expressFunction.Router();

const key = "MY_KEY";

const employeeSchema = Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    collection: "employee",
  }
);

let Employee;
try {
  Employee = mongoose.model("employee");
} catch (error) {
  Employee = mongoose.model("employee", employeeSchema);
}

const findEmployee = (email) => {
  return new Promise((resolve, reject) => {
    Employee.findOne({ email: email }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find email!!!"));
      } else {
        if (data) {
          resolve({
            id: data._id,
            name: data.name,
            email: data.email,
            password: data.password,
          });
        } else {
          reject(new Error("Cannot find email!!!"));
        }
      }
    });
  });
};

const compareHash = (plainText, hashText) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainText, hashText, (err, data) => {
      if (err) {
        reject(new Error("Error bcrypt compare"));
      } else {
        resolve({ status: data });
      }
    });
  });
};

signIn.route("/signin").post(async (req, res) => {
  const playload = {
    email: req.body.email,
    password: req.body.password,
  };
  console.log(playload);
  try {
    const result = await findEmployee(playload.email);
    const loginStatus = await compareHash(playload.password, result.password);
    const status = loginStatus.status;
    if (status) {
      const token = jwt.sign(result, key, { expiresIn: 60 * 60 });
      res.status(200).json({ result, token, status });
    } else {
      res.status(200).json({ status });
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = signIn;
