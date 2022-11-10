var expressFunction = require("express");
const menu = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const menuSchema = Schema(
  {
    id: String,
    name: String,
    price: Number,
    type: String,
    MID: String,
    category: String,
    quantity: Number,
    detail: String,
    pic: String,
  },
  {
    collection: "menu",
  }
);

let Menu;
try {
  Menu = mongoose.model("menu");
} catch (error) {
  Menu = mongoose.model("menu", menuSchema);
}

const findMenu = () => {
  return new Promise((resolve, reject) => {
    Menu.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot findAll Menu!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot findAll Menu!!!"));
        }
      }
    });
  });
};

menu.route("/menu").get(auth, async (req, res) => {
  const data = await findMenu();
  console.log(data);
  res.status(200).json(data);
});


module.exports = menu;
