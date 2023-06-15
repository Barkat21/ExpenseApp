import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import MonthlyExpenseSum from "./components/MonthlyExpenseSum";

function App() {
  const [first, setfirst] = useState(false);
  return (
    <div className="App">
      <ExpenseForm first={first} />
      <ExpenseList />
      <MonthlyExpenseSum />
    </div>
  );
}

export default App;
