import SideBar from './components/SideBar';
import Music from './components/Music';
import Dashboard from './components/Dashboard';
import Meditation from './components/Meditation';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import {HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ReactPlayer from 'react-player';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Helmet from 'react-helmet';
import O from './components/imgs/cursive-o-clipart-calligraphy-letter-o-png-1024_1024.jpg'
import React, { useState, useEffect, useRef } from 'react';



function App() { 
  //All state initializations for app functionality
  const [videoSrc, setVideoSrc] = useState(); //current video source 
  const [videoVolume, setVideoVolume] = useState(0); //background video volume is set to 0 when page is loaded
  const [UI, toggleUI] = useState(true); //state for if the UI is enabled 
  const [currentSong, setCurrentSong] = useState(); //state for current song
  const [musicState, setMusicState] = useState("stop"); // music stopped when page loads
  const [musicVolume, setMusicVolume] = useState(.5); //music and meditation volume is default is 50% when it is played
  const [meditation, setMeditation] = useState(); //state for current meditation audio
  const [meditationVolume, setMeditationVolume] = useState(.5); //state for meditation volume
  const [meditationState, setMeditationState] = useState(); //state for meditation state
  const [isLoggedIn, setLoggedIn] = useState(null); //state for keeping track if a user is logged in


  //references to be passed down to child components
  const originvideoRef = useRef(null);
  const audioMeditationRef = useRef(null);
  const audioMusicRef = useRef(null);
  const prevMusic = usePrevious(musicState);
  const prevCurrentSong = usePrevious(currentSong);
  const prevMeditationState = usePrevious(meditationState);
  const prevMeditationValue = usePrevious(meditation);

  //functions that serve as references to the useState set functions
  const changeVideo = (source) => {
    setVideoSrc(source);
  }
  const changeVideoVolume = (value) => {
    setVideoVolume(value);
  }
  const changeUI = (state) => {
    toggleUI(state);
    document.querySelector('video').style.zIndex = 2;
    if(document.querySelector('video').style.zIndex = 2){
      document.querySelector('video').addEventListener("click", () => {
        document.querySelector('video').style.zIndex = 0;
        document.querySelector('video').removeEventListener("click", () => {
          document.querySelector('video').style.zIndex = 0;
        })
      })
    } 
  }
  const changeCurrentSong = (song) => {
    setCurrentSong(song);
    console.log(currentSong);
  }
  const changeMusicState = (state) => {
    setMusicState(state);
  }
  const changeMusicVolume = (value) => {
    setMusicVolume(value);
  }
  const changeMeditation = (medi) => {
    setMeditation(medi);
  }
  const changeMeditationState = (state) => {
    setMeditationState(state);
  }
  const changeMeditationVolume = (value) => {
    setMeditationVolume(value);
  }

  //code ran when component is mounted
   useEffect(() => {
     firebase.auth().onAuthStateChanged(user => {
       //when the user is first logged onto the site, the saved default background image is loaded
       if(user){
         console.log('user logged in: ', user);
         console.log(user.displayName);
         firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
           changeVideo(doc.data().videoSource);
         })
         setLoggedIn(true);
       } else {
         console.log('user logged out');
         setLoggedIn(false);
  
       }
     })
   }, []);

  return (
    <Router>
      {/* Used to edit the meta data dynamically for each page */}
      <Helmet>
        <title>Oasis</title>
        <meta name="author" content="Jalen Brassell" />
        <meta 
          name="description"
          content="Oasis is a web application that is used for relaxation purposes"
        />
        <meta 
          name="keywords"
          content="relax, relaxtion, anxiety, sleep, calm, calming, rain, meditation, music,stress"
        />
        <link rel="icon" type="image/png" href={O}/>
      </Helmet>

      {/* Code below handles the routing for all components used */}
      {isLoggedIn === false ? (
        <Redirect to="/" eact/>
      ) : <Redirect to="/oasis" exact/>}
      <Switch>
        <Route
          path="/" exact
          render={() => (
            <Login />
          )}
        />
        <Route
          path="/signup" exact
          render={() => (
            <Signup/>
          )}
        />
        <Route >
          {/* used to display background video */}
          <ReactPlayer
                ref={originvideoRef}
                url={videoSrc}
                volume={videoVolume}
                loop
                playing
                width="100%"
                height="auto"
                onReady={() => console.log('onReady callback')}
                onStart={() => console.log('onStart callback')}
                onPause={() => console.log('onPause callback')}
                onEnded={() => console.log('onEnded callback')}
                onError={() => console.log('onError callback')}
          />
          {/* Music player */}
          <audio ref={audioMusicRef} loop/>
          {/* Mediation audio player */}
          <audio ref={audioMeditationRef} />

          <div className="App">
            {/* Main navigation */}
            <SideBar toggleState={UI} onClickToggleUI={changeUI}/> 
            <Switch>
              {/* Route for welcome page component */}
              <Route 
              path="/oasis" exact 
              render={() => (
                <Home
                />
              )}
              />
              {/* Route for scene selection dashboard component */}
              <Route 
                path="/oasis/scenes" exact
                render={() => (
                  <Dashboard 
                    onClickVideo={changeVideo} //property passed down to change background video
                    value={videoVolume} //keeps track of current video volume
                    onChange={changeVideoVolume} //changes current video volume
                    currentVideo={videoSrc} //keeps track of current video being played
                  />
                )} 
              />
              {/* Route for music selection component */}
              <Route 
                path="/oasis/music" exact 
                render={() => (
                  <Music 
                    musicValue={musicVolume} //keeps track of current music volume
                    onChangeMusicVolume={changeMusicVolume} //changes current music volume
                    onClickMusic={changeCurrentSong} //changes current music
                    onChangeMusicState={changeMusicState} //changes current music state
                    currentSongValue={currentSong} //keeps track of current song loading into music player
                    currentMusicState={musicState} //keeps track of current music state
                    prevMusicState={prevMusic} //keeps track of previous music state
                    prevCurrentSongValue={prevCurrentSong} //keeps track of previous song played
                    refToAudio={audioMusicRef} // a reference to the audio player so that the component can manipulate it
                  />
                )}
              />
              {/* Route for meditaiton selection component*/}
              <Route 
                path="/oasis/meditation" exact
                render={() => (
                  <Meditation 
                    onClickMeditation={changeMeditation} //changes current audio played
                    meditationValue={meditationVolume} //keeps track of audio volume
                    onChangeMeditationVolume={changeMeditationVolume} //changes current audio volume
                    onChangeMeditationState={changeMeditationState} //changes current audio state
                    currentMeditationValue={meditation} //keeps track of current audio played
                    currentMeditationState={meditationState}//keeps track of current audio state
                    prevMeditationState={prevMeditationState}//keeps track of previous audio state
                    prevMeditationValue={prevMeditationValue}//keeps track of previous audio played
                    refToMeditationAudio={audioMeditationRef}//reference to audio player
                  />
                )}
              />
            </Switch>
          </div>
        </Route>
      </Switch>
    </Router>
  );
  
  // Initialization to use useRef for references
  function usePrevious(value){
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
  }

}

export default App;
