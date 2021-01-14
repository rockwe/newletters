const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contacts');


router.post('/create', contactController.create);


module.exports = router;
