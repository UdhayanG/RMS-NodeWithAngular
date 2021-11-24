const express = require('express');
const router = express.Router();
//const Joi = require('joi');
const roleService = require('./role.service');
//const { ConditionalExpr } = require('@angular/compiler');
const messageProperties=require('../../message_properties/message.properties');
// routes

//router.post('/registeremail', registerSchema, register);
router.post('/addrole',  addRole);
router.post('/modifyrole',  modifyRole);
router.post('/deleterole',  inactiveRole);



module.exports = router;

function addRole(req, res, next) {
    roleService.addRole(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.RoleAddSuccess }))
        .catch(next);
}

function modifyRole(req, res, next) {
    roleService.modifyRole(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.RoleModifySuccess }))
        .catch(next);
}

function inactiveRole(req, res, next) {
    roleService.inactiveRole(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.RoleDeleteSuccess }))
        .catch(next);
}

