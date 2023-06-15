import React, { useEffect, useState } from "react";
import axios from "axios";

const MonthlyExpenseSum = () => {
  const BASE_URL = "http://localhost:8080";
  const [monthlySums, setMonthlySums] = useState([]);

  useEffect(() => {
    fetchMonthlyExpenseSum();
  }, []);

  const fetchMonthlyExpenseSum = async () => {
    try {
      const response = await axios.get(BASE_URL + "/sum/monthly");
      setMonthlySums(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMonthName = (monthNumber) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthNames[monthNumber - 1];
  };

  return (
    <div>
      <h2>Monthly Expense Sum</h2>
      {Object.entries(monthlySums).length !== 0 ? (
        Object.entries(monthlySums).map(([monthKey, amount]) => (
          <div key={monthKey} className="expense-card">
            <h3>{getMonthName(monthKey)}</h3>
            <p>Month: {monthKey}</p>
            <p>Total Expense: {amount}</p>
          </div>
        ))
      ) : (
        <p>No monthly expense data available.</p>
      )}
    </div>
  );
};

export default MonthlyExpenseSum;
