var expressFunction = require("express");
const employee = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const empSchema = Schema(
  {
    id: String,
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
  Employee = mongoose.model("employee", empSchema);
}

const findEmployee = () => {
  return new Promise((resolve, reject) => {
    Employee.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot findAll Employee!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot findAll Employee!!!"));
        }
      }
    });
  });
};

employee.route("/employee").get(auth, async (req, res) => {
  const data = await findEmployee();
  console.log(data);
  res.status(200).json(data);
});


module.exports = employee;
