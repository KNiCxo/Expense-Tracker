// Elements for Expense Input and Submit Button
const expenseNameInput = document.getElementById('expense-name');
const expenseCostInput = document.getElementById('expense-cost');
const expenseDateInput = document.getElementById('expense-date');
const submitBtn = document.getElementById('submit');

// Element for Expense Table
const table = document.getElementById('table');

// String for tracking how expenses are sorted
let sortType = 'least-expensive';

// Array to store list of expenses
let expenseArray = [{
    name: 'Discord Nitro Classic',
    cost:'4.99',
    date: '10/12/2023'
  }, {
    name: 'Car Wash',
    cost: '20',
    date: '08/02/2023'
  }, {
  name: 'Birthday Gift',
  cost:'74.31',
  date: '10/13/2023'
}];

// Clear Expense Input forms and draw expense table
expenseNameInput.value = '';
expenseCostInput.value = '';
expenseDateInput.value = '';
drawTable();

// Expense is added to table when Submit Button is clicked
submitBtn.addEventListener('click', addExpense);

// Displays all expenses stored in the array as a table
function drawTable() {
  expenseArray.forEach((entry) => {
    const tableEntry = document.createElement('tr');

    tableEntry.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.cost}</td>
    <td>${entry.date}</td>`;

    table.append(tableEntry);
  });
}

// Inserts the expense into the array based on the "Oldest" sort order
function insertOldest(name, cost, date) {
  // Iterates through entire array or until return statement
  for (let i = 0; i < expenseArray.length; i++) {
    // If dates match, ignore (This causes the expense to be inserted at the end of all matching dates)
    if (date == expenseArray[i].date) {
      //pass
    } else if (Number(date.slice(6)) < Number(expenseArray[i].date.slice(6))){
      // If entry year is less than element year, then insert in front of element
      expenseArray.splice(i, 0, {
        name,
        cost,
        date
      });
      return;
    } else if (Number(date.slice(6)) == Number(expenseArray[i].date.slice(6))) {
      // If entry year and element year are the same, then check if entry month is less than element month
      if (Number(date.slice(0,2)) < Number(expenseArray[i].date.slice(0,2))) {
        // If entry month is less than element month, then insert in front of element
        expenseArray.splice(i, 0, {
          name,
          cost,
          date
        });
        return;
      } else if (Number(date.slice(0,2)) == Number(expenseArray[i].date.slice(0,2))) {
        // If entry month and element month are the same, then check if entry day is less than element day
        if (Number(date.slice(3,5) < Number(expenseArray[i].date.slice(3,5)))) {
          // If entry day is less than element day, then insert in front of element
          expenseArray.splice(i, 0, {
            name,
            cost,
            date
          });
          return;
        }
      }
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  expenseArray.push({
    name,
    cost,
    date
  });
}

// Inserts the expense into the array based on the "Newest" sort order
function insertNewest(name, cost, date) {
  // Iterates through entire array or until return statement
  for (let i = 0; i < expenseArray.length; i++) {
    // If dates match, then insert in front of element
    if (date == expenseArray[i].date) {
      expenseArray.splice(i, 0, {
        name,
        cost,
        date
      });
      return;
    } else if (Number(date.slice(6)) > Number(expenseArray[i].date.slice(6))){
      // If entry year is greater than element year, then insert in front of element
      expenseArray.splice(i, 0, {
        name,
        cost,
        date
      });
      return;
    } else if (Number(date.slice(6)) == Number(expenseArray[i].date.slice(6))){
      // If entry year and element year are the same, then check if entry month is greater than element month
      if (Number(date.slice(0,2)) > Number(expenseArray[i].date.slice(0,2))) {
        // If entry month is greater than element month, then insert in front of element
        expenseArray.splice(i, 0, {
          name,
          cost,
          date
        });
        return;
      } else if (Number(date.slice(0,2)) == Number(expenseArray[i].date.slice(0,2))) {
        // If entry month and element month are the same, then check if entry day is greater than element day
        if (Number(date.slice(3,5) > Number(expenseArray[i].date.slice(3,5)))) {
          // If entry day is greater than element day, then insert in front of element
          expenseArray.splice(i, 0, {
            name,
            cost,
            date
          });
          return;
        }
      }
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  expenseArray.push({
    name,
    cost,
    date
  });
}

// Inserts the expense into the array based on "Most Expensive" sort order
function insertMostExpensive(name, cost, date) {
  // Iterates through entire array or until return statement
  for (let i = 0; i < expenseArray.length; i++) {
    // If entry cost is greater than element cost, then insert in front of element
    if (Number(cost) > Number(expenseArray[i].cost)) {
      expenseArray.splice(i, 0, {
        name,
        cost,
        date
      });
      return;
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  expenseArray.push({
    name,
    cost,
    date
  });
}

// Inserts the expense into the array based on "Least Expensive" sort order
function insertLeastExpensive(name, cost, date) {
  // Iterates through entire array or until return statement
  for (let i = 0; i < expenseArray.length; i++) {
    // If entry cost is less than element cost, then insert in front of element
    if (Number(cost) < Number(expenseArray[i].cost)) {
      expenseArray.splice(i, 0, {
        name,
        cost,
        date
      });
      return;
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  expenseArray.push({
    name,
    cost,
    date
  });
}

// Adds expense to array and table based on sort order
function addExpense() {
  // If any input forms are empty or expense cost is NaN or negative, then return
  if (expenseNameInput.value == '' || expenseCostInput.value == '' || expenseDateInput.value == '' || isNaN(expenseCostInput.value)) {
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
    case 'oldest':
      insertOldest(name, cost, date);
      break;
    case 'newest':
      insertNewest(name, cost, date);
      break;
    case 'most-expensive':
      insertMostExpensive(name, cost, date);
      break;
    case 'least-expensive':
      insertLeastExpensive(name, cost, date);
      break;
  }

  // Clears table and redraws with new entry
  table.innerHTML = 
  `<tr>
    <th>Expense</th>
    <th>Cost</th>
    <th>Date</th>
  </tr>`;
  drawTable();

  // *** TEMPORARY CODE: DELETE LATER *** \\
  expenseArray.forEach((index) => console.log(index));

  // Clears input forms
  expenseNameInput.value = '';
  expenseCostInput.value = '';
  expenseDateInput.value = '';
}