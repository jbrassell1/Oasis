import React, { useEffect } from 'react';
import './Login.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {Link} from 'react-router-dom';

function Login(){
    //this function is takes user input from fields and uses the info as
    //parameters to make firebase function calls for user login
    useEffect(() => {
        const loginForm = document.querySelector('#login-form');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = loginForm['login-email'].value;
            const password = loginForm['login-password'].value;
            firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
                loginForm.reset();
            }).catch((error) => {
                alert(error.message);
            });
        });
    }, []);

    return(
        <div className="Login">
            <div className="login-header">
                <h1>Oasis</h1>
            </div>
            <div className="form-container">
                <form id="login-form">
                    <div className="input-container email-container">
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" id="login-email"placeholder="Enter Email" name="email" required />
                    </div>

                    <div className="input-container password-container">
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" id="login-password" placeholder="Enter Password" name="password" required />
                    </div>

                    <button id="loginBtn">Log in</button>

                    {/* <label><input type="checkbox"  name="remember"></input> Remember me</label> */}

                    <div className="loginOptions">
                        <Link to="/signup" className="signupLink">
                            <button type="button" id="signupBtn">New to Oasis?</button>
                        </Link>
                            {/* <a>Forgot password?</a> */}
                    </div>
                </form>
                
            </div>
        </div>
    )
}

export default Login;