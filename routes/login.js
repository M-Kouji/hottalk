'usestrict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Op } = require('sequelize');
const session = require('express-session');
const error_message = 'ユーザー名もしくはパスワードが間違っています';
const bcrypt = require('bcrypt');
var message = null;

router.get('/',(req,res,next)=>{
  res.render('login.pug',{mes: message})
  console.log(message);
  User.findAll().then((user)=>{
    user.forEach(users => {
      console.log(`ID:${users.userId}　Name:${users.username} Pass:${users.password}\n`);
    });
  })
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
      console.log('error処理');
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
};

module.exports = router;