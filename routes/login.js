'usestrict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Op } = require('sequelize');
const session = require('express-session');
const error_message = 'ユーザー名もしくはパスワードが間違っています';
const bcrypt = require('bcrypt');
var message = null;
var flg = 0;

router.get('/',(req,res,next)=>{
  if(flg === 1){
    res.render('login.pug',{mes: message})
    flg = 0;
  } else {
    res.render('login.pug',{mes: null})
  }
});

router.post('/',(req,res,next)=>{
  if(req.body.user_name && req.body.password){
    User.findAll({
      where: {
        username: req.body.user_name
      }
    }).then(user => {
      if(user){
        bcrypt.compare(req.body.password, user[0].password, (error,isEqual) => {
          if(isEqual){
            req.session.userId = user[0].userId;
            req.session.username = req.body.user_name;
            res.redirect('/theme');
          } else {
            errorDisplay(req,res);
          }
        });
      } else {
        errorDisplay(req,res);
      }
    }).catch(error => {
      errorDisplay(req,res);
    });
  } else {
    errorDisplay(req,res);
  }
});

const errorDisplay = (req,res) => {
  message = error_message;
  res.redirect('/login');
  req.session.destroy();
  flg = 1;
};

module.exports = router;