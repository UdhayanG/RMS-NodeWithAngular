const express = require('express');
const router = express.Router();
//const Joi = require('joi');
const applicationService = require('./application.service');
//const { ConditionalExpr } = require('@angular/compiler');
const messageProperties=require('../../message_properties/message.properties');
// routes

//router.post('/registeremail', registerSchema, register);
router.post('/addapplication',  addApplication);
router.post('/modifyapplication',  modifyApplication);
router.post('/deleteapplication',  inactiveApplication);



module.exports = router;

function addApplication(req, res, next) {
    applicationService.addApplication(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.ApplicatioAddSuccess }))
        .catch(next);
}

function modifyApplication(req, res, next) {
    applicationService.modifyApplication(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.ApplicatioModifySuccess }))
        .catch(next);
}

function inactiveApplication(req, res, next) {
    applicationService.inactiveApplication(req.body, req.get('origin'))
        .then(() => res.json({ message: messageProperties.ApplicatioDeleteSuccess }))
        .catch(next);
}

