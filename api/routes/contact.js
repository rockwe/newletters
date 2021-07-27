const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contacts');
const contactInovController = require('../controllers/contactInov');


router.post('/create', contactController.create);
router.post('/inov/create', contactInovController.create);


module.exports = router;
