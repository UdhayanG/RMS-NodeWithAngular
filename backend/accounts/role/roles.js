const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        RoleID: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
        RoleDesc: { type: DataTypes.STRING, allowNull: false },
       // RoleStatus: { type: DataTypes.INTEGER, allowNull: false }         
        };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false           
    };


    

    return sequelize.define('Roles', attributes,options);
}