const models = require("../../models");

module.exports = async (req, res) => {
  const payload = req.body;

  try {
    const product = await models.Product.create(payload, { validate: true });

    return res.json({
      metadata: {
        path: req.originalUrl,
        http_status_code: 200,
        http_status: "Success Created",
        timestamp: new Date().getTime(),
      },
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      metadata: {
        path: req.originalUrl,
        http_status_code: 500,
        http_status: "Create Product Failed",
        timestamp: new Date().getTime(),
      },
      message: err.message,
    });
  }
};
