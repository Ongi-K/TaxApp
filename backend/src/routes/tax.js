/*
 * tax.js
 * Defines routes related to tax calculations and export functionality.
 */

const express = require('express');
const router = express.Router();
const taxController = require('../controllers/taxController');

// Route for calculating tax
router.post('/calculate', taxController.calculateTax);
// Route for exporting tax results
router.get('/export', taxController.exportTaxResults);

module.exports = router;
