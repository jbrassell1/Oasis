import React, { useEffect } from 'react';

import './Dashboard.css';
import 'bootstrap/dist/css/bootstrap.css';

import '../App.js';
import firebase from 'firebase/app';

function Dashboard (props)  { 
    // This function is responsible for dynamically rendering the video card elements to be clicked
    useEffect(() => {
        const imgGrid = document.querySelector('#imgGrid');
        const db = firebase.firestore();
        db.collection('videos').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderImgs(doc);
            })
        })
        function renderImgs(doc){
            let div =  document.createElement('div');
            let thumbnail = doc.data().thumbnail;
            div.setAttribute('data-id', doc.id);
            div.className = "card-ele"
            div.style.backgroundImage = `url(${thumbnail})`;
            div.addEventListener('click', function(){
                props.onClickVideo(doc.data().videoSource);
                setActiveVideo(div);
            })
            imgGrid.appendChild(div);

        }
        
    }, []);
    // Handles the set to default button functionality
    const user = firebase.auth().currentUser;
    const handleDefault = () => {
        firebase.firestore().collection('users').doc(user.uid).update({
            videoSource: props.currentVideo
        })
        alert("Default Background changed");
       
    }  
    

    //handles the state change for the volume slider
    const handleChange = (e) => {
        props.onChange(e.target.value);
    }
    
    //handles which card is selected so it is shown as not transparent
    function setActiveVideo(div){
        let current = document.querySelector(".selected");
        if(current){
            current.className = current.className.replace(" selected", "");
            current = div;
            div.className += " selected";
        } else if(!current){
            div.className += " selected";
        }
    }

    return (
        <div className="dash container-main">
           <div className="dash-header"><h1> Set Background</h1></div>
           <div id="imgGrid" className="grid-container"></div> 
           <button className="defaultButton" onClick={handleDefault}>Set as default</button>
            <div className="vol_div">
                <h1>Volume:</h1>
                <input className="slider" type="range" min="0" max="1" step=".1" defaultValue={props.value} onChange={handleChange} />
            </div> 
        </div>  
    );
}

export default Dashboard;