import React, { useState } from 'react';
import { addTransaction } from '../api';

const Transaction = () => {
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');

    const handleAddTransaction = async () => {
        const transactionData = { category, amount, type };
        await addTransaction(transactionData); // Post the transaction data to API
    };

    return (
        <div>
            <h2>Add Transaction</h2>
            <form onSubmit={handleAddTransaction}>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default Transaction;
