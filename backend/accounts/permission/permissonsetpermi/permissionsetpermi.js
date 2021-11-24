const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        PermiSetID: { type: DataTypes.INTEGER, allowNull: false,primaryKey: true },
        PermissionID: { type: DataTypes.INTEGER, allowNull: false,primaryKey: true }      
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        indexes:[
            {
              name:'PermiSetPermi_PermiID_Permissions_PermiID',
              unique: false,
              fields:['PermissionID']
             
            }
           ],
        timestamps: false           
    };


    

    return sequelize.define('PermiSet_Permi', attributes,options);
}