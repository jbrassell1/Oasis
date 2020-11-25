import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';


import { BrowserRouter, Route } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyC0GVgaS9m3dMOD5Y-KK-yrvZxFlv06wyw",
  authDomain: "senior-project-e4dbf.firebaseapp.com",
  databaseURL: "https://senior-project-e4dbf.firebaseio.com",
  projectId: "senior-project-e4dbf",
  storageBucket: "senior-project-e4dbf.appspot.com",
  messagingSenderId: "288119461903",
  appId: "1:288119461903:web:8220250b58fd7612b1ab7a",
  measurementId: "G-DPZXMJEBHH"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



ReactDOM.render(
  <BrowserRouter>
    <Route path="/" component={App}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
