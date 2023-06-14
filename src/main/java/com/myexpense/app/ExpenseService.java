package com.myexpense.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
public class ExpenseService {
    @Autowired
    ExpenseRepository expenseRepository;

    public Expense createExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    public List<Expense> getExpensesByDate(LocalDate expenseDate) {
        return expenseRepository.findAllByExpenseDate(expenseDate);
    }
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    public Double getDailyExpenseSum(LocalDate expenseDate)
    {
        List<Expense> expenses = expenseRepository.findAllByExpenseDate(expenseDate);
        double total=0.0;
        if(expenses.size()!=0)
        {
            for(Expense e : expenses)
            {
                total=total+e.getAmount();
            }
            return total;
        }
        else return 0.0;
    }


    public Map<LocalDate, Double> getDateWiseExpenseSum() {
        List<Expense> expenses = expenseRepository.findAll();
        Map<LocalDate, Double> dateWiseSum = new HashMap<>();

        for (Expense expense : expenses) {
            LocalDate expenseDate = expense.getExpenseDate();
            double expenseAmount = expense.getAmount();

            if (dateWiseSum.containsKey(expenseDate)) {
                double currentSum = dateWiseSum.get(expenseDate);
                dateWiseSum.put(expenseDate, currentSum + expenseAmount);
            } else {
                dateWiseSum.put(expenseDate, expenseAmount);
            }
        }
        return  dateWiseSum;
    }

    public Map<String, Double> getMonthlyExpenseSum() {
        List<Expense> expenses = expenseRepository.findAll();
        Map<String, Double> monthlySum = new HashMap<>();

        for (Expense expense : expenses) {
            LocalDate expenseDate = expense.getExpenseDate();
            YearMonth expenseMonth = YearMonth.of(expenseDate.getYear(), expenseDate.getMonth());

            double expenseAmount = expense.getAmount();

            if (monthlySum.containsKey(expenseMonth.toString())) {
                double currentSum = monthlySum.get(expenseMonth.toString());
                monthlySum.put(expenseMonth.toString(), currentSum + expenseAmount);
            } else {
                monthlySum.put(expenseMonth.toString(), expenseAmount);
            }
        }

        return monthlySum;
    }


    public Map<String, Map<String, Double>> getMonthlyExpenseSumByCategory() {
        List<Expense> expenses = expenseRepository.findAll();
        Map<String, Map<String, Double>> monthlySumByCategory = new HashMap<>();

        for (Expense expense : expenses) {
            LocalDate expenseDate = expense.getExpenseDate();
            YearMonth expenseMonth = YearMonth.of(expenseDate.getYear(), expenseDate.getMonth());
            String expenseCategory = expense.getCategory();
            double expenseAmount = expense.getAmount();

            if (!monthlySumByCategory.containsKey(expenseMonth.toString())) {
                monthlySumByCategory.put(expenseMonth.toString(), new HashMap<>());
            }

            Map<String, Double> monthlySum = monthlySumByCategory.get(expenseMonth.toString());

            if (monthlySum.containsKey(expenseCategory)) {
                double currentSum = monthlySum.get(expenseCategory);
                monthlySum.put(expenseCategory, currentSum + expenseAmount);
            } else {
                monthlySum.put(expenseCategory, expenseAmount);
            }
        }

        return monthlySumByCategory;
    }



}





