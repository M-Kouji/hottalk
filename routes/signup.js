'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { Op } = require('sequelize');
const session = require('express-session');
const bcrypt = require('bcrypt');
const csrf = require('csurf');
const csrfProtection = csrf({cookie: true});
var message = null;


router.get('/',csrfProtection,(req,res,next) => {
  res.render('signup.pug',{msg: message,csrfToken: req.csrfToken()});
  User.findAll().then((user)=>{
    user.forEach(users => {
      console.log(`ID:${users.userId}　Name:${users.username} Pass:${users.password}\n`);
    });
  })
});

router.post('/',csrfProtection,(req,res,next) => {
  if(req.body.user_name && req.body.password){
    bcrypt.hash(req.body.password, 10, (error,hash) => {
      User.create({
        username: req.body.user_name,
        password: hash
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
            res.redirect('/theme');
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