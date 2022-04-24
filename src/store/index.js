import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { expensesReducer } from "./reducers/expensesReducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
    expensesModule: expensesReducer
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
window.myStore = store;