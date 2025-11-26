import React from 'react'
import './ChatbotPromo.css'
const ChatbotPromo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(()=>{
    const handleSize = ()=>{
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener('resize', handleSize);
    return ()=>{
      window.removeEventListener('resize', handleSize);
    }
  },[]);
  return (
    <>
      <section className="chatbot-promo">
                <div className="chatbot-promocontainer">
                    <div className="promo-content">
                        <div className="promo-text">
                            <h2>Need Medicine Guidance?</h2>
                            <p>Our AI-powered chatbot is here to help you find the right medicines and answer your health queries 24/7.</p>
                            <div className="promo-features">
                                <div className="feature">
                                    <i className="fa-solid fa-robot"></i>
                                    <span>AI-Powered Assistance</span>
                                </div>
                                <div className="feature">
                                    <i className="fa-solid fa-clock"></i>
                                    <span>Available 24/7</span>
                                </div>
                                <div className="feature">
                                    <i className="fa-solid fa-comments"></i>
                                    <span>Instant Responses</span>
                                </div>
                            </div>
                        </div>
                        <div className="promo-image">
                            <i className={`fa-solid fa-comments ${isMobile ? 'fa-4x' : 'fa-8x'}`}></i>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default ChatbotPromo
