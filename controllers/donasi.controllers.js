const Video = require("../models/video");
const Buku = require("../models/buku");
const Donasi = require("../models/donasi");
const R2 = require("aws-sdk");
const cloudinary = require("../utils/cloudinary");
// const upload = require("../utils/multer");

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

  donasiBuku: async (req, res) => {
    const { id } = req.params;

    try {
      const publicBucketUrl = process.env.R2_PUBLIC_BUCKET_URL;
      const D2 = new R2.S3({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      });

      // Upload book file
      let bookKey = Math.round(Math.random() * 99999999999999).toString();
      const bookUrl = publicBucketUrl + bookKey;
      await D2.upload({
        Body: req.files.book_url[0].buffer,
        Bucket: process.env.R2_BUCKET_NAME,
        Key: bookKey,
        ContentType: req.files.book_url[0].mimetype,
      }).promise();

      // Upload image file
      let imgKey = Math.round(Math.random() * 99999999999999).toString();
      const imgUrl = publicBucketUrl + imgKey;
      await D2.upload({
        Body: req.files.img_url[0].buffer,
        Bucket: process.env.R2_BUCKET_NAME,
        Key: imgKey,
        ContentType: req.files.img_url[0].mimetype,
      }).promise();

      let buku = new Buku({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        tahun_terbit: req.body.tahun_terbit,
        rating: req.body.rating,
        star: req.body.star,
        img_url: imgUrl,
        book_url: bookUrl,
        download_url: bookUrl,
        category: req.body.category,
      });

      const savedBuku = await buku.save();

      const donasi = new Donasi({
        bukuID: savedBuku._id,
        userID: id,
      });

      const savedDonasi = await donasi.save();

      savedBuku.donaturId = savedDonasi._id;
      await savedBuku.save();

      res.json({
        message: "Book donation successful",
        data: buku,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Book donation failed",
        data: error,
      });
    }
  },
};
