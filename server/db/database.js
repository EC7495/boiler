const Sequelize = require('sequelize');
const package = require('../../package.json');
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${'test'}`;
const dbName = package.name;

const db = new Sequelize(dbUrl, {
  logging: false
});

module.exports = db;
