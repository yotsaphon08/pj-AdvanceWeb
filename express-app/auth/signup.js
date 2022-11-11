var expressFunction = require("express");
const signUp = expressFunction.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var Schema = require("mongoose").Schema;

const employeeSchema = Schema(
  {
    name: String,
    email: String,
    password: String,
    EmpID: String,
    gender: String,
    tel: String,
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

const makeHash = async (plainText) => {
  const result = await bcrypt.hash(plainText, 10);
  return result;
};

const insertEmployee = (dataEmployee) => {
  return new Promise((resolve, reject) => {
    var new_Employee = new Employee({
      name: dataEmployee.name,
      email: dataEmployee.email,
      password: dataEmployee.password,
      EmpID: dataEmployee.EmpID,
      gender: dataEmployee.gender,
      tel: dataEmployee.tel,
    });

    new_Employee.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Employee to DB!"));
      } else {
        resolve({ message: "Sign up successfully" });
      }
    });
  });
};

signUp.route("/signup").post((req, res) => {
  makeHash(req.body.password)
    .then((hashText) => {
      const playload = {
        name: req.body.name,
        email: req.body.email,
        password: hashText,
        EmpID: req.body.EmpID,
        gender: req.body.gender,
        tel: req.body.tel,
      };
      console.log(playload);

      insertEmployee(playload)
        .then((result) => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = signUp;
