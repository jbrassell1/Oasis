import React, { useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Home.css';
import firebase from 'firebase/app';
import 'firebase/auth';

function Home(){
   //this function responsbile for displaying the current user's display name in the welcome header
    useEffect(() => {
        const user = firebase.auth().currentUser;
        if(user != null){
            user.providerData.forEach(profile => {
                const displayName = profile.displayName;
                const h1 = document.querySelector(".home-header h1");
            h1.textContent = `Welcome to your Oasis, ${displayName}`;
            })
            
        }
        
        
    })
    

    return(
        <div className="home container-main">
            <div className="home-header">
            <h1></h1>
            </div>
            <div className="desc-div">
                <p>
                    This is a rest area on your journey through life. Select a scene, put on some background music and drift away.
                    If you need a little help, listen to the meditation guides to enhance your experience. To set the perfect feel
                    of your Oasis, all three: a scene, music, and guided meditation, can be played simultaneously. Enjoy...
                </p>
            </div>
            
        </div>
    )
}

export default Home;