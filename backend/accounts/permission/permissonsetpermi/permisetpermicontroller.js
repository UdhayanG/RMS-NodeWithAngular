const express = require('express');
const router = express.Router();
//const Joi = require('joi');
const permissionSetPermiService = require('./permisetpermiservice');
//const { ConditionalExpr } = require('@angular/compiler');
const messageProperties=require('../../../message_properties/message.properties');
// routes

//router.post('/registeremail', registerSchema, register);
router.post('/addpermissionsetpermi',  addPermissionSetPermi);
router.post('/modifypermissionsetpermi',  modifyPermissionSetPermi);
router.post('/deletepermissionsetpermi',  inactivePermissionSetPermi);



module.exports = router;

function addPermissionSetPermi(req, res, next) {
    permissionSetPermiService.addPermissionSetPermi(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionSetPermiAddSuccess }))
        .catch(next);
}

function modifyPermissionSetPermi(req, res, next) {
    permissionSetPermiService.modifyPermissionSetPermi(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionSetPermiModifySuccess }))
        .catch(next);
}

function inactivePermissionSetPermi(req, res, next) {
    permissionSetPermiService.inactivePermissionSetPermi(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionSetPermiDeleteSuccess }))
        .catch(next);
}

