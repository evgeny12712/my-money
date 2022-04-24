import { storageService } from './async-storage-service'
import makeId from './utilService'
export default {
    query,
    addExpense,
    addType,
    removeType,
    saveType,
    saveCategoryExpense
}

async function query() {
    let expenses = await storageService.query('expenses')
    if (!expenses.length) {
        expenses = _createEmptyExpenses()
        storageService.save('expenses', expenses)
    }
    return expenses
}

async function addExpense(expense, expenses) {
    expense.id = makeId()
    console.log(Date.now())
    expense.date = Date.now()
    const idx = expenses.findIndex(exp => exp.type === expense.type)
    if (idx < 0) return
    expenses[idx].categoryExpenses.push(expense)
    calculateTotalCategory(expenses[idx])
    return expenses
}

async function calculateTotalCategory(expense) {
    const sum = expense.categoryExpenses.reduce((acc, exp) => {
        return acc += Number(exp.amount)
    }, 0)
    expense.amount = sum
    storageService.put('expenses', expense)
}

async function addType(type) {
    const newType = await storageService.post('expenses', { amount: '', type: type.toLowerCase(), categoryExpenses: [] })
    return newType
}

async function removeType(expense) {
    storageService.remove('expenses', expense.id)

}

async function saveType(expense) {
    return await storageService.put('expenses', expense)
}

async function saveCategoryExpense(expense, categoryExpense) {
    const idx = expense.categoryExpenses.findIndex(categoryExp => categoryExp.id === categoryExpense.id)
    if (idx >= 0) expense.categoryExpenses.splice(idx, 1, categoryExpense)
    saveType(expense)
    return expense
}

function _createEmptyExpenses() {
    return [
        { id: makeId(), type: 'groceries', amount: 0, categoryExpenses: [] },
        { id: makeId(), type: 'transport', amount: 0, categoryExpenses: [] },
        { id: makeId(), type: 'restaurants', amount: 0, categoryExpenses: [] },
    ]
}