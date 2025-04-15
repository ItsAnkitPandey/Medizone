import React, { useEffect } from 'react'
import './pageNotFound.css';
import PageNotFoundLogo from '../../images/pageNotFound.png'
import { Link } from 'react-router-dom';


const PageNotFound = () => {
    useEffect(()=>{
        const root = document.getElementById("root");
        let footer = root?.querySelector('.footer-wrapper');
        let dummyColor = root?.querySelector('.dummycolor');
        let navBg = root?.querySelector('.navheader');
        
            if (footer) footer.style.display = "none";
            if (dummyColor) dummyColor.style.display = "none";
            if(navBg) navBg.style.display = "none";
        
        // cleanup showing footer again when leaving the page 
        return ()=>{
            if (footer) footer.style.display = "";
            if (dummyColor) dummyColor.style.display = "";
            if(navBg) navBg.style.display = "";
        }
    },[])
  return (
    <div className='pageNotFound'>
        <div className="pagenotfoundcontainer">
            <img src={PageNotFoundLogo} alt="Page Not Found" />
        </div>
        <h1>Oops! Looks like page doesn't exists. Please go back to Home.</h1>
        <p><Link to='/'>Medizone Home</Link></p>
    </div>
  )
}

export default PageNotFound