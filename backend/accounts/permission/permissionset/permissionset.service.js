const db = require('../../../_helpers/db');
const messageProperties=require('../../../message_properties/message.properties');

module.exports = {
    
    addPermissionSet,
    modifyPermissionSet,
    inactivePermissionSet,
    
    
};

async function addPermissionSet(permisetdetails, origin) {
    // create Permission object
    const permissionSet = new db.permissionSet(permisetdetails);  
    const userObject = await db.User.findOne({ where: { UserID: permisetdetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permisetdetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    if(!(roleObject.RoleDesc=== messageProperties.MainAdmin)) throw messageProperties.PermissionDenied;
        //permission.PermissionStatus=1;
        permissionSet.save();
   
}
async function modifyPermissionSet(permisetdetails, origin) {
    // create Permission object
    const userObject = await db.User.findOne({ where: { UserID: permisetdetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permisetdetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    const permissionSetObject = await db.permissionSet.findOne({ where: { PermiSetID: permisetdetails.PermiSetID} });
    if(!permissionSetObject) throw messageProperties.PermissionSetObjNotExists;
     console.log("upadate================>");
     Object.assign(permissionSetObject, permisetdetails);
     await permissionSetObject.save();  
}

async function inactivePermissionSet(permisetdetails, origin) {
    // create Permission object
    const userObject = await db.User.findOne({ where: { UserID: permisetdetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permisetdetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    const permissionSetObject = await db.permissionSet.findOne({ where: { PermiSetID: permisetdetails.PermiSetID} });
    if(!permissionSetObject) throw messageProperties.PermissionSetObjNotExists;
    //permissionObject.PermissionStatus=0;
    permissionSetObject.destroy({
        where: {
            PermiSetID: permisetdetails.PermiSetID
        }
    })
  //  await permissionObject.save();  
}



