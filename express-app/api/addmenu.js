var expressFunction = require("express");
const addmenu = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const menuSchema = Schema(
  {
    name: String,
    price: Number,
    type: String,
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

const addMenu = (menuData) => {
  return new Promise((resolve, reject) => {
    var new_menu = new Menu(menuData);
    new_menu.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Menu to DB!"));
      } else {
        resolve({ message: "Menu added successfully" });
      }
    });
  });
};

addmenu.route("/addmenu").post(auth, async (req, res) => {
  console.log("addMenu");
  console.log(req.body);
  addMenu(req.body).then(result => {
    console.log(result);
    res.status(200).json(result);
  }).catch(err => {
    console.log(err);
  })

});

module.exports = addmenu;
