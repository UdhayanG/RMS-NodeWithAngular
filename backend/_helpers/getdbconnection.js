const db = require('../_helpers/db')
const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
module.exports = {
    
    getConnection,
  
    
    
};

async function getConnection() {

    const { host, port, user, password, database } = config.database;
   return new Sequelize(database, user, password, { dialect: 'mysql' });
    


}