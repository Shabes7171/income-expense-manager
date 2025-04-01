
import React, { useState } from 'react';
import { addStock } from '../api';

const Stock = () => {
    const [name, setName] = useState('');
    const [vendor, setVendor] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('purchase'); // default to 'purchase'

    const handleAddStock = async () => {
        const stockData = { name, vendor, quantity, price, type };
        await addStock(stockData); // Post the stock data to API
    };

    return (
        <div>
            <h2>Stock Management</h2>
            <form onSubmit={handleAddStock}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Item Name" required />
                <input type="text" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor Name" required />
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="purchase">Purchase</option>
                    <option value="sale">Sale</option>
                </select>
                <button type="submit">Add Stock</button>
            </form>
        </div>
    );
};

export default Stock;
