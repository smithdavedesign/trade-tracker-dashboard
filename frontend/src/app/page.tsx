// Add this directive at the top of the file
"use client"; 

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Trade {
  id: string;
  person: string;
  stock: string;
  trade_type: string;
  quantity: number;
  price: number;
  date: string;
}

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const response = await axios.get('http://localhost:5000/api/trades');
      setTrades(response.data);
    };

    fetchTrades();
  }, []);

  return (
    <div>
      <h2>Recent Insider Trades</h2>
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th>Stock</th>
            <th>Trade Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade) => (
            <tr key={trade.id}>
              <td>{trade.person}</td>
              <td>{trade.stock}</td>
              <td>{trade.trade_type}</td>
              <td>{trade.quantity}</td>
              <td>{trade.price}</td>
              <td>{trade.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
