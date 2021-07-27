const express = require('express');
const router = express.Router();

const mailController = require('../controllers/mails');
const newletterinovController = require('../controllers/newletterInov');



router.post('/create', mailController.create);
router.post('/inov/create', newletterinovController.create);
router.delete('/:id', mailController.delete);
router.patch('/:id', mailController.update);

module.exports = router;
