
const express = require('express');
const router = express.Router();
const db = require('../db'); 

// Get all transactions
router.get('/', (req, res) => {
  db.all('SELECT * FROM transactions', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ transactions: rows });
  });
});


// Add a new transaction
router.post('/', (req, res) => {
  const { type, amount, description, date } = req.body;
  db.get('SELECT balance FROM transactions ORDER BY id DESC LIMIT 1', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    let balance = row ? row.balance : 0;
    const numericAmount = parseFloat(amount); 
    balance = type === 'Credit' ? balance + numericAmount : balance - numericAmount;

    const sql = `INSERT INTO transactions (type, amount, description, date, balance) VALUES (?, ?, ?, ?, ?)`;
    const params = [type, amount, description, date, balance];

    db.run(sql, params, function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ transaction_id: this.lastID });
    });
  });
});


module.exports = router;
