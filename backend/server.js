const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Stock data model

const Stock = mongoose.model('Stock', new mongoose.Schema({
    name: String,
    vendor: String,
    quantity: Number,
    price: Number,
    type: { type: String, enum: ['purchase', 'sale'] } // Type to distinguish purchase/sale
}));

// Get stock data
app.get('/stock', async (req, res) => {
    try {
        const stockItems = await Stock.find(); // Fetch data from MongoDB
        res.json(stockItems);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get stock data' });
    }
});


app.post('/stock', async (req, res) => {
    const { name, vendor, quantity, price, type } = req.body;
    try {
        const newStock = new Stock({ name, vendor, quantity, price, type });
        await newStock.save();
        res.status(201).json(newStock); // Respond with the newly added stock item
    } catch (err) {
        res.status(400).json({ message: 'Failed to add stock' });
    }
});



const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    category: String,
    amount: Number,
    type: { type: String, enum: ['income', 'expense'] }
}));


// Post route to add transaction
app.post('/transaction', async (req, res) => {
    const { category, amount, type } = req.body;
    try {
        const transaction = new Transaction({ category, amount, type });
        await transaction.save();
        res.status(201).json(transaction); // Respond with the added transaction
    } catch (error) {
        res.status(500).json({ message: "Error adding transaction" });
    }
});

// GET route to get all transactions
app.get('/transaction', async (req, res) => {
    try {
        const transactions = await Transaction.find();  // Fetch data from MongoDB
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get transaction data' });
    }
});

// Get route to fetch transactions and calculate total income/expense
app.get('/transaction-summary', async (req, res) => {
    try {
        const incomeTransactions = await Transaction.aggregate([
            { $match: { type: 'income' } },
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } }
        ]);

        const expenseTransactions = await Transaction.aggregate([
            { $match: { type: 'expense' } },
            { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
        ]);

        const totalIncome = incomeTransactions.length ? incomeTransactions[0].totalIncome : 0;
        const totalExpense = expenseTransactions.length ? expenseTransactions[0].totalExpense : 0;

        const netProfitLoss = totalIncome - totalExpense;
        res.json({ totalIncome, totalExpense, netProfitLoss });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching transaction summary' });
    }
});




// Server listening on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
