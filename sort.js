// Array to store list of expenses
export let expenseArray = JSON.parse(localStorage.getItem('expenseArray'));
if (!expenseArray) {
  expenseArray = [];
}

// If array is empty, then push entry into array
function checkEmpty(name, cost, date, array) {
   if (array.length == 0) {
    array.push({
      name,
      cost,
      date
    });
    return true;
  }
}

// Inserts element into array
function insert(push, index, name, cost, date, array) {
  // If push == true, then push into array
  // Else, splice into array and insert
  if (push) {
    array.push({
      name,
      cost,
      date
    });
  } else {
    array.splice(index, 0, {
      name,
      cost,
      date
    });
  }
}

// Inserts the expense into the array based on the "Newest" sort order
export function insertNewest(name, cost, date, array) {
  // If array is empty, push element into array and return
  if (checkEmpty(name, cost, date, array)) {
    return;
  }

  // Iterates through entire array or until return statement
  for (let i = 0; i < array.length; i++) {
    // If dates match, then insert in front of element
    if (date == array[i].date) {
      insert(false, i, name, cost, date, array);
      return;
    } else if (Number(date.slice(6)) > Number(array[i].date.slice(6))){
      // If entry year is greater than element year, then insert in front of element
      insert(false, i, name, cost, date, array);
      return;
    } else if (Number(date.slice(6)) == Number(array[i].date.slice(6))){
      // If entry year and element year are the same, then check if entry month is greater than element month
      if (Number(date.slice(0,2)) > Number(array[i].date.slice(0,2))) {
        // If entry month is greater than element month, then insert in front of element
        insert(false, i, name, cost, date, array);
        return;
      } else if (Number(date.slice(0,2)) == Number(array[i].date.slice(0,2))) {
        // If entry month and element month are the same, then check if entry day is greater than element day
        if (Number(date.slice(3,5) > Number(array[i].date.slice(3,5)))) {
          // If entry day is greater than element day, then insert in front of element
          insert(false, i, name, cost, date, array);
          return;
        }
      }
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  insert(true, 0, name, cost, date, array);
}

// Inserts the expense into the array based on the "Oldest" sort order
export function insertOldest(name, cost, date, array) {
  // If array is empty, push element into array and return
  if (checkEmpty(name, cost, date, array)) {
    return;
  }

  // Iterates through entire array or until return statement
  for (let i = 0; i < array.length; i++) {
    // If dates match, ignore (This causes the expense to be inserted at the end of all matching dates)
    if (date == array[i].date) {
      //pass
    } else if (Number(date.slice(6)) < Number(array[i].date.slice(6))){
      // If entry year is less than element year, then insert in front of element
      insert(false, i, name, cost, date, array);
      return;
    } else if (Number(date.slice(6)) == Number(array[i].date.slice(6))) {
      // If entry year and element year are the same, then check if entry month is less than element month
      if (Number(date.slice(0,2)) < Number(array[i].date.slice(0,2))) {
        // If entry month is less than element month, then insert in front of element
        insert(false, i, name, cost, date, array);
        return;
      } else if (Number(date.slice(0,2)) == Number(array[i].date.slice(0,2))) {
        // If entry month and element month are the same, then check if entry day is less than element day
        if (Number(date.slice(3,5) < Number(array[i].date.slice(3,5)))) {
          // If entry day is less than element day, then insert in front of element
          insert(false, i, name, cost, date, array);
          return;
        }
      }
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  insert(true, 0, name, cost, date, array);
}

// Inserts the expense into the array based on "Most Expensive" sort order
export function insertMostExpensive(name, cost, date, array) {
  // If array is empty, push element into array and return
  if (checkEmpty(name, cost, date, array)) {
    return;
  }

  // Iterates through entire array or until return statement
  for (let i = 0; i < array.length; i++) {
    // If entry cost is greater than element cost, then insert in front of element
    if (Number(cost) > Number(array[i].cost)) {
      insert(false, i, name, cost, date, array);
      return;
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  insert(true, 0, name, cost, date, array);
}

// Inserts the expense into the array based on "Least Expensive" sort order
export function insertLeastExpensive(name, cost, date, array) {
  // If array is empty, push element into array and return
  if (checkEmpty(name, cost, date, array)) {
    return;
  }

  // Iterates through entire array or until return statement
  for (let i = 0; i < array.length; i++) {
    // If entry cost is less than element cost, then insert in front of element
    if (Number(cost) < Number(array[i].cost)) {
      insert(false, i, name, cost, date, array);
      return;
    }
  }
  // If array is iterated through entirely, then push entry to end of array
  insert(true, 0, name, cost, date, array);
}

// Sorts array by newest dates first
export function sortNewest() {
  // Creates a temp array to store sorted values
  let tempArray = [];
  
  for (let i = 0; i < expenseArray.length; i++) {
    insertNewest(expenseArray[i].name, expenseArray[i].cost, expenseArray[i].date, tempArray);
  }

  expenseArray = tempArray;
}

// Sorts array by oldest dates first
export function sortOldest() {
  // Creates a temp array to store sorted values
  let tempArray = [];
  
  for (let i = 0; i < expenseArray.length; i++) {
    insertOldest(expenseArray[i].name, expenseArray[i].cost, expenseArray[i].date, tempArray);
  }

  expenseArray = tempArray;
}

// Sorts array by most expensive costs first
export function sortMostExpensive() {
  // Creates a temp array to store sorted values
  let tempArray = [];
  
  for (let i = 0; i < expenseArray.length; i++) {
    insertMostExpensive(expenseArray[i].name, expenseArray[i].cost, expenseArray[i].date, tempArray);
  }

  expenseArray = tempArray;
}

// Sorts array by least expenseive costs first
export function sortLeastExpensive() {
  // Creates a temp array to store sorted values
  let tempArray = [];
  
  for (let i = 0; i < expenseArray.length; i++) {
    insertLeastExpensive(expenseArray[i].name, expenseArray[i].cost, expenseArray[i].date, tempArray);
  }

  expenseArray = tempArray;
}