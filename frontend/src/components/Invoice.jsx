import React, { useState } from 'react';
import { addInvoice } from '../api';
import '../styles.css';

const Invoice = () => {
    const [items, setItems] = useState([{ name: '', price: '', quantity: '' }]);
    const [total, setTotal] = useState(0);

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...items];
        updatedItems[index][name] = value;
        setItems(updatedItems);
    };

    const handleAddItem = () => {
        setItems([...items, { name: '', price: '', quantity: '' }]);
    };

    const calculateTotal = () => {
        const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotal(totalAmount);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addInvoice({ items, total });
    };

    return (
        <div className="invoice-container">
            <h2>Invoice Generator</h2>

            <div className="invoice">
                <div className="invoice-header">
                    <img src="/logo.png" alt="Logo" className="invoice-logo" /> {/* Logo from the public folder */}
                    <h3>Invoice</h3>
                </div>

                <form onSubmit={handleSubmit}>
                    {items.map((item, index) => (
                        <div key={index} className="invoice-item">
                            <input
                                type="text"
                                name="name"
                                placeholder="Item Name"
                                value={item.name}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={item.price}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleChange(e, index)}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={handleAddItem}>Add Item</button>
                    <button type="submit" onClick={calculateTotal}>Generate Invoice</button>
                </form>

                <div className="invoice-footer">
                    <h3>Total: ${total}</h3>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
