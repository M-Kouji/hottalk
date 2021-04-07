'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/talk_arranger'
);
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/talk_arranger'
 );

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};