import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadExpenses, saveCategoryExpense } from '../store/actions/expensesActions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ExpenseItemList from '../components/ExpenseItemList'
export default function ExpensesList() {
    const dispatch = useDispatch()
    const expenses = useSelector(state => state.expensesModule.expenses)
    const [expensesToShow, setExpensesToShow] = useState([])
    useEffect(() => {
        dispatch(loadExpenses())
    }, [])

    function toggleExpense(expense) {
        if (expensesToShow.includes(expense.id)) {
            const expToShow = expensesToShow.filter(exp => exp !== expense.id)
            setExpensesToShow(expToShow)
        } else {
            setExpensesToShow([...expensesToShow, expense.id])
        }
    }

    function saveExpense(expense, categoryExpense) {
        dispatch(saveCategoryExpense(expense, categoryExpense))
    }

    return (
        <TypeExpensesList>
            <h1>Tye Expenses!</h1>
            {expenses?.map(expense => {
                return (<ExpenseItem key={expense.id}>
                    <ExpenseItemHeader>
                        <span>{expense.type}</span>
                        <button onClick={() => toggleExpense(expense)}>
                            {expensesToShow.includes(expense.id) ? 'Hide' : 'Show'}
                        </button>
                    </ExpenseItemHeader>
                    {expensesToShow.includes(expense.id) &&
                        (expense.categoryExpenses.length > 0 ?
                            <ExpenseItemList expense={expense} saveExpense={saveExpense} />
                            :
                            <div>No exenses to show!</div>)}
                </ExpenseItem>)
            })}
            <Link to="/">Back</Link>
        </TypeExpensesList>
    )
}


const TypeExpensesList = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`

const ExpenseItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 10px;
`

const ExpenseItemHeader = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
`