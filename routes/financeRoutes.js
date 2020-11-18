// Rutas Admin
const express = require('express');
const router = express.Router();

const financeController = require('../controllers/financeController');


router.get('/income/dates', financeController.getIncomeDates);
router.get('/income/:month/:year', financeController.getDailyIncome);


module.exports = router;