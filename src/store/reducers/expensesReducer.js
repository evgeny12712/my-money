const INITIAL_STATE = {
    expenses: []
}

export function expensesReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'LOAD_EXPENSES':
            return {
                ...state,
                expenses: [...action.expenses]
            }
        case 'ADD_TYPE':
            return {
                ...state,
                expenses: [...state.expenses, action.newType]
            }
        case 'REMOVE_TYPE':
            return {
                ...state,
                expenses: state.expenses.filter(exp => exp.id !== action.expense.id)
            }
        case 'UPDATE_TYPE':
            return {
                ...state,
                expenses: state.expenses.map(exp => {
                    if (exp.id !== action.expense.id) return exp
                    return action.expense
                })
            }
        default:
            return state
    }
}