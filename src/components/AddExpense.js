import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
export default function AddExpense({ onAdd, expenses }) {

    const [amount, setAmount] = useState()
    const [currency, setCurrency] = useState('₪')
    const [reason, setReason] = useState('')
    const [type, setType] = useState('')

    function handleChange({ target }) {
        console.log('target.type', target.type);

        switch (target.name) {
            case 'amount':
                setAmount(target.value)
                break;
            case 'currency':
                setCurrency(target.value)
                break;
            case 'reason':
                setReason(target.value)
                break;
            case 'type':
                setType(target.value)
                console.log('true', true);
                break;
        }
    }

    function onAddExpense(ev) {
        ev.preventDefault()
        if (amount === 0 || type === '' || reason === '') return
        onAdd(amount, currency, type, reason)
    }

    return (
        <section>
            <Form onSubmit={onAddExpense}>
                <div className="amount-container">
                    <Label>
                        <span>Amount :</span>
                        <input type="number" value={amount} name="amount" onChange={handleChange} />
                    </Label>
                    <select name="currency" value={currency} onChange={handleChange}>
                        <option>₪</option>
                        <option>$</option>
                        <option>€</option>
                    </select>
                </div>
                <Label>
                    <span>Reason :</span>
                    <input type="text" value={reason} name="reason" onChange={handleChange} />
                </Label>
                <Label>
                    <span>Type :</span>
                    <select value={type} onChange={handleChange} name="type">
                        <option></option>
                        {expenses?.map(expense => <option key={expense.id} value={expense.type.toLowerCase()}>{expense.type}</option>)}
                    </select>
                </Label>
                <button>Add</button>
            </Form>
        </section>)
}


const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 30px;
    font-family: Arial;
    letter-spacing: 0.05rem;
    & .amount-container {
        display: flex;
        gap: 20px;
        & select {
            outline: none;
            padding: 5px;
        }
    }
    & button {
        width: fit-content;
        color: #1f1f1f;
        border: 1px solid #1f1f1f;
        background-color: whitesmoke;
        border-radius: 8px;
        padding: 7.5px 15px;
        cursor: pointer;
        margin: auto;
        &:hover {
           color: whitesmoke;
           border: 1px solid whitesmoke;
           background-color: #1f1f1f;
           transition: all 0.5s;
        }    
    }
`

const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    & input, select {
        outline: none;
        border: 1px solid #999;
        padding: 5px 10px;
        font-size: 1rem;
        border-radius: 4px;
    }
`