import React from 'react'
import { Link } from 'react-router-dom'
import { team } from '../../components/Products'
const About = () => {
    return (
        <div>
            <div className="about-med">
                <div className='med-heading'>
                    <h1>About Us</h1>
                    <div className='line'></div>
                </div>
                <div className='about-medizone'>
                    <p>ABOUT MEDIZONE:- <br />India's Leading and Most-trusted Online Healthcare Aggregator: Tired of rushing to the nearest chemist/ medical store to buy monthly medicines? You need not do so anymore! PharmEasy, your very own online healthcare and medicine delivery platform delivers 100% genuine medicines right to your doorstep. PharmEasy is pharmacy made easy. In a short span of three years, we have established ourselves as India’s leading online healthcare and medicine delivery platform, catering to two million customers pan India. Through our mobile app and website, we help customers (patients and their caregivers) connect with local pharmacy stores and diagnostic centers to fulfill their extensive medical needs. We firmly believe that everyone should have access to good health and that health care should be affordable to all. Taking this belief forward, we offer 100% genuine medicines at FLAT 20% OFF, up to 70% OFF on Diagnostic tests and up to 50% OFF on healthcare products, ensuring highest savings in the shortest time possible. We now deliver medicines in 1000+ cities in India, covering 22000+ pin codes. We offer diagnostic tests in Mumbai including Thane, Navi Mumbai, Kalyan & Dombivali, in Delhi, Noida, Gurgaon, Faridabad & Ghaziabad (entire NCR), Chennai, Pune, Ahmedabad, and Gandhi Nagar, Surat, Vadodara, Lucknow, Kolkata, Hyderabad, Bengaluru, and Jaipur.</p>
                </div>
            </div>
            <div className="about-team">
                <div className='med-heading'>
                    <h1>Meet Our Amazing Team</h1>
                    <div className='line'></div>
                </div>
                <div className="team">
                    {team.map((person) => {
                        return <div key={person.id} className="team-details">
                            <img src={person.img} alt="" />
                            <h3>{person.name}</h3>
                            <p>{person.role}</p>
                            <div>
                                <Link to={person.instagram}><i className="fa-brands fa-instagram fa-2x"></i></Link>
                                <Link to={person.facebook}><i className="fa-brands fa-facebook fa-2x"></i></Link>
                                <Link to={person.whatsapp}><i className="fa-brands fa-whatsapp fa-2x"></i></Link>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default About
