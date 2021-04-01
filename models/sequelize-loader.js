'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/talk_arranger'
);

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};