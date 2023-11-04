import {
  expenseArray, insertNewest, insertOldest, insertLeastExpensive, insertMostExpensive, 
  sortNewest, sortOldest, sortLeastExpensive, sortMostExpensive
} from "./expenseSort.js";

// Element for Expense Total
const expenseHTML = document.getElementById('expense-total');

// Tracks total cost of expenses in list
let expenseTotal = 129.74;

// Elements for Expense Input and Submit Button
const expenseNameInput = document.getElementById('expense-name');
const expenseCostInput = document.getElementById('expense-cost');
const expenseDateInput = document.getElementById('expense-date');
const submitBtn = document.getElementById('submit');

// Element for Sort Menu
const sortMenu = document.getElementById('select-sort');

// Element for Expense Table
const table = document.getElementById('table');

// String for tracking how expenses are sorted
let sortType = 'newest';

// Set Expense Total, clear Expense Input forms and draw expense table
expenseHTML.innerHTML = `$${expenseTotal}`;
expenseNameInput.value = '';
expenseCostInput.value = '';
expenseDateInput.value = '';
drawTable();

// Expense is added to table when Submit Button is clicked
submitBtn.addEventListener('click', addExpense);

// Sorts array based on sort order when clicked
sortMenu.addEventListener('click', () => {
  sortType = sortMenu.value;

  switch (sortType) {
    case 'newest':
      sortNewest();
      break;
    case 'oldest':
      sortOldest();
      break;
    case 'most-expensive':
      sortMostExpensive();
      break;
    case 'least-expensive':
      sortLeastExpensive();
      break;
  }
  
  clearTable();
  drawTable();
});

function calculateTotal(cost) {
  expenseTotal += Number(cost);
  expenseHTML.innerHTML = `$${expenseTotal}`;
}

 // Clears table
function clearTable() {
  table.innerHTML = 
  `<tr>
    <th>Expense</th>
    <th>Cost</th>
    <th>Date</th>
  </tr>`;
}

// Displays all expenses stored in the array as a table
function drawTable() {
  expenseArray.forEach((entry) => {
    const tableEntry = document.createElement('tr');

    tableEntry.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.cost}</td>
    <td>${entry.date}</td>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>`;

    table.append(tableEntry);
  });
}

// Adds expense to array and table based on sort order
function addExpense() {
  // If any input forms are empty or expense cost is NaN or negative, then return
  if (expenseNameInput.value == '' || expenseCostInput.value == '' || expenseDateInput.value == '' || isNaN(expenseCostInput.value) ||
      expenseCostInput.value < 0) {
    expenseNameInput.value = '';
    expenseCostInput.value = '';
    expenseDateInput.value = '';
    return;
  }

  // Get expense name, cost, and date (formatted mm/dd/yyyy) from input forms
  const name = expenseNameInput.value;
  const cost = expenseCostInput.value;
  const date = `${expenseDateInput.value.slice(5,7)}/${expenseDateInput.value.slice(8,10)}/${expenseDateInput.value.slice(0,4)}`;

  // Inserts entry into array based on sort order
  switch (sortType) {
    case 'newest':
      insertNewest(name, cost, date, expenseArray);
      break;
    case 'oldest':
      insertOldest(name, cost, date, expenseArray);
      break;
    case 'most-expensive':
      insertMostExpensive(name, cost, date, expenseArray);
      break;
    case 'least-expensive':
      insertLeastExpensive(name, cost, date, expenseArray);
      break;
  }

  //Calculates Clears table and redraws with new entry
  calculateTotal(cost);
  clearTable();
  drawTable();

  // *** TEMPORARY CODE: DELETE LATER *** \\
  expenseArray.forEach((index) => console.log(index));

  // Clears input forms
  expenseNameInput.value = '';
  expenseCostInput.value = '';
  expenseDateInput.value = '';
}