var expressFunction = require("express");
const order = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const orderSchema = Schema(
  {
    menuordering: Array,
    sumprice: Number,
    time: String,
  },
  {
    collection: "order",
  }
);

let Order;
try {
  Order = mongoose.model("order");
} catch (error) {
  Order = mongoose.model("order", orderSchema);
}

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

const findOrder = () => {
  return new Promise((resolve, reject) => {
    Order.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot find Order!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot find Order!!!"));
        }
      }
    });
  });
};

const addOrder = (orderData) => {
  return new Promise((resolve, reject) => {
    var new_order = new Order(orderData);
    new_order.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Order to DB!"));
      } else {
        resolve({ message: "Order added successfully", data });
      }
    });
  });
};

const removeOrder = (_id) => {
  return new Promise((resolve, reject) => {
    Order.findOneAndRemove({ _id: _id }, function (err) {
      if (err) {
        reject(new Error("Cannot remove Order"));
      } else {
        resolve("Remove Order Successfully..");
      }
    });
  });
};

order.route("/deleteorder/:id").delete(auth, async (req, res) => {
  const _id = await req.params.id;
  removeOrder(_id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

order.route("/order").get(auth, async (req, res) => {
  const data = await findOrder();
  console.log(data);
  res.status(200).json(data);
});

const updateMenu = async (data) => {
  var a = {};
  for (let i = 0; i < data.length; i++) {
    if (a[data[i]]) {
      a[data[i]] += 1;
    } else {
      a[data[i]] = 1;
    }
  }
  console.log(a);
  console.log("-------------");

  var o = Object.keys(a);
  var v = Object.values(a);
  console.log(o, v);
  for (let i = 0; i < o.length; i++) {
    const doc = await Menu.updateMany(
      { _id: o[i] },
      { $inc: { quantity: -v[i] } }
    );
    console.log(doc);
  }
};

order.route("/addorder").post(auth, async (req, res) => {
  console.log("addorder");
  //console.log(req.body);
  addOrder(req.body)
    .then((result) => {
      //console.log(result);
      updateMenu(result.data.menuordering);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = order;
