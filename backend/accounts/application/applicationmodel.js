const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        AppID: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
        AppDesc: { type: DataTypes.STRING, allowNull: false },
        AppTypeID: { type: DataTypes.INTEGER, allowNull: false },
      //  AppStatus: { type: DataTypes.INTEGER, allowNull: false } 
        
      
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false           
    };


    

    return sequelize.define('Applications', attributes,options);
}