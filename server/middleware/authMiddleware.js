const jwt = require("jsonwebtoken");
const { Admin, User } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check admin first
    let admin = await Admin.findByPk(decoded.id);

    if (admin) {
      req.user = {
        id: admin.id,
        email: admin.email,
        role: "admin",
      };

      return next();
    }

    // Check normal user
    let user = await User.findByPk(decoded.id);

    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        role: "user",
      };

      return next();
    }

    return res.status(401).json({
      message: "Invalid token",
    });

  } catch (error) {
    return res.status(401).json({
      message: "Token verification failed",
    });
  }
};

module.exports = authMiddleware;