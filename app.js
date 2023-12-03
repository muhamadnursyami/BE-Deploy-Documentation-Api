require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./config/db");
const allRoutes = require("./routes");
const { swaggerUi, specs } = require("./swagger");
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

// API DOC
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ROUTES
app.use(allRoutes);

// RUN SERVER
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});
