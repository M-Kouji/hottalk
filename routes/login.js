'usestrict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Op } = require('sequelize');
const session = require('express-session');
var message = null;
const error_message = 'ユーザー名もしくはパスワードが間違っています';

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
  console.log(`入力したのは${req.body.password}`);
  if(req.body.user_name && req.body.password){
    User.findAll({
      where: {
        username: req.body.user_name
      }
    }).then(user => {
      console.log(`取得したのは${user.password}`);
      if(user){
        if(req.body.password === user[0].password){
          message = `ようこそ ${req.body.user_name} さん`;
          req.session.userId = user[0].userId;
          req.session.username = req.body.user_name;
          res.redirect('/login');
        } else {
          message = error_message;
          res.redirect('/login');
        }
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