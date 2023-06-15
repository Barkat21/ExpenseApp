import React, { useState } from "react";
import axios from "axios";
import "./ExpenseForm.css";

const ExpenseForm = (first) => {
  const BASE_URL = "http://localhost:8080";
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenseDate, setExpenseDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !amount || !expenseDate) {
      setError("Please fill in all fields.");
      alert(error);
      return;
    }

    const expense = {
      category,
      amount,
      expenseDate,
    };

    try {
      console.log(expense);
      const response = await axios.post(BASE_URL + "/expense", expense);
      console.log(response.data);
      alert("Expense Added");

      // handle success response
    } catch (error) {
      console.error(error); // handle error response
    }
  };

  return (
    <div className="expense-form">
      <form onSubmit={handleSubmit}>
        <h2>Add Expense</h2>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="expenseDate">Expense Date:</label>
          <input
            type="date"
            id="expenseDate"
            value={expenseDate}
            onChange={(e) => setExpenseDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;
