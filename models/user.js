const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, "Nama lengkap harus diisi"],
  },
  jenisKelamin: {
    type: String,
    enum: ["pria", "wanita"],
    required: [true, "Jenis kelamin harus diisi"],
  },
  email: {
    type: String,
    required: [true, "Email harus diisi"],
  },
  password: {
    type: String,
    // minlength: [8, "Minimal 8 Karakter"],  tidak dipakai, tetapi handle di controller
    required: [true, "Password harus diisi"],
  },
  profileImage: {
    type: String,
  },
  noHp: {
    type: String,
  },
  bio: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
