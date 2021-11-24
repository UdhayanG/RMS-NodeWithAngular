const db = require('../../_helpers/db');
const messageProperties=require('../../message_properties/message.properties');

module.exports = {
    
    addRole,
    modifyRole,
    inactiveRole,
    
    
};


async function addRole(roledetails, origin) {
    // create Role object
        const role = new db.Roles(roledetails);  
        const userObject = await db.User.findOne({ where: { UserID: roledetails.UserID } });
        if(!userObject) throw messageProperties.UserNotFound;       
        if(roledetails.RollName=== messageProperties.MainAdmin){
          //  role.RoleStatus=1;
            await role.save();
        }
        if(!(roledetails.RollName=== messageProperties.MainAdmin)){ throw messageProperties.PermissionDenied;}         
      
}
async function modifyRole(roledetails, origin) {
    // create Permission object RoleStatus   
       // const role = new db.Roles(roledetails);   
        const userObject = await db.User.findOne({ where: { UserID: roledetails.UserID } });
        if(!userObject) throw messageProperties.UserNotFound;   
        if(roledetails.RollName=== messageProperties.MainAdmin){
            const roleObject = await db.Roles.findOne({ where: { RoleID: roledetails.RoleID} });
            if(!roleObject) throw messageProperties.RoleObjNotExists;
            console.log("upadate================>");
            Object.assign(roleObject, roledetails);
            await roleObject.save();  
        }
        if(!(roledetails.RollName=== messageProperties.MainAdmin)){ throw messageProperties.PermissionDenied;} 
      
}

async function inactiveRole(roledetails, origin) {
    // create Permission object
    const userObject = await db.User.findOne({ where: { UserID: roledetails.UserID } });
    if(!userObject) throw messageProperties.UserNotFound;
    if(roledetails.RollName=== messageProperties.MainAdmin){
        const roleObject = await db.Roles.findOne({ where: { RoleID: roledetails.RoleID}});
        if(!roleObject) throw messageProperties.RoleObjNotExists;
       // roleObject.RoleStatus=0;
        //await roleObject.save();  
        roleObject.destroy({
            where :{
                RoleID:roledetails.RoleID

            }
        })
    }
    if(!(roledetails.RollName=== messageProperties.MainAdmin)){ throw messageProperties.PermissionDenied;} 
}



