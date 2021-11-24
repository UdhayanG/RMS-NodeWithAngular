const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    const queryInterface = sequelize.getQueryInterface();


      // init models and add them to the exported db object
   // db.Account = require('../accounts/account.model')(sequelize);
   // db.RefreshToken = require('../accounts/refresh-token.model')(sequelize);
    db.User = require('../accounts/usermodels/usermodel')(sequelize);
    db.Address = require('../accounts/usermodels/addressmodel')(sequelize);
    db.userAddress = require('../accounts/usermodels/addressmodeluser')(sequelize);
    db.countryModel = require('../accounts/usermodels/countrymodel')(sequelize);
    db.Login = require('../accounts/usermodels/loginmodel')(sequelize);
    db.loginType = require('../accounts/usermodels/logintypemodel')(sequelize);
    db.loginModel = require('../accounts/usermodels/logoinusermodel')(sequelize);    
    db.phoneType = require('../accounts/usermodels/phonetypemodel')(sequelize);
    db.Phone = require('../accounts/usermodels/phonemodel')(sequelize);
    db.phoneUser = require('../accounts/usermodels/phonemodeluser')(sequelize);
    db.Email = require('../accounts/usermodels/emailmodel')(sequelize);
    db.emailUser = require('../accounts/usermodels/emailuser')(sequelize);
    
    //roles and permissions models
    db.Application=require('../accounts/application/applicationmodel')(sequelize);
    db.appUserPermissions=require('../accounts/generalmodels/appuserpermissionmodel')(sequelize);
    db.appRolePermissions=require('../accounts/generalmodels/approlepermissionmodel')(sequelize);
    db.Permissions=require('../accounts/permission/permissionmodel')(sequelize);
    db.permissionSet=require('../accounts/permission/permissionset/permissionsetmodel')(sequelize);
    //db.permissionSetPermi=require('../accounts/permission/permissonsetpermi/permissionsetpermi')(sequelize);
    db.Roles=require('../accounts/role/roles')(sequelize);
    
    
    //db.countryModel = require('../accounts/usermodels/phonemodeemailmodelluser')(sequelize);       
    

    // define relationships

//     db.Permissions.hasOne(db.permissionSetPermi,{
//     name:'sssssss',
//     foreignKey: 'PermissionID',
//     onDelete:'RESTRICT',
//     onUpdate:'RESTRICT'
//   }
// )
//db.queryInterface.query("ALTER TABLE `PermiSet_Permi`ADD CONSTRAINT `PermiSetPermi_PermiID_Permissions_PermiID` FOREIGN KEY (`PermissionID`) REFERENCES `Permissions` (`PermissionID`),ADD CONSTRAINT `PermiSetPermi_PrmiSetID_PermiSet_PermiSetID` FOREIGN KEY (`PermiSetID`) REFERENCES `PermissionSets` (`PermiSetID`);");



// db.queryInterface.addConstraint(db.permissionSetPermi, {
//   fields: ['PermissionID'],
//   type: 'foreign key',
//   name: 'PermiSetPermi_PermiID_Permissions_PermiID',
//   references: { //Required field
//     table:  db.Permissions,
//     field: 'PermissionID'
//   },
//   onDelete: 'RESTRICT',
//   onUpdate: 'RESTRICT'
// });


   

    //db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
   // db.RefreshToken.belongsTo(db.Account);
   //db.User.hasMany()


    
    
    // sync all models with database
    await sequelize.sync();
}