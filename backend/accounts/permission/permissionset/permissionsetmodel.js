const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        PermiSetID: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
        PermiSetDesc: { type: DataTypes.STRING, allowNull: false }      
      
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false           
    };


    

    return sequelize.define('PermissionSets', attributes,options);
}