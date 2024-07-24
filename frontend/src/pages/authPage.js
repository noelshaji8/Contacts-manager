import React from 'react';
import "../utils/styles/homePage.css"
import '@radix-ui/themes/styles.css';
import LoginForm from '../components/loginForm';
import SignUpForm from '../components/signupForm';
import { Route, Routes } from "react-router-dom";

function AuthPage() {
    return (
        <div class="container">
            <Routes>
                <Route path="/login" element={<LoginForm />}></Route>
                <Route path="/signup" element={<SignUpForm />} ></Route>
            </Routes>
        </div>
    );
}

export default AuthPage;