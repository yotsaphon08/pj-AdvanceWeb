var expressFunction = require("express");
const stamps = expressFunction.Router();
const auth = require("../config/authorize");
const mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

const menuSchema = Schema(
  {
    id: String,
    name: String,
    points: Number,
    tel: String,
  },
  {
    collection: "stamps",
  }
);

let Stamps;
try {
  Stamps = mongoose.model("stamps");
} catch (error) {
  Stamps = mongoose.model("stamps", menuSchema);
}

const addStamps = (StampsData) => {
  return new Promise((resolve, reject) => {
    var new_stamps = new Stamps({
      name: StampsData.name,
      points: 1,
      tel: StampsData.tel,
    });
    new_stamps.save((err, data) => {
      if (err) {
        reject(new Error("Cannot insert Stamps to DB!"));
      } else {
        resolve({ message: "Stamps added successfully", data });
      }
    });
  });
};

stamps.route("/stamps").post(auth, async (req, res) => {
  console.log("stamps");
  console.log(req.body);
  addStamps(req.body)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

const findStamps = () => {
  return new Promise((resolve, reject) => {
    Stamps.find({}, (err, data) => {
      if (err) {
        reject(new Error("Cannot findAll Stamps!!!"));
      } else {
        if (data) {
          resolve(data);
        } else {
          reject(new Error("Cannot findAll Stamps!!!"));
        }
      }
    });
  });
};

stamps.route("/stamps").get(auth, async (req, res) => {
  const data = await findStamps();
  //console.log(data);
  res.status(200).json(data);
});

const removeOrder = (_id) => {
  return new Promise((resolve, reject) => {
    Stamps.findOneAndRemove({ _id: _id }, function (err) {
      if (err) {
        reject(new Error("Cannot remove Stamps"));
      } else {
        resolve("Remove Stamps Successfully..");
      }
    });
  });
};

stamps.route("/stamps/:id").delete(auth, async (req, res) => {
  const _id = req.params.id;
  removeOrder(_id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result, { modifiedCount: result.modifiedCount });
    })
    .catch((err) => {
      console.log(err);
    });
});

const updateStamps = async (tel, p) => {
  const doc = await Stamps.updateMany({ tel: tel }, { $inc: { points: p } });
  console.log(doc);
  return doc;
};

stamps.route("/stamps/:id").put(auth, async (req, res) => {
  const tel = req.params.id;
  const p = req.body.points;

  const data = await updateStamps(tel, p);
  //console.log(data);
  res.status(200).json(data);
});

module.exports = stamps;
