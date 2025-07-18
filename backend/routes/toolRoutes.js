const express = require('express');
const router = express.Router();
const {
  formatJson,
  getAllJsonRecords,
  encodeBase64,
  decodeBase64
} = require('../controllers/toolController');

// Routes
router.post('/format-json', formatJson);
router.get('/json-records', getAllJsonRecords); 
router.post('/encode', encodeBase64);
router.post('/decode', decodeBase64);

module.exports = router;
