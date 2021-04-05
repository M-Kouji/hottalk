'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Comment = loader.database.define(
  'comments',
  {
    commnetId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    saidBy: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    themaId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    updateBy: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ['themaId']
      }
    ]
  }
);

module.exports = Comment;