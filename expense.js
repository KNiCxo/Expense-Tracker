const expenseNameInput = document.getElementById('expense-name');
const expenseCostInput = document.getElementById('expense-cost');
const expenseDateInput = document.getElementById('expense-date');
const submitBtn = document.getElementById('submit');
const table = document.getElementById('table');

let sortType = 'sortOldest';

let expenseArray = [{
  name: 'Car Wash',
  cost: '20',
  date: '08/02/2023'
}, {
  name: 'Discord Nitro Classic',
  cost:'4.99',
  date: '10/12/2023'
},{
  name: 'Birthday Gift',
  cost:'74.31',
  date: '10/13/2023'
}];

console.log(expenseArray[1].date.slice(6));

expenseNameInput.value = '';
expenseCostInput.value = '';
expenseDateInput.value = '';

drawTable();

submitBtn.addEventListener('click', addExpense);

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

// 10/02/2023
// 0123456789
function insertOldest(name, cost, date) {
    for (let i = 0; i < expenseArray.length; i++) {
      if (date == expenseArray[i].date) {
        //pass
      } else if (Number(date.slice(6)) < Number(expenseArray[i].date.slice(6))){ // 2019 < 2023
        expenseArray.splice(i, 0, {
          name,
          cost,
          date
        });
        return;
      } else if (Number(date.slice(6)) == Number(expenseArray[i].date.slice(6))) {
        if (Number(date.slice(0,2)) < Number(expenseArray[i].date.slice(0,2))) { // 8 < 10
          expenseArray.splice(i, 0, {
            name,
            cost,
            date
          });
          return;
        } else if (Number(date.slice(0,2)) == Number(expenseArray[i].date.slice(0,2))) {
          if (Number(date.slice(3,5) < Number(expenseArray[i].date.slice(3,5)))) { // 11 < 12
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
    expenseArray.push({
      name,
      cost,
      date
    });
}

function addExpense() {
  if (expenseNameInput.value == '' || expenseCostInput.value == '' || expenseDateInput.value == '' || isNaN(expenseCostInput.value)) {
    expenseNameInput.value = '';
    expenseCostInput.value = '';
    expenseDateInput.value = '';
    return;
  }

  const name = expenseNameInput.value;
  const cost = expenseCostInput.value;
  const date = `${expenseDateInput.value.slice(5,7)}/${expenseDateInput.value.slice(8,10)}/${expenseDateInput.value.slice(0,4)}`;
  insertOldest(name, cost, date);

  table.innerHTML = 
  `<tr>
    <th>Expense</th>
    <th>Cost</th>
    <th>Date</th>
  </tr>`;

  drawTable();
  expenseArray.forEach((index) => console.log(index));

  expenseNameInput.value = '';
  expenseCostInput.value = '';
  expenseDateInput.value = '';
}