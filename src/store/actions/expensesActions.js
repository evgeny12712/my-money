import expensesService from "../../services/expensesService"
export function loadExpenses() {
    return async (dispatch) => {
        const expenses = await expensesService.query()
        dispatch({ type: 'LOAD_EXPENSES', expenses })
    }
}

export function addExpense(expense, expenses) {
    return async (dispatch) => {
        const updatedExpenses = await expensesService.addExpense(expense, expenses)
        console.log('updatedExpenses', updatedExpenses);
        dispatch({ type: 'LOAD_EXPENSES', expenses: updatedExpenses })
    }
}

export function addExpensesType(type) {
    return async (dispatch) => {
        const newType = await expensesService.addType(type)
        dispatch({ type: 'ADD_TYPE', newType })
    }
}

export function removeExpenseType(expense) {
    return async (dispatch) => {
        await expensesService.removeType(expense)
        dispatch({ type: 'REMOVE_TYPE', expense })
    }
}

export function saveType(expense) {
    return async (dispatch) => {
        const updatedExpense = await expensesService.saveType(expense)
        dispatch({ type: 'UPDATE_TYPE', expense: updatedExpense })
    }
}

export function saveCategoryExpense(expense, categoryExpense) {
    return async (dispatch) => {
        const updatedExpense = await expensesService.saveCategoryExpense(expense, categoryExpense)
        dispatch({ type: 'UPDATE_TYPE', expense: updatedExpense })
    }
}