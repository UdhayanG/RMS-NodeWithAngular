const db = require('../../../_helpers/db');
const messageProperties=require('../../../message_properties/message.properties');

const connection=require('../../../_helpers/getdbconnection');
const { Sequelize,QueryTypes } = require('sequelize');
const config = require('../../../config.json');
const mysql = require('mysql2/promise');


module.exports = {
    
    addPermissionSetPermi,
    modifyPermissionSetPermi,
    inactivePermissionSetPermi,
    
    
};


async function addPermissionSetPermi(permisetPermidetails, origin) {
    const permissionSetPermi = new db.permissionSet(permisetPermidetails);  
    const userObject = await db.User.findOne({ where: { UserID: permisetPermidetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permisetPermidetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    if(!(roleObject.RoleDesc=== messageProperties.MainAdmin)) throw messageProperties.PermissionDenied;
    
    const permiObj= JSON.parse(JSON.stringify(permisetPermidetails.PermissionIDs));

    for (item in permiObj) {
           const { host, port, user, password, database } = config.database;
           const sequelize=new Sequelize(database, user, password, { dialect: 'mysql' });
           await sequelize.query("INSERT INTO `PermiSet_Permi`(`PermiSetID`, `PermissionID`) VALUES ("+permisetPermidetails.PermiSetID+","+permiObj[item]+")",{ type:Sequelize.QueryTypes.INSERT});
      
    }  
}
async function modifyPermissionSetPermi(permisetPermidetails, origin) {
    // create Permission object
    const userObject = await db.User.findOne({ where: { UserID: permisetPermidetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permisetPermidetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
           const { host, port, user, password, database } = config.database;
           const sequelize=new Sequelize(database, user, password, { dialect: 'mysql' });
           await sequelize.query("SELECT `PermiSetID`, `PermissionID` FROM `PermiSet_Permi` WHERE PermiSetID = "+permisetPermidetails.PermiSetID,{ type:Sequelize.QueryTypes.SELECT})
           .then(async function(permiSetPermiObject) {
                if(permiSetPermiObject<=0) throw "PermissionSet not available please create a new one";
                sequelize.query("DELETE FROM `PermiSet_Permi` WHERE PermiSetID = "+permisetPermidetails.PermiSetID,{ type:Sequelize.QueryTypes.DELETE});
                const permiObj= JSON.parse(JSON.stringify(permisetPermidetails.PermissionIDs));
                for (item in permiObj) {
                    await sequelize.query("INSERT INTO `PermiSet_Permi`(`PermiSetID`, `PermissionID`) VALUES ("+permisetPermidetails.PermiSetID+","+permiObj[item]+")",{ type:Sequelize.QueryTypes.INSERT});
                }  
           });
}

async function inactivePermissionSetPermi(permisetPermidetails, origin) {
    // create Permission object
    const userObject = await db.User.findOne({ where: { UserID: permisetPermidetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permisetPermidetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    const { host, port, user, password, database } = config.database;
    const sequelize=new Sequelize(database, user, password, { dialect: 'mysql' });
    await sequelize.query("SELECT `PermiSetID`, `PermissionID` FROM `PermiSet_Permi` WHERE PermiSetID = "+permisetPermidetails.PermiSetID,{ type:Sequelize.QueryTypes.SELECT})
    .then(async function(permiSetPermiObject) {
         if(permiSetPermiObject<=0) throw "PermissionSet not available please create a new one";
         sequelize.query("DELETE FROM `PermiSet_Permi` WHERE PermiSetID = "+permisetPermidetails.PermiSetID,{ type:Sequelize.QueryTypes.DELETE});
        });
        
}



