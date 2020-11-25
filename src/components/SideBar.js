import React, { useEffect } from 'react';
import {Link} from 'react-router-dom'
import './SideBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase, { firestore } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import '../App.js';



function SideBar (props)  {
    //handles logging current user out
    useEffect(() => {
        const logout = document.querySelector('#logoutBtn');
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            firebase.auth().signOut();
        });
    }, []);

    return (
        <div className="sidebar container-main ">
            <button id="logoutBtn">Log out</button>
           <header className="sidebar-header text-white display-3">Oasis</header>
           <nav className="navbar justify-content-center">
               <ul className="nav flex-column nav-pills">
                   {/* Link is used to turn elements into links to navigate to other paths */}
                    <Link to="/oasis/" className="nav-link m-3">
                        <li className="nav-item text-white pill-1">Home</li>
                    </Link>
                    <Link to="/oasis/scenes" className="nav-link m-3">
                        <li className="nav-item text-white pill-1">Scenes</li>
                    </Link>
                    <Link to="/oasis/music" className="nav-link m-3">
                        <li className="nav-item text-white pill-2">Music</li>
                    </Link>
                    <Link to="/oasis/meditation" className="nav-link m-3">
                        <li className="nav-item text-white pill-3">Guided Meditation</li>
                    </Link>
                    <div id="toggleUIDiv" className="nav-link m-3" onClick={() => {
                        props.onClickToggleUI();
                    }}>
                        <li className="nav-item text-white pill-3">Toggle UI</li>
                    </div>
               </ul>
           </nav>
        </div>  
    );
}

export default SideBar;