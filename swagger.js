const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation Literasi Kita FS-22",
      version: "1.0.0",
      description: "API documentation Literasi Kita FS-22",
    },
    servers: [
      {
        url: "https://fantastic-clam-tam.cyclic.app", // Change this according to your server configuration
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
