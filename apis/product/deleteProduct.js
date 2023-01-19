const models = require("../../models");

module.exports = async (req, res) => {
  const payload = req.body;

  try {
    const product = await models.Product.destroy({
        where: {
            id: payload.id
        }
    });

    return res.json({
      metadata: {
        path: req.originalUrl,
        http_status_code: 200,
        http_status: "Success Delete",
        timestamp: new Date().getTime(),
      },
    });
  } catch (err) {
    res.status(500).json({
      metadata: {
        path: req.originalUrl,
        http_status_code: 500,
        http_status: "Delete Product Failed",
        timestamp: new Date().getTime(),
      },
      message: err.message,
    });
  }
};
