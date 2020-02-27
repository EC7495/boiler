const Sequelize = require('sequelize');
const package = require('../../package.json');
const dbName = process.env.NODE_ENV === 'test' ? 'test' : package.name;
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:3000/${dbName}`;

const db = new Sequelize(dbUrl, {
  logging: false
});

module.exports = db;
