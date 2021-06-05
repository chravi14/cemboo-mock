const express = require("express");

const router = express.Router();
const Order = require("./../models/orderModel");
const orderController = require("./../controllers/orderController");

router.get("/orders", (req, res) => {
  res.send("This is orders route");
});

router.post("/order", async (req, res) => {
  const obj = await orderController(req.body);
  const orderObj = new Order({ ...obj });
  orderObj
    .save()
    .then((res) => console.log("Saved", res))
    .catch((err) => console.log("failed to save", err));
  res.send(obj);
});

module.exports = router;
