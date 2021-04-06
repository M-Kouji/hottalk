'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const Comment = loader.database.define(
  'comments',
  {
    commentId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false
    },
    saidById: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    themeId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    updateAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        fields: ['themeId']
      }
    ]
  }
);

module.exports = Comment;