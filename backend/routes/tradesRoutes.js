const express = require('express');
const axios = require('axios');
const parseTradesData = require('../middlewares/parseTradesData');

const router = express.Router();

// Fetch and parse trade data
router.get('/trades', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/trades'); // Example URL
    req.body = response.data;  // Attach raw data to request
    parseTradesData(req, res, () => {  // Middleware for parsing
      res.json(req.parsedData); // Send back parsed data
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trade data', error });
  }
});

module.exports = router;
