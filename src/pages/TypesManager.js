import React, { useEffect, useRef, useState } from 'react'
import AddExpenseType from '../components/AddExpenseType'
import { useSelector, useDispatch } from 'react-redux'
import { loadExpenses, addExpensesType, removeExpenseType, saveType } from '../store/actions/expensesActions'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function TypesManager() {
    const dispatch = useDispatch()
    const expenses = useSelector(state => state.expensesModule.expenses)
    const [expensesToShow, setExpensesToShow] = useState()
    const [expenseToEdit, setExpenseToEdit] = useState()
    const [editedTypeName, setEditedTypeName] = useState('')
    const inputRef = useRef()

    useEffect(() => {
        dispatch(loadExpenses())
    }, [])

    useEffect(() => {
        setExpensesToShow(expenses)
    }, [expenses])

    useEffect(() => {
        inputRef.current?.focus()
    }, [expenseToEdit])

    function addType(type) {
        if (expensesToShow.some(exp => exp.type === type)) return
        dispatch(addExpensesType(type))
        dispatch(loadExpenses())
    }

    function removeType(expense) {
        dispatch(removeExpenseType(expense))
    }

    function editType(expense) {
        if (!editedTypeName.length) {
            toggleEdit(expense)
            return
        }
        const expenseCopy = JSON.parse(JSON.stringify(expense))
        expenseCopy.type = editedTypeName
        dispatch(saveType(expenseCopy))
        setEditedTypeName('')
        toggleEdit(expenseCopy)
    }

    function editTypeName({ target }) {
        let expensesToShowCopy = JSON.parse(JSON.stringify(expensesToShow))
        expensesToShowCopy.forEach(expense => {
            if (expense.id === expenseToEdit) {
                expense.type = target.value
            }
        })
        setExpensesToShow(expensesToShowCopy)
        setEditedTypeName(target.value)
    }

    function toggleEdit(expense) {
        if (expenseToEdit === expense.id) setExpenseToEdit()
        else setExpenseToEdit(expense.id)
    }

    return (
        <TypesManage>
            <AddExpenseType addType={addType} />
            <Types>
                {expensesToShow?.map(expense => <TypeItem key={expense.id}>
                    {!(expenseToEdit === expense.id) ?
                        <span onClick={() => toggleEdit(expense)}>{expense.type}</span>
                        :
                        <input type="text"
                            ref={inputRef}
                            onChange={editTypeName}
                            value={expense.type}
                            onBlur={() => editType(expense)}
                            onKeyUp={(e) => e.key === 'Enter' ? editType(expense) : ''} />
                    }
                    <button onClick={() => removeType(expense)}>X</button>
                    {!(expenseToEdit === expense.id) && <button onClick={() => toggleEdit(expense)}>Edit</button>}
                </TypeItem>)}
            </Types>
            <Link to="/">Back</Link>
        </TypesManage>
    )
}



const Types = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

const TypeItem = styled.div`
    display: flex;
    gap: 10px;
    & input {
        width: 80px;
        border-radius: 4px;
        border: 1px solid #999;
        outline: none;
        text-align: center;
        font-size: 1rem;
    }
    & button {
        background-color: whitesmoke;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            transform: scale(1.2, 1.2);
            transition: all .2s;
        }
    }
`

const TypesManage = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    & a {
        color: #1f1f1f;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 600;
        letter-spacing: 0.1rem;
        padding-block-end: 2px;
        &:hover {
            border-block-end: 1px solid #1f1f1f;
            transition: all .5s;
        }
    }
`