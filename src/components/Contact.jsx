import React from 'react'

const Contact = () => {
    return (
        <div className='mail-container'>
            <div className="contact-hed">
                <div className='med-heading'>
                    <h1>Contact Us</h1>
                    <div className='line'></div>
                </div>
            </div>
            <div className="contact">
                <div className="info">
                    <div className='d-flex ai-center jc-center '>
                        <i class="fa-solid fa-house fa-2x m-5">  </i>
                        <div className="address">
                            <h4>Address</h4>
                            <p>DDU University Gorakhpur</p>
                        </div>
                    </div>
                    <div className='d-flex ai-center jc-center '>
                        <i class="fa-regular fa-envelope-open  m-5 fa-2x"> </i>
                        <div className="address">
                            <h4>Mail us</h4>
                            <p>support@medizone.com</p>
                        </div>
                    </div>
                    <div className='d-flex ai-center jc-center '>
                        <i class="fa-solid fa-phone fa-2x m-5">   </i>
                        <div className="address">
                            <h4>Call Us</h4>
                            <p>+91 6391735294</p>
                        </div>
                    </div>
                </div>
                <div >
                    <form className="send-mail" action='https://formspree.io/f/xqkvarnr'
                        method='POST'>
                        <input type="text" name="name" placeholder='Enter Your Name' id="" />
                        <input type="email" name="email" placeholder='Enter Your Email' id="" />
                        <textarea name="message" id="" cols="20" rows="8" placeholder='Type your message here'></textarea>
                        <button  type='submit'>Send Mail</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Contact
