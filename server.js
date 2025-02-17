const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const tradesRoutes = require('./backend/routes/tradesRoutes');
const insiderTradingRoutes = require('./backend/routes/insiderTradingRoutes');
const fetchAllData = require('./backend/utils/fetchAllData');
const secRoutes = require('./backend/routes/secRoutes');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', tradesRoutes);
app.use('/api', insiderTradingRoutes);
app.use('/api', secRoutes);

// Endpoint to fetch all data concurrently
app.get('/api/all-data', async (req, res) => {
  try {
    const data = await fetchAllData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all data', error });
  }
});

app.get('/api/trades', async (req, res) => {
    const testData = [
        {
          id: "1",
          person: "John Doe",
          stock: "AAPL",
          trade_type: "Buy",
          quantity: 100,
          price: 150.25,
          date: "2025-02-16"
        },
        {
          id: "2",
          person: "Jane Smith",
          stock: "TSLA",
          trade_type: "Sell",
          quantity: 50,
          price: 950.75,
          date: "2025-02-15"
        },
        {
          id: "3",
          person: "Alice Johnson",
          stock: "GOOGL",
          trade_type: "Buy",
          quantity: 200,
          price: 2735.50,
          date: "2025-02-14"
        },
        {
          id: "4",
          person: "Bob Brown",
          stock: "AMZN",
          trade_type: "Sell",
          quantity: 10,
          price: 3450.60,
          date: "2025-02-13"
        },
        {
          id: "5",
          person: "Charlie Davis",
          stock: "MSFT",
          trade_type: "Buy",
          quantity: 150,
          price: 290.30,
          date: "2025-02-12"
        }
      ];
  
  res.json(testData);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
