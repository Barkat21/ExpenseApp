import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ExpenseForm from "./components/ExpenseForm";
import EditExpense from "./components/EditExpense";
import ExpenseList, { ExpenseListAll } from "./components/ExpenseList";
import MonthlyExpenseSum from "./components/MonthlyExpenseSum";
import Navbar from "./components/Navbar";
import "./components/ExpenseForm.css";
import ExpenseSumByCategory from "./components/ExpenseSumByCategory";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ExpenseForm />} />
          <Route path="/dashboard" element={<MonthlyExpenseSum />} />
          <Route path="/expenses" element={<ExpenseListAll />} />
          <Route path="/edit/:expenseId" element={<EditExpense />} />
          <Route path="/sum-by-category" element={<ExpenseSumByCategory />} />
        </Routes>
      </Router>
      {/* <ExpenseForm />
      <ExpenseList />
      <MonthlyExpenseSum /> */}
    </div>
  );
}

export default App;
