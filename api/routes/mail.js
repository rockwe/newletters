const express = require('express');
const router = express.Router();

const mailController = require('../controllers/mails');


router.post('/create', mailController.create);
router.delete('/:id', mailController.delete);
router.patch('/:id', mailController.update);

module.exports = router;
