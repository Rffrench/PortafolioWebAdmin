// Rutas Admin
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/customers', adminController.getCustomers);

router.put('/customers/:userId', adminController.putCustomer);

module.exports = router;