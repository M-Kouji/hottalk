var express = require('express');
const User = require('../models/user');
var router = express.Router();
const { Op } = require('sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  console.log('ログテスト');
  // User.upsert({
  //   username: 'test4',
  //   password: 'test4'
  // });
  User.findAll({
    where: {
      userId: {
        [Op.between]: [0,100]
      }
    }
  }).then((Users)=>{
    console.log(Users);
  });
  res.render('index', { title: 'Express' });
});

module.exports = router;