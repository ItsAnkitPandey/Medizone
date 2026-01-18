import React from 'react'
import { Link } from 'react-router-dom'

const BotButton = () => {
  return (
    <div className='bot-button-container'>
        <Link className='bot-button' to = '/chatbot'></Link>
    </div>
  )
}

export default BotButton