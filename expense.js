const expenseNameInput = document.getElementById('expense-name');
const expenseCostInput = document.getElementById('expense-cost');
const expenseDateInput = document.getElementById('expense-date');
const submitBtn = document.getElementById('submit');
const table = document.getElementById('table');

expenseNameInput.value = '';
expenseCostInput.value = '';
expenseDateInput.value = '';

submitBtn.addEventListener('click', addExpense);

function addExpense() {
  if (expenseNameInput.value == '' || expenseCostInput.value == '' || expenseDateInput.value == '' || isNaN(expenseCostInput.value)) {
    console.log(isNaN(expenseCostInput));
    expenseNameInput.value = '';
    expenseCostInput.value = '';
    expenseDateInput.value = '';
    return;
  }

  const expenseName = expenseNameInput.value;
  const expenseCost = expenseCostInput.value;
  const expenseDate = `${expenseDateInput.value.slice(5,7)}/${expenseDateInput.value.slice(8,10)}/${expenseDateInput.value.slice(0,4)}`;
  const tableEntry = document.createElement('tr');

  tableEntry.innerHTML = `
   <td>${expenseName}</td>
   <td>${expenseCost}</td>
   <td>${expenseDate}</td>`;

  table.append(tableEntry);

  expenseNameInput.value = '';
  expenseCostInput.value = '';
  expenseDateInput.value = '';
}
