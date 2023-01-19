const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");

verifyToken = (req, res, next) => {
  let token = req.headers.token;

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  console.log(req.userId);
  try {
    const user = await db.User.findByPk(req.userId);

    if (user.role === "admin") {
      return next();
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
