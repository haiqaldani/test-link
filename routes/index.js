var express = require("express");
var router = express.Router();

var productRoute = require("./product");
// var cartRoute = require("./cart");
// var orderRoute = require("./order");
var authRoute = require("./auth");

router.use("/product", productRoute);
// router.use("/cart", cartRoute);
// router.use("/order", orderRoute);
router.use("/auth", authRoute);

module.exports = router;
