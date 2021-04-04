'usestrict';
const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
  res.render('login.pug',{error: null})
});

module.exports = router;