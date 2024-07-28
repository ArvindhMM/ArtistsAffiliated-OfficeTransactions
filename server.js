const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db'); 

const app = express();
const port = process.env.PORT || 5000; //Backend Runs in Port 5000


app.use(cors()); 
app.use(bodyParser.json());

const transactionsRouter = require('./routes/transactions');
app.use('/api/transactions', transactionsRouter);

app.use(express.static(path.join(__dirname, 'transaction-system-frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'transaction-system-frontend/build/index.html'));
});

app.get('/', (req, res) => {
  res.send('Artists Company Transaction System Backend');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
