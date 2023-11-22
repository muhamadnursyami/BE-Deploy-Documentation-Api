const express = require("express");
const { register } = require("../controllers/auth.controllers");
const route = express.Router();

route.post("/register", register);

module.exports = route;
