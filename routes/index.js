var express = require("express");
var router = express.Router();

var all_product = require("../model/user");

var cart = require("../model/cart");

var login = require("../model/login");

/* GET home page. */

// ! INSERT DATA
router.post("/", async function (req, res, next) {
  var data = await all_product.create(req.body);
  res.status(201).json({
    status: "success",
    data,
  });
});

// ! INSERT LOGIN DATA
router.post("/account", async function (req, res, next) {
  var data = await login.create(req.body);
  res.status(201).json({
    status: "success",
    data,
  });
});

//  ! GET ALL PRODUCT MAIN DATABASE
router.post("/select", async function (req, res, next) {
  var data = await all_product.find();
  res.status(201).json({
    status: "success",
    data,
  });
});

//  ! GET ALL PRODUCT CART DATABASE
router.post("/select_cart", async function (req, res, next) {
  var data = await cart.find();
  res.status(201).json({
    status: "success",
    data,
  });
});

//  ! GET ALL LOGIN DATA DATABASE
router.post("/login_data", async function (req, res, next) {
  var data = await login.find();
  res.status(201).json({
    status: "success",
    data,
  });
});

// ! GET single product MAIN DATABASE
router.get("/search", async function (req, res, next) {
  var search = req.query.p_id;
  console.log(search);
  var data = await all_product.find({ _id: search });
  res.status(201).json({
    status: "success",
    data,
  });
});

// ! GET single login data in login database
router.get("/data_id", async function (req, res, next) {
  var search = req.query._id;
  console.log("hello", search);
  var data = await login.find({ _id: search });
  res.status(201).json({
    status: "success",
    data,
  });
});

// ! add cart
router.get("/add_cart", async function (req, res, next) {
  var search = req.query.p_id;

  var data = await all_product.find({ _id: search });
  var check_product = await cart.find({ p_id: search });
  console.log(check_product);
  if (check_product == "") {
    const obj = {
      p_name: data[0].p_name,
      price: data[0].price,
      brand: data[0].brand,
      description: data[0].description,
      p_img: data[0].p_img,
      p_id: data[0]._id,
    };

    var cart_data = await cart.create(obj);

    res.status(201).json({
      status: "success",
      cart_data,
    });
  } else {
    res.status(201).json({
      status: "your product is already added",
    });
  }
});

// ! delete api
router.get("/delete", async (req, res) => {
  const p_delete = req.query.p_id;

  console.log(p_delete);

  try {
    res.status(201).json({
      status: "success",
      p_delete,
    });

    var deleteApi = await cart.deleteOne({ _id: p_delete });
    if (!req.params.p_delete) {
      return res.status(201).send();
      p_delete;
    }

    res.send(deleteApi);
  } catch (e) {
    res.status(201).send(e);
  }
});

// ! update query  quantity
router.get("/update", async (req, res, callback) => {
  const id = req.query.p_id;

  console.log(id);

  const updateID = { _id: id };
  const quntity = { quantity: req.query.quantity };

  console.log(updateID);

  var updateApi = await cart.findByIdAndUpdate(updateID, quntity);
  res.status(201).json({
    status: "success",
    updateApi,
  });
  //res.send(updateApi);
});

// ! update query  user data
router.get("/update_profile", async (req, res, callback) => {
  const id = req.query._id;

  console.log("profile iddddd", id);

  const updateID = { _id: id };
  const userData = {
    name: req.query.name,
    email: req.query.email,
    number: req.query.number,
    password: req.query.password,
  };

  console.log(updateID);

  var updateApi = await login.findByIdAndUpdate(updateID, userData);
  res.status(201).json({
    status: "success",
    updateApi,
  });
  //res.send(updateApi);
});

// ! LOGIN API
router.post("/login", async function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  console.log(email);
  console.log(password);

  var data = await login.find({ email: email });
  console.log(data);
  if (data != "") {
    var pass = data[0].password;

    if (password == pass) {
      res.status(201).json({
        status: "success",
        data,
      });
    } else {
      res.status(201).json({
        status: "Pass invalid",
      });
    }
  } else {
    res.status(201).json({
      status: "email invalid",
    });
  }

  // res.status(201).json({
  //   status: "success",
  //   data,
  // });
});

module.exports = router;
