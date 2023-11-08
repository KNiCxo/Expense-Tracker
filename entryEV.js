// Import sorting functions from sort.js
import {
  expenseArray, insertNewest, insertOldest, insertLeastExpensive, insertMostExpensive, 
} from "./sort.js";

// Import sorting functions from sort.js
import {
  submitBtn, sortMenu, sortType, calculateTotal, clearTable, drawTable
} from "./expenseTracker.js";

// Keeps track of if the user is editing an entry
let isEditing = false;

// Shows or hides "Edit" and "Delete" buttons depending on event type
export function hover(event, entryIndex) {
  if (!isEditing) {
    document.querySelector(`.edit${entryIndex}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
    document.querySelector(`.delete${entryIndex}`).style.visibility = (event.type === 'mouseover') ? 'visible' : 'hidden';
  }
}

// Function to edit or save an expense
export function editExpense(entryIndex) {
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