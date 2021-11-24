const express = require('express');
const router = express.Router();
//const Joi = require('joi');
const permissionService = require('./permission.service');
//const { ConditionalExpr } = require('@angular/compiler');
const messageProperties=require('../../message_properties/message.properties');
// routes

//router.post('/registeremail', registerSchema, register);
router.post('/addpermission',  addPermission);
router.post('/modifypermission',  modifyPermission);
router.post('/deletepermission',  inactivePermission);



module.exports = router;

function addPermission(req, res, next) {
    permissionService.addPermission(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionAddSuccess }))
        .catch(next);
}

function modifyPermission(req, res, next) {
    permissionService.modifyPermission(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionModifySuccess }))
        .catch(next);
}

function inactivePermission(req, res, next) {
    permissionService.inactivePermission(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionDeleteSuccess }))
        .catch(next);
}

