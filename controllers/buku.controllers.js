const Buku = require("../models/buku");
const R2 = require("aws-sdk");
const upload = require("../utils/multer");

module.exports = {
  uploadFile: async (req, res) => {
    const publicBucketUrl = process.env.R2_PUBLIC_BUCKET_URL;
    const D2 = new R2.S3({
      region: "auto",
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
    try {
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
      await buku.save();

      res.json({
        message: "Upload successful",
        data: buku,
      });
    } catch (error) {
      console.log(error);
      res.json({
        message: "Upload Failed",
        data: error,
      });
    }
  },

  getAllBuku: async (req, res) => {
    try {
      const buku = await Buku.find();
      res.json({
        data: buku,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
  getBukuById: async (req, res) => {
    try {
      const { id } = req.params;
      const bukuById = await Buku.findById(id);

      res.json({
        data: bukuById,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  },
};