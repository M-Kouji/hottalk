'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Op } = require('sequelize');
const session = require('express-session');
var message = null;

router.get('/',(req,res,next) => {
  res.render('signup.pug',{msg: message});
  User.findAll().then((user)=>{
    user.forEach(users => {
      console.log(`ID:${users.userId}　Name:${users.username} Pass:${users.password}\n`);
    });
  })
});

router.post('/',(req,res,next) => {
  if(req.body.user_name && req.body.password){
    User.create({//passwordはあとでbscrypt
      username: req.body.user_name,
      password: req.body.password
    }).then(() => {
      User.findAll({
        where: {
          username: req.body.user_name
        }
      }).then(user => {
        if(user){
          req.session.username = req.body.user_name;
          req.session.userId = user[0].userId;
          message = null;
          res.redirect('/signup');
        } else {
          message = 'error';
          errorDisplay(req,res);
        }
      }).catch(error =>{
        message = 'error';
        errorDisplay(req,res);
      });
    }).catch(error => {
      message = 'このユーザー名はすでに使われています';
      errorDisplay(req,res);
    });
  } else {
    message = '空欄を埋めてください!!';
    errorDisplay(req,res);
  }
});

const errorDisplay = (req,res) => {
  res.redirect('/signup');
  req.session.destroy();
};

module.exports = router;