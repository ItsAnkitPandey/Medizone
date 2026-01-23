import React from 'react'
import '../styles/GlobalLoader.css'

const GlobalLoader = () => {
  return (
    <div className="global-loader-overlay">
          <div className="global-loader-spinner">
            <div className="spinner-large">
              <div className="pills-container">
                <div className="pill"></div>
                <div className="pill"></div>
                <div className="pill"></div>
                <div className="pill"></div>
              </div>
            </div>
            {/* <p>Processing...</p> */}
          </div>
        </div>
  )
}

export default GlobalLoader