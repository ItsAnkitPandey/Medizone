import React from 'react'
import './Button.css'

const Button = ({ name, onClick, type }) => {
    return (
        <>
            <button className='m-5 p-10 common-btn' onClick={onClick} type={type}>{name}</button>
        </>
    )
}

export default Button