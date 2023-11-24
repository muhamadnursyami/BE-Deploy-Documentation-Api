const express = require("express");
const route = express.Router();
const uploadRoutes = require("./uploadRoutes");
const videoRoutes = require("./videoRoutes");
const bookRoutes = require("./bukuRoutes");
const authRoutes = require("./authRoutes");

route.get("/", (req, res) => {
  const htmlResponse = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Selamat Datang!</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          overflow: hidden;
          animation: changeBackgroundColor 5s ease-in-out infinite;
        }
  
        h1 {
          color: #FFFFE0;
          text-shadow: 2px 2px 4px #000000;
          animation: changeColor 5s ease-in-out infinite;
        }
  
        @keyframes changeColor {
          0% {
            color: RGB(124, 186, 211);
          }
          50% {
            color: #FFFFE0;
          }
          100% {
            color: RGB(124, 186, 211);
          }
        }
  
        @keyframes changeBackgroundColor {
          0% {
            background-color: #FFFFE0;
          }
          50% {
            background-color: RGB(124, 186, 211);
          }
          100% {
            background-color: #FFFFE0;
          }
        }
      </style>
    </head>
    <body>
      <h1>Selamat Datang 🫠</h1>
    </body>
  </html>
`;
res.send(htmlResponse);
});

route.use("/uploads", uploadRoutes);
route.use("/videos", videoRoutes);
route.use("/books", bookRoutes);
route.use("/auth", authRoutes);
module.exports = route;
