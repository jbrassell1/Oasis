import React, { useEffect } from 'react';
import './Signup.css';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import '../App.js';

function Signup(props){
    //this function is takes user input from fields and uses the info as
    //parameters to make firebase function calls for user account creation
    useEffect(() => {
        
        const signupForm = document.querySelector('#signup-form');
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = signupForm['signup-email'].value;
            const password = signupForm['signup-password'].value;
            const repeatPassword = signupForm['signup-repeatPassword'].value;
            const display_name = signupForm['signup-displayName'].value;
            
            //password validation
            if(password !== repeatPassword){
                alert("Passwords don't match.");
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                    cred.user.updateProfile({ //updates the user object with user set display name
                        displayName: display_name
                    })
                    // creates an object for that in the firestore database everytime a user signs up and sets a default bg video
                    firebase.firestore().collection('users').doc(cred.user.uid).set({
                        videoSource: "https://firebasestorage.googleapis.com/v0/b/senior-project-e4dbf.appspot.com/o/scenes%2Focean_side.mp4?alt=media&token=910c67b3-3968-4fee-bc6c-29b0427a8e6b"
                    })
                    let user = cred.user;
                    console.log('User created: ' + user.uid);
                    signupForm.reset();
                }).catch((error) => {
                    alert(error.message);
                });
            }
        });
    }, []);
  
    return(
        <div className="signup">
            <div className="signup-header">
                <h1>Sign up</h1>
            </div>
            <div className="form-container">
                <form id="signup-form">
                    <div className="input-container display-container">
                        <label htmlFor="display"><b>Display Name</b></label>
                        <input type="text" id="signup-displayName" placeholder="Enter display name" name="display" />
                    </div>

                    <div className="input-container email-container">
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" id="signup-email" placeholder="Enter email" name="email" required />
                    </div>
        
                    <div className="input-container password-container">
                        <label htmlFor="password"><b>Password</b></label>
                        <input type="password" id="signup-password" placeholder="Enter Password" name="password" required />
                    </div>

                    <div className="input-container repeat-container">
                        <label htmlFor="repeat"><b>Password Validation</b></label>
                        <input type="password" id='signup-repeatPassword' placeholder="Repeat Password" name="repeat"  />
                    </div>
                    {/* <Link to="/oasis"> */}
                        <button id="signupBtn">Sign up</button>
                    {/* </Link> */}
                
                    <div className="signupOptions">
                        <Link to="/" className="cancelLink">
                            <button type="button" id="cancelBtn">Cancel</button>
                        </Link>
                        
                    </div>
                </form>   
            </div>
        </div>
    )
}

export default Signup;