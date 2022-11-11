var expressFunction = require("express");
const employee = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const empSchema = Schema(
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

const findEmployeeID = (id) => {
  return new Promise((resolve, reject) => {
    Employee.findOne({ _id: id }, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Employee!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Employee!!!"));
        }
      }
    });
  });
};

employee.route("/employee/:id").get(auth, async (req, res) => {
  const id = req.params.id;
  const data = await findEmployeeID(id);
  console.log(data);
  res.status(200).json(data);
});

const EditEmployee = async (id, d) => {
  // const doc = await Employee.findById(id);
  // //doc.name = d.name;
  // console.log((doc.gender = d.gender));
  // doc.gender = d.gender;
  // doc.tel = d.tel;
  // console.log(doc);
  // await doc.save();

  return new Promise(async (resolve, reject) => {
    Employee.updateMany({ _id: id }, { $set: d }, (err, data) => {
      if (err) {
        reject(new Error("Cannot update Employee!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot update Employee!!!"));
        }
      }
    });
    console.log("-----------------------");
    //console.log(a);
  });
};

employee.route("/employee/:id").put(auth, async (req, res) => {
  const id = req.params.id;
  const d = req.body;
  //console.log(d, id);
  const data = await EditEmployee(id, d);
  //console.log(data);
  res.status(200).json(data);
});

module.exports = employee;
