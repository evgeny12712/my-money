import React from 'react'
import styled from 'styled-components'
export default function AppHeader() {
    return (
        <Header>
            <h1>my money up</h1>
        </Header>
    )
}

const Header = styled.header`
    height: 90px;
    background-color: darkgrey;
    display: flex;
    align-items: center;
    justify-content: center;
    border-block-end: 3px solid grey;
    margin-block-end: 50px;
    & h1 {
        text-transform: uppercase;
        color:whitesmoke;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        letter-spacing: 0.875rem;
        text-shadow: 0 0 0 rgb(0,0,0);
        font-weight: bold;
    }
`
