const db = require('../../_helpers/db');
const messageProperties=require('../../message_properties/message.properties');

module.exports = {
    
    addPermission,
    modifyPermission,
    inactivePermission,
    
    
};


async function addPermission(permidetails, origin) {
    // create Permission object
    const permission = new db.Permissions(permidetails);  
    const userObject = await db.User.findOne({ where: { UserID: permidetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permidetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    if(!(roleObject.RoleDesc=== messageProperties.MainAdmin)) throw messageProperties.PermissionDenied;
        //permission.PermissionStatus=1;
        permission.save();
   
}
async function modifyPermission(permidetails, origin) {
    // create Permission object
    const userObject = await db.User.findOne({ where: { UserID: permidetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permidetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    const permissionObject = await db.Permissions.findOne({ where: { PermissionID: permidetails.PermissionID} });
    if(!permissionObject) throw messageProperties.PermissionObjNotExists;
     console.log("upadate================>");
     Object.assign(permissionObject, permidetails);
     await permissionObject.save();  
}

async function inactivePermission(permidetails, origin) {
    // create Permission object
    const userObject = await db.User.findOne({ where: { UserID: permidetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    const roleObject =await db.Roles.findOne({where:{RoleID:permidetails.RoleID}})
    if(!roleObject) throw messageProperties.PermissionDenied;
    const permissionObject = await db.Permissions.findOne({ where: { PermissionID: permidetails.PermissionID} });
    if(!permissionObject) throw messageProperties.PermissionObjNotExists;
    //permissionObject.PermissionStatus=0;
    permissionObject.destroy({
        where: {
            PermissionID: permidetails.PermissionID
        }
    })
  //  await permissionObject.save();  
}



