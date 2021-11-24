const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        AppID: {type: DataTypes.INTEGER,allowNull: false},
        RoleID: { type: DataTypes.INTEGER, allowNull: false },
        PermissionID: { type: DataTypes.INTEGER, allowNull: false },
      
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false           
    };


    

    return sequelize.define('App_Role_Permissions', attributes,options);
}