'use strict';
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Comment = require('../models/comment');
const session = require('express-session');

router.get('/:themeId',(req,res,next) => {
  if(req.params.themeId == 'rikei' || req.params.themeId == 'bunkei' ||req.params.themeId == 'other'){
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
        res.render('talk.pug',{comments: comment,themeId: req.params.themeId});
      } else {
        console.log(`${req.params.themeId}  errorComment1`);
        res.render('talk.pug',{themeId: req.params.themeId});
      }
    }).catch(error => {
      console.log(`${req.params.themeId}  errorComment2`);
      res.render('talk.pug',{themeId: req.params.themeId});
    });
  } else {
    const err = new Error('themeId do not exist');
    err.statusCode = 400;
    next(err);
  }
});

router.post('/:themeId',(req,res,next) => {
  console.log(`${req.params.themeId}です`);
  const saidAt = new Date();
  Comment.create({
    content: req.body.comment.slice(0,255),
    saidById: req.session.userId,
    themeId: req.params.themeId,
    updateAt: saidAt
  }).then(()=>{
    res.redirect(`/talk/${req.params.themeId}`);
  });
});

module.exports = router;



