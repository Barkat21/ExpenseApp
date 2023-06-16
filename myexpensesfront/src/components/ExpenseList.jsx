import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExpenseForm.css";
import EditExpense from "./EditExpense";

const ExpenseList = () => {
  const BASE_URL = "http://localhost:8080";
  const [expenses, setExpenses] = useState([]);
  const [editExpenseId, setEditExpenseId] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expenses`);
      const latestResponse = response.data.slice(-5);
      setExpenses(latestResponse);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expenseId) => {
    setEditExpenseId(expenseId);
  };

  const handleCloseEdit = () => {
    setEditExpenseId(null);
    fetchExpenses(); // Refresh the expenses after edit
  };

  const handleDelete = async (expenseId) => {
    try {
      await axios.delete(`${BASE_URL}/expense/${expenseId}`);
      fetchExpenses(); // Refresh the expenses after delete
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Recent Expenses</h2>
      <div className="ExpenseContainer">
        {expenses.map((expense) => (
          <div key={expense.id} className="expense-card">
            <h3>{expense.category}</h3>
            <p>Amount: {expense.amount}</p>
            <p>Date: {expense.expenseDate}</p>
            <button onClick={() => handleEdit(expense.id)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </div>
        ))}
      </div>
      {editExpenseId && (
        <EditExpense expenseId={editExpenseId} onClose={handleCloseEdit} />
      )}
    </div>
  );
};

export default ExpenseList;
