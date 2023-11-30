const express = require("express");
const {
  bookmarkByUser,
  getTotalBookmarksByUser,
  getBookmarkByUser,
} = require("../controllers/bookmark.controllers");

const route = express.Router();

route.post("/user/:id", bookmarkByUser);
route.get("/user/total-bookmark/:id", getTotalBookmarksByUser);
route.get("/user/data-bookmark/:id", getBookmarkByUser);
module.exports = route;
