'use strict';
const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/',(req,res,next) => {
  req.session.destroy();
  console.log(res.locals.username);
  res.redirect('/');
});

module.exports = router;