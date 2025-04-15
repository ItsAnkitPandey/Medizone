import React from 'react'

const Contact = () => {
    return (
        <div className='mail-container'>
            <div className="contact-hed">
                <h1>Get in <span>Touch</span> with us</h1>
            </div>
            <div className="contact">
                <div className="info">
                    <div className='addrss-info'>
                        <i className="fa-solid fa-house fa-2x m-5">  </i>
                        <div className="address">
                            <h4>Address</h4>
                            <p>DDU University Gorakhpur</p>
                        </div>
                    </div>
                    <div className='addrss-info'>
                        <i className="fa-regular fa-envelope-open  m-5 fa-2x"> </i>
                        <div className="address">
                            <h4>Mail us</h4>
                            <p>support@medizone.com</p>
                        </div>
                    </div>
                    <div className='addrss-info'>
                        <i className="fa-solid fa-phone fa-2x m-5">   </i>
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
                        <button type='submit'>Send Mail</button>
                    </form>
                </div>
            </div>

            <div className="map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3511.1473884862207!2d77.33326117527835!3d28.354393275817852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdb7ede953e45%3A0x115a196020ba43ac!2sShri%20Khatu%20Shyam%20Mandir!5e0!3m2!1sen!2sin!4v1727377862551!5m2!1sen!2sin"
                    title="store-loaction" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
                    style={{border: "0px"}}>
                </iframe>
            </div>


        </div>
    )
}

export default Contact
