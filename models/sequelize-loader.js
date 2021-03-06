'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/talk_arranger',
  {
    logging: false,
    dialectOptions: {
    ssl: true,
    },
  }
);

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};