'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Comment = require('../models/comment');
const session = require('express-session');

router.get('/:themeId',(req,res,next) => {
  Comment.findAll({
    include: [
      {
        model: User,
        attributes: ['userId','username']
      }],
    where: {
      themeId: req.params.themeId
    },
    order: [
      ['commentId','ASC']
    ]
  }).then((comment) => {
    if(comment){
      console.log(comment);
      console.log(req.session.username);
      res.render('talk.pug',{comments: comment,themeId: req.params.themeId});
    } else {
      console.log(`${req.params.themeId}  errorComment1`);
      res.render('talk.pug',{themeId: req.params.themeId});
    }
  }).catch(error => {
    console.log(`${req.params.themeId}  errorComment2`);
    res.render('talk.pug',{themeId: req.params.themeId});
  });
});

router.post('/:themeId',(req,res,next) => {
  console.log(`${req.params.themeId}です`);
  const saidAt = new Date();
  Comment.create({
    content: req.body.comment,
    saidById: req.session.userId,
    themeId: req.params.themeId,
    updateAt: saidAt
  }).then(()=>{
    res.redirect(`/talk/${req.params.themeId}`);
  });
});

module.exports = router;



