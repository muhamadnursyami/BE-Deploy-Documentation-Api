require("dotenv").config();
var jwt = require("jsonwebtoken");
const User = require("../models/user");
const path = require("path");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const bcrypt = require("bcrypt");
module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Tolong isi semua inputan",
        });
      }

      const result = await User.findOne({ email: email });
      if (!result) {
        return res.status(400).json({
          message:
            "Akun anda belum terdaftar, silakan buat akun terlebih dahulu",
        });
      }

      const comparePassword = bcrypt.compareSync(password, result.password);

      if (!comparePassword) {
        return res.status(401).json({
          message: "Password Salah",
        });
      }
      const token = jwt.sign(
        { email: email, role: result.role },
        process.env.JWT_KEY
      );

      return res.status(200).json({
        message: "Berhasil Login!",
        token,
        role: result.role,
        _id: result._id,
        email: result.email,
        nama: result.nama,
        jenisKelamin: result.jenisKelamin,
        profileImage: result.profileImage,
        bio: result.bio,
        noHp: result.noHp,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
  register: async (req, res) => {
    try {
      const {
        nama,
        jenisKelamin,
        email,
        password,
        confirmPassword,
        role,
        noHp,
        bio,
      } = req.body;

      if (!nama || !jenisKelamin || !email || !password || !confirmPassword) {
        return res.status(400).json({
          message: "Tolong isi semua inputan",
        });
      }

      const cekEmailUser = await User.findOne({ email: email });
      if (cekEmailUser) {
        return res.status(400).json({
          message: "Email sudah terdaftar!",
        });
      }
      if (password.length <= 7 && confirmPassword.length <= 7) {
        return res.status(400).json({
          message: "Password harus minimal 8 karakter",
        });
      }
      const hashPassword = bcrypt.hashSync(password, 10);

      const defaultProfileImage =
        jenisKelamin === "pria" ? "men.svg" : "women.svg";

      const result = await cloudinary.uploader.upload(
        path.join(__dirname, "../images", defaultProfileImage),
        { resource_type: "auto" }
      );

      const dataUsers = await User.create({
        nama,
        jenisKelamin,
        email,
        password: hashPassword,
        profileImage: result.secure_url,
        role,
        noHp,
        bio,
      });

      res.status(200).json({
        message: "Register Berhasil",
        dataUsers,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  },
  // loginAdmin: async (req, res) => {
  //   try {
  //     const { email, password } = req.body;

  //     if (!email || !password) {
  //       return res.status(400).json({
  //         message: "Tolong isi semua inputan",
  //       });
  //     }

  //     const result = await User.findOne({ email: email });
  //     if (!result) {
  //       return res.status(400).json({
  //         message:
  //           "Akun anda belum terdaftar, silakan buat akun terlebih dahulu",
  //       });
  //     }

  //     const comparePassword = bcrypt.compareSync(password, result.password);

  //     if (!comparePassword) {
  //       return res.status(401).json({
  //         message: "Password Salah",
  //       });
  //     }
  //     const token = jwt.sign(
  //       { email: email, role: result.role },
  //       process.env.JWT_KEY
  //     );

  //     return res.status(200).json({
  //       message: "Berhasil Login!",
  //       token,
  //       role: result.role,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send(error.message);
  //   }
  // },
  // registerAdmin: async (req, res) => {
  //   try {
  //     const {
  //       nama,
  //       jenisKelamin,
  //       email,
  //       password,
  //       confirmPassword,
  //       role,
  //       noHp,
  //       bio,
  //     } = req.body;

  //     if (
  //       !nama ||
  //       !jenisKelamin ||
  //       !email ||
  //       !password ||
  //       !confirmPassword
  //     ) {
  //       return res.status(400).json({
  //         message: "Tolong isi semua inputan",
  //       });
  //     }

  //     const cekEmailUser = await User.findOne({ email: email });
  //     if (cekEmailUser) {
  //       return res.status(400).json({
  //         message: "Email sudah terdaftar!",
  //       });
  //     }
  //     if (password.length <= 8 && confirmPassword.length <= 8) {
  //       return res.status(400).json({
  //         message: "Password harus minimal 8 karakter",
  //       });
  //     }
  //     const hashPassword = bcrypt.hashSync(password, 10);

  //     const defaultProfileImage =
  //       jenisKelamin === "pria" ? "men.svg" : "women.svg";

  //     const result = await cloudinary.uploader.upload(
  //       path.join(__dirname, "../images", defaultProfileImage),
  //       { resource_type: "auto" }
  //     );

  //     const dataUsers = await User.create({
  //       nama,
  //       jenisKelamin,
  //       email,
  //       password: hashPassword,
  //       profileImage: result.secure_url,
  //       role,
  //       noHp,
  //       bio,
  //     });

  //     res.status(200).json({
  //       message: "Register Berhasil",
  //       dataUsers,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).send(error.message);
  //   }
  // },
};
