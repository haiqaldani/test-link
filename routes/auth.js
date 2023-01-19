const express = require('express');
const router = express.Router();

const authHandler = require('../apis/auth');

router.get('/', function( req, res, next ) {
  res.status(200).json({
    message: "Hello from Auth"
  })
});

router.post('/login', authHandler.login);
router.post('/sign-up', authHandler.signup);

module.exports = router;
