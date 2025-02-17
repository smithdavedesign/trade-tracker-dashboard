const parseData = require('../utils/parseData');

const parseTradesData = (req, res, next) => {
  const rawData = req.body; // Assuming rawData comes from the request body (can be axios response)
  
  // Define the mapping for trade data fields
  const tradeMappings = {
    id: 'transactionId',
    person: 'executiveName',
    stock: 'stockTicker',
    trade_type: 'actionType',
    quantity: 'sharesTraded',
    price: 'pricePerShare',
    date: 'transactionDate',
  };

  req.parsedData = parseData(rawData, tradeMappings);  // Use the utility function to parse data
  next(); // Proceed to the next middleware or route handler
};

module.exports = parseTradesData;
