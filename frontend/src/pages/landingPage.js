import React, { useEffect } from 'react';
import "../utils/styles/landingPage.css"
import landingPic from "../utils/landingpage.png"
import { Button } from '@radix-ui/themes';
import { useNavigate, useLocation } from "react-router-dom";

function LandingPage() {

    const navigate = useNavigate();
    let location = useLocation();
    let { pathname } = location;

    const toLoginPage = () =>{
        navigate("/auth/login")
    }
    const toSignupPage = () =>{
        navigate("/auth/signup")
    }

    return (
        <div className="landing-page">
            <div className="header-container">
                <h1>Contacts</h1>
                <nav>
                    <Button className='buttons' id='landing-topright' size="3" color="gray" variant="outline" radius='full'>Get Started</Button>
                    <Button className='buttons' id='landing-topright' size="3" color="gray" variant="outline" radius='full'>About</Button>

                </nav>
            </div>
            <section className="hero">
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
            <section className="content-topics">
                <h3>About</h3>
                <div className="topics">
                    <a href="#">Workplace</a>
                    <a href="#">Job Search</a>
                    <a href="#">Careers</a>
                </div>
            </section>
        </div>
    );

}

export default LandingPage;