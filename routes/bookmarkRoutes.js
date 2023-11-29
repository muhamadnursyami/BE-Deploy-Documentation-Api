const express = require("express");
const {
  bookmarkByUser,
  getTotalBookmarksByUser,
} = require("../controllers/bookmark.controllers");

const route = express.Router();

route.post("/user/:id", bookmarkByUser);
route.get("/user/total-bookmark/:id", getTotalBookmarksByUser);
module.exports = route;
