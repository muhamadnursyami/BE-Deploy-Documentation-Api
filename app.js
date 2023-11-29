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

// Midlleware
app.use(cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ROUTES
app.use(allRoutes);

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
