# SpendWise

SpendWise is a simple personal budget and expense tracker. Users can set a
budget through a JavaScript prompt, add expenses with a name, amount, and
category, and view their total spending and remaining balance.

## JavaScript concepts implemented

- **Variables and data types:** `budget` stores a number, while `expenses`
  stores an array of expense objects. Each object contains string and number
  values.
- **User input:** The budget is collected with `prompt()`. Expense details are
  collected from the HTML form with `FormData`.
- **Calculations:** SpendWise adds expense amounts with `reduce()` and
  calculates the remaining balance by subtracting total expenses from the
  budget.
- **Functions:** Reusable functions separate responsibilities such as
  calculating totals, formatting currency, displaying the summary, handling
  the budget prompt, and processing new expenses.
- **Console output:** Every summary update is labeled in the browser console
  with the budget, total spent, and remaining balance.

## Run the project

Open `index.html` in a browser. Set a budget, add one or more expenses, and
open the browser DevTools console to see the labeled calculation results.
