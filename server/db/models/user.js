const Sequelize = require('sequelize');
const db = require('../databse');

const User = db.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNulll: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = User;
