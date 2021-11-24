const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        PermissionID: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
        PermissionDesc: { type: DataTypes.STRING, allowNull: false },      
        //PermissionStatus: { type: DataTypes.INTEGER, allowNull: false } 
      
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false           
    };


    

    return sequelize.define('Permissions', attributes,options);
}