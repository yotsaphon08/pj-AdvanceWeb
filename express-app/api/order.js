var expressFunction = require("express");
const order = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const orderSchema = Schema(
  {
    
    menuordering: String,
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
          resolve({ message: "Order added successfully" , data});
        }
      });
    });
  };
  
  

order.route("/order").get(auth, async (req, res) => {
  const data = await findOrder();
  console.log(data);
  res.status(200).json(data);
});

order.route("/addorder").post(auth, async (req, res) => {
    console.log("addorder");
    console.log(req.body);
    addOrder(req.body).then(result => {
      console.log(result);
      res.status(200).json(result);
    }).catch(err => {
      console.log(err);
    })
  
  });


module.exports = order;
