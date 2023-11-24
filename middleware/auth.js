require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      throw new Error("Invalid header");
    }
    const token = header.split(" ")[1];
    if (!token) throw new Error("Authentication invalid");

    const payload = jwt.verify(token, process.env.JWT_KEY);
    req.user = {
      role: payload.role,
    };
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      // Token tidak valid
      return res.status(401).json({ error: "Invalid token" });
    } else {
      // Kesalahan lainnya
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        res.status(400).json({ error: "Unauthorized to access this route" });
      }
      next();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
};

module.exports = { verifyToken, authorizeRoles };
