"use strict";

let budget = 0;
const expenses = [];

const budgetMessage = document.querySelector("#budget-message");
const expenseForm = document.querySelector("#expense-form");
const expenseList = document.querySelector("#expense-list");
const totalSpentElement = document.querySelector("#total-spent");
const remainingBalanceElement = document.querySelector("#remaining-balance");
const setBudgetButton = document.querySelector("#set-budget-button");

function calculateTotalExpenses(expenseItems) {
  return expenseItems.reduce(function (total, expense) {
    return total + expense.amount;
  }, 0);
}

function calculateRemainingBalance(currentBudget, expenseItems) {
  return currentBudget - calculateTotalExpenses(expenseItems);
}

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

function displayBudgetSummary() {
  const totalSpent = calculateTotalExpenses(expenses);
  const remainingBalance = calculateRemainingBalance(budget, expenses);

  totalSpentElement.textContent = formatCurrency(totalSpent);
  remainingBalanceElement.textContent = budget > 0
    ? formatCurrency(remainingBalance)
    : "Set a budget first";

  console.log("SpendWise Budget Summary");
  console.log("Budget:", budget > 0 ? formatCurrency(budget) : "Not set");
  console.log("Total spent:", formatCurrency(totalSpent));
  console.log("Remaining balance:", budget > 0 ? formatCurrency(remainingBalance) : "Not available");
}

function displayExpense(expense) {
  const expenseItem = document.createElement("li");
  expenseItem.textContent = `${expense.name} - ${formatCurrency(expense.amount)} (${expense.category})`;

  const emptyState = expenseList.querySelector(".empty-state");
  if (emptyState) {
    emptyState.remove();
  }

  expenseList.appendChild(expenseItem);
}

function setBudgetFromPrompt() {
  const budgetInput = prompt("Enter your monthly budget:");
  const budgetAmount = Number(budgetInput);

  if (budgetInput === null) {
    return;
  }

  if (!Number.isFinite(budgetAmount) || budgetAmount <= 0) {
    budgetMessage.textContent = "Please enter a budget greater than $0.";
    return;
  }

  budget = budgetAmount;
  budgetMessage.textContent = `Current budget: ${formatCurrency(budget)}`;
  displayBudgetSummary();
}

function handleExpenseSubmit(event) {
  event.preventDefault();

  const formData = new FormData(expenseForm);
  const expense = {
    name: formData.get("expense-name").trim(),
    amount: Number(formData.get("expense-amount")),
    category: formData.get("expense-category").trim()
  };

  if (!expense.name || !expense.category || !Number.isFinite(expense.amount) || expense.amount <= 0) {
    return;
  }

  expenses.push(expense);
  displayExpense(expense);
  displayBudgetSummary();
  expenseForm.reset();
}

setBudgetButton.addEventListener("click", setBudgetFromPrompt);
expenseForm.addEventListener("submit", handleExpenseSubmit);
displayBudgetSummary();
