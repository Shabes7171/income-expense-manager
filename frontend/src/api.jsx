import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Fetch stock data
export const fetchStock = () => axios.get(`${API_URL}/stock`);

// Add stock data
export const addStock = (data) => axios.post(`${API_URL}/stock`, data);

// Fetch transaction data
export const fetchTransactions = () => axios.get(`${API_URL}/transaction`);

// Add transaction data
export const addTransaction = (data) => axios.post(`${API_URL}/transaction`, data);

// Fetch invoice data
export const fetchInvoices = () => axios.get(`${API_URL}/invoice`);

// Add invoice data
export const addInvoice = (data) => axios.post(`${API_URL}/invoice`, data);

// Fetch transaction summary data
export const fetchTransactionSummary = () => axios.get(`${API_URL}/transaction-summary`);

