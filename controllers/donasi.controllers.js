const Video = require("../models/video");
const Donasi = require("../models/donasi");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  donasiVideo: async (req, res) => {
    try {
      const { id } = req.params;

      if (!req.file) {
        return res.status(400).json({ error: "No file or video uploaded" });
      }

      const result = await cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          try {
            // Get URL thumbnail from result
            const thumbnailUrl = cloudinary.url(result.public_id, {
              resource_type: "video",
              width: 300,
              height: 200,
              crop: "fill",
              format: "jpg",
            });

            const video = new Video({
              title: req.body.title,
              description: req.body.description,
              author: req.body.author,
              category: req.body.category,
              url_thumbnail: thumbnailUrl,
              url_video: result.secure_url,
              url_unduh: result.secure_url,
              tanggal_upload: new Date(),
            });

            const savedVideo = await video.save();

            // Create a new donation record for the video
            const donasi = new Donasi({
              videoID: savedVideo._id,
              userID: id,
            });

            const savedDonasi = await donasi.save();

            // Update the video record with the donation ID
            savedVideo.donaturId = savedDonasi._id;
            await savedVideo.save();

            res.json(savedVideo);
          } catch (updateError) {
            console.error(updateError);
            res.status(500).json({ error: "Internal Server Error" });
          }
        })
        .end(req.file.buffer);
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
};
