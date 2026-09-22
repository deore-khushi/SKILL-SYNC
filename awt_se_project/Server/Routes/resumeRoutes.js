const express = require('express');

const router = express.Router();

const resumeController = require('../controllers/resumeController');

router.get('/', resumeController.getResume);

router.post('/', resumeController.saveResume);

router.put('/', resumeController.saveResume);

router.delete('/', resumeController.deleteResume);

module.exports = router;