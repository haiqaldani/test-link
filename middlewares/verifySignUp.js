const db = require("../models");
const User = db.user;

module.exports = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Username!",
    });
  }
};
