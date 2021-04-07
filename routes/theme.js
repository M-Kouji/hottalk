'use strict';
const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) => {
  res.render('theme.pug');
});

module.exports = router;