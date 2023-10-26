const expenseNameInput = document.getElementById('expense-name');
const expenseCostInput = document.getElementById('expense-cost');
const expenseDateInput = document.getElementById('expense-date');
const submitBtn = document.getElementById('submit');
const table = document.getElementById('table');

let expenseArray = [{
  name: 'Car Wash',
  cost: '20',
  date: '10/02/2023'
}, {
  name: 'Discord Nitro Classic',
  cost:'4.99',
  date: '10/10/2023'
}];

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

  expenseArray.push({
    name,
    cost,
    date
  })

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