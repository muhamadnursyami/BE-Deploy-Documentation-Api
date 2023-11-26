require("dotenv").config();
const User = require("../models/user");

const cloudinary = require("../utils/cloudinary");

module.exports = {
  updateProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { namaLengkap, jenisKelamin, noHp, email, bio, profileImage } =
        req.body;

      // Mengunggah file baru ke Cloudinary
      const result = await cloudinary.uploader
        .upload_stream({ resource_type: "auto" }, async (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            try {
              // Mengupdate foto profil dan data lainnya di MongoDB
              const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                  profileImage: result.secure_url,
                  namaLengkap,
                  jenisKelamin,
                  noHp,
                  email,
                  bio,
                },
                { new: true }
              );
              res.json(updatedUser);
            } catch (updateError) {
              console.error(updateError);
              res.status(500).json({ error: "Internal Server Error" });
            }
          }
        })
        .end(req.file.buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await User.find();

      res.json({
        message: "berhasil mendapatkan semua data user",
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const users = await User.findById(id);

      res.json({
        message: "berhasil mendapatkan  data user by id",
        users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const { id } = req.params;

      await User.findByIdAndDelete(id);
      res.json({
        message: "data user berhasil dihapus berdasarkan id",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteAllUser: async (req, res) => {
    try {
      await User.deleteMany({});
      res.json({
        message: "semua data user berhasil dihapus",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
