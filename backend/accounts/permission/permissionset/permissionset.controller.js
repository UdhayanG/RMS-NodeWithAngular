const express = require('express');
const router = express.Router();
//const Joi = require('joi');
const permissionService = require('./permissionset.service');
//const { ConditionalExpr } = require('@angular/compiler');
const messageProperties=require('../../../message_properties/message.properties');
// routes

//router.post('/registeremail', registerSchema, register);
router.post('/addpermissionset',  addPermissionSet);
router.post('/modifypermissionset',  modifyPermissionSet);
router.post('/deletepermissionset',  inactivePermissionSet);



module.exports = router;

function addPermissionSet(req, res, next) {
    permissionService.addPermissionSet(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionSetAddSuccess }))
        .catch(next);
}

function modifyPermissionSet(req, res, next) {
    permissionService.modifyPermissionSet(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionSetModifySuccess }))
        .catch(next);
}

function inactivePermissionSet(req, res, next) {
    permissionService.inactivePermissionSet(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.PermissionSetDeleteSuccess }))
        .catch(next);
}

