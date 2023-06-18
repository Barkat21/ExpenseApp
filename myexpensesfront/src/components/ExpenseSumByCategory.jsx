import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseSumByCategory = () => {
  const BASE_URL = "http://localhost:8080";
  const [monthlySumByCategory, setMonthlySumByCategory] = useState(null);

  useEffect(() => {
    fetchMonthlyExpenseSumByCategory();
  }, []);

  const fetchMonthlyExpenseSumByCategory = async () => {
    try {
      const response = await axios.get(BASE_URL + "/sum/monthly/category");
      setMonthlySumByCategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Monthly Expense Sum by Category</h2>
      {monthlySumByCategory ? (
        <ul>
          {Object.entries(monthlySumByCategory).map(
            ([month, sumByCategory]) => (
              <li key={month}>
                <h3>{month}</h3>
                <ul>
                  {Object.entries(sumByCategory).map(([category, sum]) => (
                    <li key={category}>
                      {category}: ${sum}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ExpenseSumByCategory;
