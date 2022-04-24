import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loadExpenses from '../store/actions/expensesActions'
import styled from 'styled-components'
export default function ExpensesList({ expenses }) {
    return (
        <Expenses>
            {expenses?.map(expense => {
                return expense.amount !== 0 && expense.amount &&
                    <ExpensesItem key={expense.id}>
                        <span>{expense.type}: </span>
                        <span>{expense.amount}</span>
                    </ExpensesItem>
            })}
        </Expenses>
    )
}


const Expenses = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
`

const ExpensesItem = styled.div`
    display: flex;
    gap: 10px;
`