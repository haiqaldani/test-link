const db = require("../../models");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const payload = req.body;

  // Save User to Database
  try {
    const user = await db.User.create({
      username: payload.username,
      name: payload.name,
      role: payload.role,
      password: bcrypt.hashSync(payload.password, 8),
    });

    res.status(200).json({
      metadata: {
        path: req.originalUrl,
        http_status_code: 200,
        http_status: "Success Register",
        timestamp: new Date().getTime(),
      },
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      metadata: {
        path: req.originalUrl,
        http_status_code: 500,
        http_status: "Sign Up Failed",
        timestamp: new Date().getTime(),
      },
      message: error.message,
    });
  }
};
