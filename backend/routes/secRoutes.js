const express = require('express');
const { queryApi } = require('sec-api');
require('dotenv').config();  // Load environment variables from .env file

// Load the SEC API token from the .env file
const apiKey = process.env.SEC_API_TOKEN;

const router = express.Router();

if (!apiKey) {
  throw new Error('API key is missing in the .env file');
}

queryApi.setApiKey(apiKey);  // Set the API key for sec-api

// Define the route to fetch filings
router.get('/filings', async (req, res) => {
  const query = {
    query: 'formType:"10-Q"',  // Adjust this query as per your need
    from: '0',  // Start with the first filing (used for pagination)
    size: '10',  // Limit the results to 10 filings
    sort: [{ filedAt: { order: 'desc' } }],  // Sort results by filedAt in descending order
  };

  try {
    // Fetch filings using the SEC API
    const filings = await queryApi.getFilings(query);
    
    // Send the fetched filings as a JSON response
    res.json(filings);
  } catch (error) {
    console.error('Error fetching filings:', error);
    res.status(500).json({ error: 'Failed to fetch filings' });
  }
});

// Define the route to fetch Form 13D/13G filings
router.get('/insider-trading', async (req, res) => {
    const url = 'https://api.sec-api.io/form-13d-13g';
    const query = {
      cik: '0000315090', // Warren Buffett's CIK
      query: 'formType:("SC 13D" OR "SC 13G")',
      from: '0',
      size: '10',
      sort: [{ filedAt: { order: 'desc' } }]
    };
  
  
    try {
      const filings = await queryApi.getFilings(query);
      res.json(filings);
    } catch (error) {
      console.error('Error fetching filings:', error);
      res.status(500).json({ error: 'Failed to fetch filings' });
    }
  });


  router.get('/warren-buffett-filings', async (req, res) => {
    try {
      const query = {
        query: 'cik:"0001067983" AND (formType:"SC 13D" OR formType:"SC 13G")',
        from: '0',
        size: '50',
        sort: [{ filedAt: { order: 'desc' } }]
      };
  
      const filings = await queryApi.getFilings(query);
  
      if (filings && filings.filings && filings.filings.length > 0) {
        res.json(filings);
      } else {
        res.status(404).json({ message: 'No SC 13D/13G filings found for Warren Buffett.' });
      }
    } catch (error) {
      console.error('Error fetching filings:', error);
      res.status(500).json({ message: 'Error fetching filings', error });
    }
  });

module.exports = router;

