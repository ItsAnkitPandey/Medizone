import React from 'react'

const Chatbot = () => {
    return (
        <div className='bot-container'>
            <iframe
                allow="microphone;"
                width="350"
                height="430"
                src="https://console.dialogflow.com/api-client/demo/embedded/11e11d00-2829-49fa-9bda-c089c4c08efc">
            </iframe>
        </div>
    )
}

export default Chatbot