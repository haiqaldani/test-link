const db = require("../../models");
const config = require("../../config/auth.config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const payload = req.body;

  try {
    const user = await db.User.findOne({
      where: {
        username: payload.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      payload.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    // req.session.token = token;

    return res.status(200).json({
      metadata: {
        path: req.originalUrl,
        http_status_code: 200,
        http_status: "Success Login",
        timestamp: new Date().getTime(),
      },
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
