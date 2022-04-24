import React, { useState } from 'react'
import styled from 'styled-components'
export default function ExpenseItemList({ expense, saveExpense }) {
    const [categoryExpensesToEdit, setCategoryExpensesToEdit] = useState()
    const [categoryExpenseCopy, setCategoryExpenseCopy] = useState()

    const toggleEdit = (categoryExpense) => {
        if (categoryExpensesToEdit === categoryExpense.id) {
            setCategoryExpensesToEdit()
            setCategoryExpenseCopy()
        } else {
            setCategoryExpensesToEdit(categoryExpense.id)
            setCategoryExpenseCopy(JSON.parse(JSON.stringify(categoryExpense)))
        }
    }

    const handleChange = ({ target }) => {
        const copy = JSON.parse(JSON.stringify(categoryExpenseCopy))
        if (target.name === 'amount') copy.amount = target.value
        else if (target.name === 'reason') copy.reason = target.value
        setCategoryExpenseCopy(copy)
    }

    const expenseSave = (expense) => {
        saveExpense(expense, categoryExpenseCopy)
        toggleEdit(categoryExpenseCopy)
    }

    return (
        expense.categoryExpenses.map(categoryExpense => {
            return (
                <SpecificExpenses key={categoryExpense.id}>
                    <ExpenseDetails>
                        {(categoryExpensesToEdit !== categoryExpense.id) ? <section>
                            <div>Reason :  {categoryExpense.reason}</div>
                            <div>Amount : {categoryExpense.amount} <span>{categoryExpense.currency}</span></div>
                            {categoryExpense.date && <div>Date : {new Date(categoryExpense.date).toLocaleTimeString() + ', ' + new Date(categoryExpense.date).toLocaleDateString()}</div>}
                        </section>
                            :
                            <ExpenseEdit>
                                <ExpenseEditItem>
                                    Reason :
                                    <input type="text"
                                        name="reason"
                                        value={categoryExpenseCopy.reason} onChange={handleChange} />
                                </ExpenseEditItem>
                                <ExpenseEditItem>
                                    Amount :
                                    <input type="text"
                                        name="amount"
                                        value={categoryExpenseCopy.amount} onChange={handleChange} />
                                </ExpenseEditItem>
                                <Buttons>
                                    <button onClick={() => expenseSave(expense)}>Save changes</button>
                                    <button onClick={toggleEdit}>Cancle</button>
                                </Buttons>
                            </ExpenseEdit>}
                        {(categoryExpensesToEdit !== categoryExpense.id) ?
                            <button onClick={() => toggleEdit(categoryExpense)}>Edit</button> : ''}
                    </ExpenseDetails>
                    < SeparateLine />
                </SpecificExpenses>
            )
        })
    )
}


const SpecificExpenses = styled.div`

`

const ExpenseDetails = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

`

const SeparateLine = styled.div`
    width: 100%;
    height: 1px;
    background-color: #999;
    margin-block: 10px;
`

const ExpenseEdit = styled.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    & input {
        border: 1px solid #999;
        border-radius: 4px;
    }
`

const ExpenseEditItem = styled.label`
    display: flex;
    gap: 10px;
`

const Buttons = styled.div`
    display: flex;
    gap: 10px;
    & button {
        color: #1f1f1f;
        border: 0;
        padding: 5px 10px;
        border: 1px solid #999;
        transition: all 0.5s;
        cursor: pointer;
        border-radius: 4px;
    }
    & :first-child {
        background-color: greenyellow;
        &:hover {
            border: 1px solid greenyellow;
            color: greenyellow;
            background-color: #1f1f1f;
        }
    }
    & :last-child {
        background-color: red;      
        &:hover {
            border: 1px solid red;
            color: red;
            background-color: #1f1f1f;
        }  
    }
`