import React from 'react'
import { Link } from 'react-router-dom'
import { team } from '../../utils/Products'
import './About.css'
const About = () => {
    return (
        <>
            <div className="about_wrapper">
                <div className='about-img'>
                    <h1>Building <span>Medizone</span> - A Healthier Tomorrow Starts Today</h1>
                </div>
                <article className='our-story'>
                    <div className="story-container">
                        <div className="our-story-header">
                            Our Story
                        </div>
                        <div className="our-story-content">
                            <p>Medizone began as a shared vision between two college friends - one with passion for the technology and the other
                                a medicine expert deeply connected to the healthcare industry. During our college days, we realized a big gap in affordable
                                and accesible online medicine platforms, especially those that also offer helpful guidance.
                            </p>
                            <p> With a combination of technical knowledge and pharmaceutical expertise, we set to build Medizone - a medical e-commerce platform that goes beyond
                                that goes beyond just selling medicines. Our mission is to simplify the online pharmacy experience with a huamn touch,
                                driven by innovation.
                            </p>
                            <p>One of the key features that makes Medizone unique is our integrated AI-powered chatbot, designed to guide customers in choosing
                                over the counter medicines, health tips, and product suggetions. We're actively building features that bring more clarity, trust,
                                and convenience to every medical purchase.
                            </p>
                            <p>We are just getting started. Our future goals include:
                                <ul>
                                    <li>Launching a verified prescription-upload system for safer purchases.</li>
                                    <li>Parterning with local license local pharmacies for faster delivery.</li>
                                    <li>Adding multilingual support for users across India.</li>
                                    <li>Expanding chatbot capabilities with doctor consultation support.</li>
                                </ul>
                            </p>
                            <p>We believe in making healthcare simple, smart, and accessible for everyone. Thank you for being part of the journey.</p>
                            <p><b>- The Medizone Team</b></p>
                        </div>
                    </div>
                </article>
                <div className="about-team">
                    <div className='about-heading'>
                        <h1>Meet Our Amazing Team</h1>
                    </div>
                    <div className="team mob-about">
                    {team.map((person) => { 
                         return <div key={person.id} className="team-details mob-about-card">
                            <div className="team-img">
                                <img src={person.img} alt="team member" />
                                <div className='socialNet'>
                                    <Link to={person.instagram}><i className="fa-brands fa-linkedin fa-2x"></i></Link>
                                    <Link to={person.facebook}><i className="fa-brands fa-facebook fa-2x"></i></Link>
                                    <Link to={person.whatsapp}><i className="fa-brands fa-instagram fa-2x"></i></Link>
                                </div>
                            </div>
                            <div className="details">
                                <h2 className='personName'>{person.name}</h2>
                                <p className='personRole'>{person.role}</p>
                                <p className='personDetails'>{person.details}</p>
                                <blockquote className='personSlogan'>{person.slogan}</blockquote>
                                
                            </div>
                        </div>
                         })}
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
