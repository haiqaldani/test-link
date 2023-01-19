const express = require('express');
const router = express.Router();

const productHandler = require('../apis/product');
const { verifyToken, isAdmin } = require('../middlewares/authJwt');

router.get('/', function( req, res, next ) {
  res.status(200).json({
    message: "Hello from Product"
  })
});

router.post('/create', [verifyToken, isAdmin], productHandler.addProduct);
router.post('/delete', productHandler.deleteProduct);

module.exports = router;
