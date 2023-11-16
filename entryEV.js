// Import sorting functions from sort.js
import {
  expenseArray, insertNewest, insertOldest, insertLeastExpensive, insertMostExpensive, 
} from "./sort.js";

// Import variables and functions from expenseTracker.js
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

// Edits or saves an expense entry
export function editExpense(entryIndex) {
  // Gets correct "Edit" button and entry name, cost, and date elements
  const editBtn = document.querySelector(`.edit${entryIndex}`);
  const expenseName = document.querySelector(`.expense-name-${entryIndex}`);
  const expenseCost = document.querySelector(`.expense-cost-${entryIndex}`);
  const expenseDate = document.querySelector(`.expense-date-${entryIndex}`);

  // If button says "Edit", disable submit button and sort menu, change to "Save", and enable entry editing
  // Else, enable submit button and sort menu, change to "Edit", disable entry editing, and save changes
  if (editBtn.innerHTML == 'Edit') {
    isEditing = true;
    submitBtn.disabled = true;
    sortMenu.disabled = true;
    editBtn.innerHTML = 'Save';

    // Stores date and reformats as YYYY-MM-DD input field
    const dateValue = expenseDate.innerHTML;
    expenseDate.innerHTML = `<input class="date-edit edited" type="date" value="${dateValue.slice(6,10)}-${dateValue.slice(0,2)}-${dateValue.slice(3,5)}">`;

    // Makes name, cost, and date elements editable
    expenseName.contentEditable = true;
    expenseCost.contentEditable = true;

  } else {
    isEditing = false;
    submitBtn.disabled = false;
    sortMenu.disabled = false;
    editBtn.innerHTML = 'Edit';

    // Gets edited date input element
    const editedDate = document.querySelector(`.date-edit`);

    // If any input forms are empty or expense cost is NaN or less than or equal to 0, then set to original values
    // Else, save changes and re-sort entry if needed
    if (expenseName.innerHTML == '<br>' || expenseCost.innerHTML == '' || editedDate.value == '' || isNaN(expenseCost.innerHTML) || 
        expenseCost.innerHTML <= 0) {
      expenseName.innerHTML = `${expenseArray[entryIndex].name}`;
      expenseCost.innerHTML = `${expenseArray[entryIndex].cost}`;
      expenseDate.innerHTML = `${expenseArray[entryIndex].date}`;
    } else {

      // Converts date back to MM-DD-YYYY and makes elements not editable
      expenseName.contentEditable = false;
      expenseCost.contentEditable = false;
      expenseDate.innerHTML = `${editedDate.value.slice(5,7)}/${editedDate.value.slice(8,10)}/${editedDate.value.slice(0,4)}`;

      // If entry values are all the same, then return
      // Else calculate cost difference and add to total, re-sort entry in the array, and redraw table
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
        localStorage.setItem('expenseArray', JSON.stringify(expenseArray));

        // Clear and redraw table
        clearTable();
        drawTable();
      }
    }
  }
}

// Deletes an expense entry and re-calculates total
export function deleteExpense(entryIndex) {
  // Find entry in array, re-calculate total, remove from array and table, then return
  const entryName = document.querySelector(`.expense-name-${entryIndex}`).innerHTML;
  for (let i = 0; i < expenseArray.length; i++) {
    if (entryName == expenseArray[i].name) {
      calculateTotal(-expenseArray[i].cost)
      expenseArray.splice(i, 1);
      localStorage.setItem('expenseArray', JSON.stringify(expenseArray));
      document.querySelector(`.entry${entryIndex}`).remove();
    }
  }

  // Prevents buttons from staying hidden and being locked if entry is deleted while being edited
  isEditing = false;
  submitBtn.disabled = false;
  sortMenu.disabled = false;
}