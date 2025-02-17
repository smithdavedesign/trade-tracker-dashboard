const axios = require('axios');

// Function to fetch all the data concurrently
const fetchAllData = async () => {
  try {
    const [tradeResponse, insiderResponse] = await Promise.all([
      axios.get('http://localhost:5000/api/trades'),
      axios.get('http://localhost:5000/api/insider-trading'),
    ]);

    // Parse the data as needed (either use your parsing middleware or do it here)
    const trades = tradeResponse.data;
    const insiders = insiderResponse.data;

    return { trades, insiders };
  } catch (error) {
    console.error('Error fetching all data:', error);
    throw new Error('Error fetching all data');
  }
};

module.exports = fetchAllData;
