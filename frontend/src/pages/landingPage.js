import React, { useEffect, useRef } from 'react';
import "../utils/styles/landingPage.css"
import landingPic from "../utils/landingpage.png"
import { Button } from '@radix-ui/themes';
import { useNavigate, useLocation } from "react-router-dom";

function LandingPage() {

    const aboutRef = useRef()
    const startRef = useRef()

    const navigate = useNavigate();
    let location = useLocation();
    let { pathname } = location;

    const toLoginPage = () => {
        navigate("/auth/login")
    }
    const toSignupPage = () => {
        navigate("/auth/signup")
    }

    return (
        <div >
            <div className="header-container">
                <h1>Contacts</h1>
                <nav>
                    <Button onClick={() => { startRef.current?.scrollIntoView({ behavior: "smooth", }) }} className='buttons' id='landing-topright' size="3" color="gray" variant="outline" radius='full'>Get Started</Button>
                    <Button onClick={() => { aboutRef.current?.scrollIntoView({ behavior: "smooth", }) }} className='buttons' id='landing-topright' size="3" color="gray" variant="outline" radius='full'>About</Button>
                </nav>
            </div>

            <section ref={startRef} className="hero">
                <div className="hero-content">
                    <h2>Expand your circle and keep them tighter!</h2>
                    <div className="auth-header">
                        <Button onClick={toSignupPage} className='buttons' id='auth-btns' size="4" color="cyan" variant="solid" radius='full'>Join Now</Button>

                        <Button onClick={toLoginPage} className='buttons' id='auth-btns' size="4" color="cyan" variant="solid" radius='full'>Login</Button>

                    </div>
                </div>
                <div className="hero-image">
                    <img src={landingPic} alt="LinkedIn Jobs" />
                </div>
            </section>

            <section ref={aboutRef} id="about">
                <h1>About</h1>
                <div className="topics">
                    <p>Welcome to <strong>ContactEase</strong>, your ultimate solution for managing contacts effortlessly. Our mission is to simplify the way you handle your personal and professional connections, making it easier for you to stay organized and connected.</p>
                    <div style={{ display: "flex", gap: "10vw" }}>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                            <h2>Our Vision</h2>
                            <p style={{ textAlign: "justify", textAlignLast: "center", textJustify: "inter-word" }}>At ContactEase, we envision a world where managing contacts is seamless, intuitive, and efficient. We aim to empower individuals and businesses to maintain meaningful relationships through innovative technology and user-friendly features.</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center" }}>
                            <h2>Our Mission</h2>
                            <p style={{ textAlign: "justify", textAlignLast: "center", textJustify: "inter-word" }}>Our mission is to provide a robust contacts management application that caters to your needs, whether you're an individual user, a small business, or a large corporation. We strive to offer a platform that combines simplicity, functionality, and security.</p>
                        </div>
                    </div>
                    <div ></div>
                    <h2>Key Features</h2>
                    <ul>
                        <li><strong>User-Friendly Interface</strong></li>
                        <li><strong>Advanced Search and Filtering</strong></li>
                        <li><strong>Secure Data Storage</strong></li>
                        <li><strong>Customizable Tags and Groups</strong></li>
                    </ul>

                    <h2 style={{ margin: "8vh 0 0 0" }}>Contact</h2>
                    <p>Have questions or need assistance? Our support team is here to help! Reach out to us at <a href="mailto:noelshaji2002@gmail.com">noelshaji2002@gmail.com</a> or visit our Help Center for more information.</p>
                </div>
            </section>
        </div>
    );

}

export default LandingPage;