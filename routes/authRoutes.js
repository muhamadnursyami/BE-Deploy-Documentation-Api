const express = require("express");
const {
  register,
  login,
  loginAdmin,
  registerAdmin,
} = require("../controllers/auth.controllers");
const route = express.Router();

route.post("/register", register);
route.post("/login", login);
// route.post("/cms/register", registerAdmin);
// route.post("/cms/login", loginAdmin);

module.exports = route;
