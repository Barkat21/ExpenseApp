package com.myexpense.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ExpenseController {
    @Autowired
    ExpenseService expenseService;

    @PostMapping("/expense")
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        Expense createdExpense = expenseService.createExpense(expense);
        return new ResponseEntity<>(createdExpense, HttpStatus.CREATED);
    }

    @GetMapping("/expenses")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        System.out.println(expenses);
        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/expense/{expenseId}")
    public ResponseEntity<String> deleteExpense(@PathVariable("expenseId") int expenseId) {
        expenseService.deleteExpense(expenseId);
        return ResponseEntity.ok("Expense deleted successfully");
    }

    @GetMapping("/date/{expenseDate}")
    public ResponseEntity<List<Expense>> getExpensesByDate(@PathVariable("expenseDate") @DateTimeFormat(pattern = "yyyy-MM-dd")
                                                           String expenseDate) {
        LocalDate date = LocalDate.parse(expenseDate);
        List<Expense> expenses = expenseService.getExpensesByDate(date);

        if (expenses.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(expenses);
        }


    }

    @GetMapping("/sum/{expenseDate}")
    public ResponseEntity<Double> getDailyExpenseSum(@PathVariable("expenseDate") @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate expenseDate) {
        Double sum = expenseService.getDailyExpenseSum(expenseDate);
        return ResponseEntity.ok(sum);
    }


    @GetMapping("/sum/date-wise")
    public ResponseEntity<Map<LocalDate, Double>> getDateWiseExpenseSum() {
        Map<LocalDate, Double> dateWiseSum = expenseService.getDateWiseExpenseSum();
        return ResponseEntity.ok(dateWiseSum);
    }

    @GetMapping("/sum/monthly")
    public ResponseEntity<Map<String, Double>> getMonthlyExpenseSum() {
        Map<String, Double> monthlySum = expenseService.getMonthlyExpenseSum();
        return ResponseEntity.ok(monthlySum);
    }

    @GetMapping("/sum/monthly/category")
    public ResponseEntity<Map<String, Map<String, Double>>> getMonthlyExpenseSumByCategory() {
        Map<String, Map<String, Double>> monthlySumByCategory = expenseService.getMonthlyExpenseSumByCategory();
        return ResponseEntity.ok(monthlySumByCategory);
    }

    @PutMapping("/expense/{expenseId}")
    public ResponseEntity<Expense> updateExpense(@PathVariable("expenseId") int expenseId, @RequestBody Expense updatedExpense) {
        Expense expense = expenseService.updateExpense(expenseId, updatedExpense);
        return ResponseEntity.ok(expense);
    }

    @GetMapping("/expense/{expenseId}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable("expenseId") int expenseId ) {
        Expense expense = expenseService.getExpenseById(expenseId);

        if (expense == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(expense);
        }
    }


}


