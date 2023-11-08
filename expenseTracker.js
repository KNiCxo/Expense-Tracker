// Import sorting functions from sort.js
import {
  expenseArray, insertNewest, insertOldest, insertLeastExpensive, insertMostExpensive, 
  sortNewest, sortOldest, sortLeastExpensive, sortMostExpensive
} from "./sort.js";

// Import entry event listener functions from entryEV.js
import {
  hover, editExpense, deleteExpense
} from "./entryEV.js";

// Element for Expense Total
const expenseHTML = document.getElementById('expense-total');

// Tracks total cost of expenses in list
export let expenseTotal = 129.74;

// Elements for Expense Input and Submit Button
const expenseNameInput = document.getElementById('expense-name');
const expenseCostInput = document.getElementById('expense-cost');
const expenseDateInput = document.getElementById('expense-date');
export const submitBtn = document.getElementById('submit');

// Element for Sort Menu
export const sortMenu = document.getElementById('select-sort');

// Element for Expense Table
const table = document.getElementById('table');

// String for tracking how expenses are sorted
export let sortType = 'newest';

// Set Expense Total, clear Expense Input forms and draw expense table
expenseHTML.innerHTML = `$${expenseTotal}`;
expenseNameInput.value = '';
expenseCostInput.value = '';
expenseDateInput.value = '';
drawTable();

// Expense is added to table and total is calculated when Submit Button is clicked
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

// Adds expense to array and table based on sort order
function addExpense() {
  // If any input forms are empty or expense cost is NaN or less than or equal to 0, then clear inputs and return
  if (expenseNameInput.value == '' || expenseCostInput.value == '' || expenseDateInput.value == '' || isNaN(expenseCostInput.value) ||
      expenseCostInput.value <= 0) {
    expenseNameInput.value = '';
    expenseCostInput.value = '';
    expenseDateInput.value = '';
    return;
  }

  // Get expense name, cost, and date (formatted mm/dd/yyyy) from input forms
  const name = expenseNameInput.value;
  const cost = Number(expenseCostInput.value);
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

  //Calculates, clears table and redraws with new entry
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

// Increases (or decreases) the expense total
export function calculateTotal(cost) {
  expenseTotal += Number(cost);
  expenseTotal = Math.round(expenseTotal * 100) / 100;
  expenseHTML.innerHTML = `$${expenseTotal}`;
}

 // Clears table
export function clearTable() {
  table.innerHTML = 
  `<tr>
    <th>Expense</th>
    <th>Cost</th>
    <th>Date</th>
  </tr>`;
}

// Creates event listeners for expense "td" elements and for "Edit" and "Delete" buttons
function createEventListenters(entryIndex) {
  // Displays "Edit" and "Delete" buttons if element is hovered over
  document.querySelector(`.entry${entryIndex}`).addEventListener('mouseover', (event) => {
    hover(event, entryIndex);
  });

  // Hides "Edit" and "Delete" buttons if element is not hovered over
  document.querySelector(`.entry${entryIndex}`).addEventListener('mouseout', (event) => {
    hover(event, entryIndex);
  });

  // Edits/Saves expense when clicked
  document.querySelector(`.edit${entryIndex}`).addEventListener('click', () => {
    editExpense(entryIndex);
  });

  // Saves expense when "Enter" is pressed
  document.querySelector(`.entry${entryIndex}`).addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
      editExpense(entryIndex);
    }
  });

  // Deletes expense element when clicked
  document.querySelector(`.delete${entryIndex}`).addEventListener('click', () => {
    deleteExpense(entryIndex);
  });
}

// Displays all expenses stored in the array as a table
export function drawTable() {
  // For each expense, create a "tr" element with a unique class name
  for (let i = 0; i < expenseArray.length; i++) {
    const tableEntry = document.createElement('tr');
    tableEntry.className = `entry${i}`;

    // Add expense info to HTML
    tableEntry.innerHTML = `
    <td class="expense-name-${i}">${expenseArray[i].name}</td>
    <td class="expense-cost-${i}">${expenseArray[i].cost}</td>
    <td class="expense-date-${i}">${expenseArray[i].date}</td>
    <button class="editBtn edit${i}">Edit</button>
    <button class="deleteBtn delete${i}">Delete</button>`;

    // Append entry to table, hide buttons, and create event listeners
    table.append(tableEntry);
    document.querySelector(`.edit${i}`).style.visibility = 'hidden';
    document.querySelector(`.delete${i}`).style.visibility = 'hidden';
    createEventListenters(i);
  }
}