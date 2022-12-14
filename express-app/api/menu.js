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
    img: String,
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

const updateQuantityMenu = async (id, d) => {
  const doc = await Menu.updateMany({ _id: id }, { $inc: { quantity: d } });
  console.log(doc);
  return doc;
};

menu.route("/updatemenu/:id").put(auth, async (req, res) => {
  const id = req.params.id;
  const d = req.body.quantity;
  //console.log(d, id);
  const data = await updateQuantityMenu(id, d);
  //console.log(data);
  res.status(200).json(data);
});

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

const removeMenu = (id) => {
  return new Promise((resolve, reject) => {
    Menu.findOneAndRemove({ _id: id }, function (err) {
      if (err) {
        reject(new Error("Cannot remove Menu"));
      } else {
        resolve("Remove Menu Successfully..");
      }
    });
  });
};
menu.route("/menu").get(auth, async (req, res) => {
  const data = await findMenu();
  //console.log(data);
  res.status(200).json(data);
});

menu.route("/deletemenu/:id").delete(auth, async (req, res) => {
  const mid = await req.params.id;
  removeMenu(mid)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = menu;
