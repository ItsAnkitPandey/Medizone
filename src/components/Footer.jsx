import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import logo from '../images/mdlogo.jpg'
const Footer = () => {
	return (
		<div className="footer-wrapper">
			<footer>
				<div className="footer">
					<div className="col-50">
						<div className="logo2 ">
							<img src={logo} alt="" />
						</div>
						<p className="sub-text">Your one-stop destination for all your medicinal needs,<br /> offering a wide range of high-quality products<br /> and convenient online shopping experience</p>
					</div>
					<div className="col-25">
						<h3>Quick Links</h3>
						<ul>
							<li><Link to='/'>Home</Link></li>
							<li><Link to="">Blog</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
						</ul>

					</div>
					<div className="col-26">
						<h3>About</h3>
						<ul>
							<li><Link to="">Shiping</Link></li>
							<li><Link to="">Terms & Conditions</Link></li>
							<li><Link to="">Privacy Policy</Link></li>
						</ul>
					</div>
				</div>
				<hr />
				<div className="footer-end">
					<p>Designed by Anchit Gupta and Ankit Pandey</p>
				</div>
			</footer>

		</div>
	)
}

export default Footer
