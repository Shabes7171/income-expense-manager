import React, { useState, useEffect } from "react";
import Stock from "./components/Stock";
import Transaction from "./components/Transactions";
import Invoice from "./components/Invoice";  
import { fetchTransactionSummary } from "./api";  
import "./styles.css";

const App = () => {
  const [netSummary, setNetSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netProfitLoss: 0
  });

  // Fetch transaction summary on component mount
  useEffect(() => {
    const getTransactionSummary = async () => {
      try {
        const response = await fetchTransactionSummary();  // Fetch summary from the API
        setNetSummary(response.data);  // Update the state with the summary data
      } catch (error) {
        console.error("Error fetching transaction summary", error);
      }
    };

    getTransactionSummary();  // Fetch data when the component mounts
  }, []);

  return (
    <div className="App">
      <h1>Income and Expense Manager</h1>

      {/* Net Profit/Loss Summary */}
      <section>
        <h2>Net Profit/Loss</h2>
        <p>Total Income: ${netSummary.totalIncome}</p>
        <p>Total Expense: ${netSummary.totalExpense}</p>
        <p>
          Net Profit/Loss: ${netSummary.netProfitLoss}{" "}
          {netSummary.netProfitLoss >= 0 ? "(Profit)" : "(Loss)"}
        </p>
      </section>

      {/* Stock Management Section */}
      <section>
      
        <Stock />
      </section>

      {/* Add Transaction Section */}
      <section>
      
        <Transaction />
      </section>

      {/* Invoice Section */}
      <section>
    
        <Invoice /> {/* Display the Invoice Component */}
      </section>
    </div>
  );
};

export default App;
