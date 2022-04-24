import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
export default function AddExpenseType({ addType }) {
    const [type, setType] = useState('')

    function handleChange({ target }) {
        setType(target.value)
    }

    function addExpenseType() {
        addType(type)
        setType('')
    }

    return (
        <ExpenseType>
            <label>
                <span>Add Type : </span>
                <input type="text" value={type} onChange={handleChange} />
            </label>
            <button onClick={addExpenseType}>Add</button>
        </ExpenseType>
    )
}


const ExpenseType = styled.div`
    display: flex;
    gap: 20px;
    & label {
        display: flex;
        gap: 15px;
        & input {
            border-radius: 4px;
            outline: none;
            border: 1px solid #999;
        }
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