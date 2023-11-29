require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db");
const allRoutes = require("./routes");
// check db connection
db.then(() => {
  console.log("berhasil connect ke MongoDB");
}).catch(() => {
  console.log("gagal connect ke MonggoDB");
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// Midlleware
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Sementara gini dulu 
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ROUTES
app.use(allRoutes);

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
