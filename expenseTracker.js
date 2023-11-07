// Import sorting functions from expenseSort.js
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

// Keeps track of if the user is editing an entry
let isEditing = false;

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
function calculateTotal(cost) {
  expenseTotal += Number(cost);
  expenseTotal = Math.round(expenseTotal * 100) / 100;
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

// Creates event listeners for expense "td" elements and for "Edit" and "Delete" buttons
function createEventListenters(entryIndex) {
  // Displays "Edit" and "Delete" buttons if element is hovered over
  document.querySelector(`.entry${entryIndex}`).addEventListener('mouseover', (event) => {
    hover(event, isEditing, entryIndex);
  });

  // Hides "Edit" and "Delete" buttons if element is not hovered over
  document.querySelector(`.entry${entryIndex}`).addEventListener('mouseout', (event) => {
    hover(event, isEditing, entryIndex);
  });

  // Edits/Saves expense when clicked
  document.querySelector(`.edit${entryIndex}`).addEventListener('click', () => {
    editExpense(entryIndex);
  });
  /* *** WORK IN PROGRESS ***
  // Saves expense when "Enter" is pressed
  document.querySelector(`.task${entryName}`).addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
      editTask(entryName);
    }
  });

  // Deletes expense element when clicked
  document.querySelector(`.delete${entryName}`).addEventListener('click', () => {
    deleteTask(entryName);
  });*/
}

// Shows or hides "Edit" and "Delete" buttons depending on event type
function hover(event, isEditing, entryIndex) {
  if (!isEditing) {
    document.querySelector(`.edit${entryIndex}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
    document.querySelector(`.delete${entryIndex}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
  }
}

// Function to edit or save an expense
function editExpense(entryIndex) {
  // Gets correct "Edit" button and entry name, cost, and date elements
  const editBtn = document.querySelector(`.edit${entryIndex}`);
  const expenseName = document.querySelector(`.expense-name-${entryIndex}`);
  const expenseCost = document.querySelector(`.expense-cost-${entryIndex}`);
  const expenseDate = document.querySelector(`.expense-date-${entryIndex}`);

  // If button says "Edit", disable submit button and sort select, change to "Save", and enable entry editing
  // Else, enable submit button and sort select, change to "Edit", disable entry editing, and save changes
  if (editBtn.innerHTML == 'Edit') {
    isEditing = true;
    submitBtn.disabled = true;
    sortMenu.disabled = true;
    editBtn.innerHTML = 'Save';

    // Used to store date to reformat it as YYYY-MM-DD
    const dateValue = expenseDate.innerHTML;

    // Makes name, cost, and date elements editable
    expenseName.innerHTML = `<input class="name-edit" type="text" style="width: 100px;" value="${expenseName.innerHTML}">`;
    expenseCost.innerHTML = `<input class="cost-edit" type="number" style="width: 60px;" value="${expenseCost.innerHTML}">`;
    expenseDate.innerHTML = `<input class="date-edit" type="date" value="${dateValue.slice(6,10)}-${dateValue.slice(0,2)}-${dateValue.slice(3,5)}">`;
  } else {
    isEditing = false;
    submitBtn.disabled = false;
    sortMenu.disabled = false;
    editBtn.innerHTML = 'Edit';

    // Gets edited entry input elements
    const editedName = document.querySelector(`.name-edit`);
    const editedCost = document.querySelector(`.cost-edit`);
    const editedDate = document.querySelector(`.date-edit`);

    // If any input forms are empty or expense cost is NaN or less than or equal to 0, then set to original values
    // Else, save changes and re-sort entry is needed
    if (editedName.value == '' || editedCost.value == '' || editedDate.value == '' || isNaN(editedCost.value) || 
        editedCost.value <= 0) {
      expenseName.innerHTML = `${expenseArray[entryIndex].name}`;
      expenseCost.innerHTML = `${expenseArray[entryIndex].cost}`;
      expenseDate.innerHTML = `${expenseArray[entryIndex].date}`;
    } else {
      expenseName.innerHTML = `${editedName.value}`;
      expenseCost.innerHTML = `${editedCost.value}`;
      expenseDate.innerHTML = `${editedDate.value.slice(5,7)}/${editedDate.value.slice(8,10)}/${editedDate.value.slice(0,4)}`;

      // If entry values are all the same, then return
      // Else calculate cost difference in changes and add to total, re-sort entry in the array, and redraw table
      if (expenseName.innerHTML == expenseArray[entryIndex].name &&
        expenseCost.innerHTML == expenseArray[entryIndex].cost &&
        expenseDate.innerHTML == expenseArray[entryIndex].date) {
        return;
      } else {
        // Calculate difference between original and edited cost and add to total
        let costDifference = Number(expenseCost.innerHTML) - expenseArray[entryIndex].cost;
        calculateTotal(costDifference);

        // Pop entry out of array
        expenseArray.splice(entryIndex, 1);

        // Re-sort entry based on sort type
        switch (sortType) {
          case 'newest':
            insertNewest(expenseName.innerHTML, expenseCost.innerHTML, expenseDate.innerHTML, expenseArray);
            break;
          case 'oldest':
            insertOldest(expenseName.innerHTML, expenseCost.innerHTML, expenseDate.innerHTML, expenseArray);;
            break;
          case 'most-expensive':
            insertMostExpensive(expenseName.innerHTML, expenseCost.innerHTML, expenseDate.innerHTML, expenseArray);
            break;
          case 'least-expensive':
            insertLeastExpensive(expenseName.innerHTML, expenseCost.innerHTML, expenseDate.innerHTML, expenseArray);
            break;
        }

        // Clear and redraw table
        clearTable();
        drawTable();
      }
    }
  }
}