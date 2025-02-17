const express = require('express');
const axios = require('axios');
const parseInsiderData = require('../middlewares/parseInsiderData');

const router = express.Router();

// Fetch and parse insider trading data
router.get('/insider-trading-test', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/insider-trading'); // Example URL
    req.body = response.data;  // Attach raw data to request
    parseInsiderData(req, res, () => {  // Middleware for parsing
      res.json(req.parsedData); // Send back parsed data
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching insider trading data', error });
  }
});

module.exports = router;
