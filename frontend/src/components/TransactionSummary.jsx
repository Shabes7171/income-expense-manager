import React, { useEffect, useState } from 'react';
import { fetchTransactionSummary } from '../api';

const TransactionSummary = () => {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        const getSummary = async () => {
            const data = await fetchTransactionSummary();
            setSummary(data);
        };
        getSummary();
    }, []);

    return (
        <div className="transaction-summary">
            {summary ? (
                <>
                    <p>Total Income: ${summary.totalIncome}</p>
                    <p>Total Expense: ${summary.totalExpense}</p>
                    <p>Net Profit/Loss: ${summary.netProfitLoss} ({summary.netProfitLoss >= 0 ? 'Profit' : 'Loss'})</p>
                </>
            ) : (
                <p>Loading summary...</p>
            )}
        </div>
    );
};

export default TransactionSummary;
