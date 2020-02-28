if (process.env.NODE_ENV !== 'production') {
  require('../../.secrets');
}

const Sequelize = require('sequelize');
const dbUrl = process.env.DB_URL;

const db = new Sequelize(dbUrl, {
  logging: false
});

module.exports = db;
