import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";

const EditExpense = ({ onClose }) => {
  const BASE_URL = "http://localhost:8080";
  const { expenseId } = useParams();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [expenseDate, setExpenseDate] = useState("");
  const navigate = useNavigate();

  const fetchExpense = async () => {
    console.log(expenseId);
    try {
      console.log(expenseId);
      const response = await axios.get(`${BASE_URL}/expense/${expenseId}`);
      const expense = response.data;
      setCategory(expense.category);
      setAmount(expense.amount);
      setExpenseDate(expense.expenseDate);
      console.log(category);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedExpense = {
      category,
      amount,
      expenseDate,
    };

    try {
      console.log(updatedExpense);
      await axios.put(`${BASE_URL}/expense/${expenseId}`, updatedExpense);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseEdit = (expenseId) => {
    navigate(`/expenses`);
  };

  return (
    <div className="expense-form">
      <div>
        <h2>Edit Expense</h2>
        <form onSubmit={handleUpdate}>
          <div>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              placeholder={category}
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
          <button type="edit" onClick={handleCloseEdit}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
