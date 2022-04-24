import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addExpense, loadExpenses } from '../store/actions/expensesActions'
import ExpensesList from '../components/ExpensesList.js'
import AddExpense from '../components/AddExpense'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
export default function Home() {
    const expenses = useSelector(state => state.expensesModule.expenses)
    const dispatch = useDispatch()

    function onAdd(amount, currency, type, reason) {
        dispatch(addExpense({ amount, currency, type, reason }, expenses))
    }

    useEffect(() => {
        if (!expenses?.length) {
            dispatch(loadExpenses())
        }
    }, [expenses])

    return (
        <HomePage>
            <Links>
                <Link to="/types_manager">Types Manager</Link>
                <Link to="/types_expenses">Types Expenses</Link>
            </Links>
            <AddExpense onAdd={onAdd} expenses={expenses} />
            <ExpensesList expenses={expenses} />
        </HomePage>
    )
}

const HomePage = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
`

const Links = styled.section`
    display: flex;
    gap: 40px;
    font-family: Arial;
    font-weight: 600;
     & a {
         color: #1f1f1f;
         border: 1px solid #1f1f1f;
         background-color: whitesmoke;
         border-radius: 8px;
         padding: 7.5px 15px;
         &:hover {
            color: whitesmoke;
            border: 1px solid whitesmoke;
            background-color: #1f1f1f;
            transition: all 0.5s;
         }
     }
`