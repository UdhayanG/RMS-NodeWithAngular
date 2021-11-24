const db = require('../../_helpers/db');
const messageProperties=require('../../message_properties/message.properties');

module.exports = {
    
    addApplication,
    modifyApplication,
    inactiveApplication,
    
    
};


async function addApplication(appdetails, origin) {
    // create Application object
    const application = new db.Application(appdetails);  
    const userObject = await db.User.findOne({ where: { UserID: appdetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:appdetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    if(roleObject.RoleDesc=== messageProperties.MainAdmin){
      //  application.AppStatus=1;
        application.save(); }  
   
}

async function modifyApplication(appdetails, origin) {
    // create User object
    const userObject = await db.User.findOne({ where: { UserID: appdetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:appdetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    const applicationObject = await db.Application.findOne({ where: { AppID: appdetails.AppID } });
    if(!applicationObject) throw messageProperties.ApplicationObjNotExists;
     console.log("upadate================>");
     Object.assign(applicationObject, appdetails);
     await applicationObject.save();  
}

async function inactiveApplication(appdetails, origin) {
    // create User object
    const userObject = await db.User.findOne({ where: { UserID: appdetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:appdetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    const applicationObject = await db.Application.findOne({ where: { AppID: appdetails.AppID} });
    if(!applicationObject) throw messageProperties.ApplicationObjNotExists;
   // applicationObject.AppStatus=0;
   // await applicationObject.save();  
   applicationObject.destroy({
       where:{
        AppID: appdetails.AppID
       }
   })
}



