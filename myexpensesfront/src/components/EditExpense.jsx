import React, { useState, useEffect } from "react";
import axios from "axios";

const EditExpense = ({ expenseId, onClose }) => {
  const BASE_URL = "http://localhost:8080";
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenseDate, setExpenseDate] = useState("");

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expense/${expenseId}`);
      const expense = response.data;
      setCategory(expense.category);
      setAmount(expense.amount);
      setExpenseDate(expense.expenseDate);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      category,
      amount,
      expenseDate,
    };

    try {
      await axios.put(`${BASE_URL}/expense/${expenseId}`, updatedExpense);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Expense</h2>
      <form onSubmit={handleUpdate}>
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
        <button type="submit">Update Expense</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditExpense;
