const parseData = require('../utils/parseData');

const parseInsiderData = (req, res, next) => {
  const rawData = req.body;

  // Define the mapping for insider trading data fields
  const insiderMappings = {
    id: 'id',
    person: 'name',
    stock: 'companyTicker',
    trade_type: 'transactionType',
    quantity: 'quantity',
    price: 'price',
    date: 'date',
  };

  req.parsedData = parseData(rawData, insiderMappings);  // Use the utility function to parse data
  next();
};

module.exports = parseInsiderData;
