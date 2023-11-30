const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const Bookmark = require("../models/bookmark");

module.exports = {
  bookmarkByUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { videoID, bookID } = req.body;

      // Validate that either videoID or bookID is provided
      if (!videoID && !bookID) {
        return res
          .status(400)
          .json({ error: "Invalid request. Provide videoID or bookID." });
      }

      let existingBookmark;
      if (videoID) {
        existingBookmark = await Bookmark.findOne({
          userID: id,
          videoID,
        });
      } else if (bookID) {
        existingBookmark = await Bookmark.findOne({
          userID: id,
          bookID,
        });
      }

      if (existingBookmark) {
        // If the bookmark exists, delete it (unbookmark)
        await existingBookmark.deleteOne();
        res.status(200).json({ success: true, isBookmarked: false });
      } else {
        // If the bookmark doesn't exist, add it
        const newBookmark = new Bookmark({
          userID: id,
          ...(videoID ? { videoID } : { bookID }),
        });

        const savedBookmark = await newBookmark.save();
        res.status(201).json({ success: true, isBookmarked: true });
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      }

      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },

  getTotalBookmarksByUser: async (req, res) => {
    try {
      const { id } = req.params;

      // Get the total number of bookmarks for the user
      const totalBookmarks = await Bookmark.countDocuments({ userID: id });

      res.status(200).json({ success: true, totalBookmarks: totalBookmarks });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
  getBookmarkByUser: async (req, res) => {
    try {
      const { id } = req.params;

      let userId;
      try {
        userId = new ObjectId(id);
      } catch (error) {
        return res.status(400).json({ message: "Invalid user ID." });
      }

      // Get the bookmarks for the user
      const userBookmarks = await Bookmark.find({ userID: userId });

      if (userBookmarks.length === 0) {
        return res
          .status(404)
          .json({ message: "No bookmarks found for the user." });
      }

      // Combine both books and videos into a single array
      const allBookmarks = userBookmarks.filter(
        (bookmark) => !!bookmark.bookID || !!bookmark.videoID
      );

      res.status(200).json(allBookmarks);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Terjadi kesalahan server" });
    }
  },
};
