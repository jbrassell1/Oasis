import React, {useEffect} from 'react';
import firebase from 'firebase/app';
import './Music.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.js'


function Music (props)  {
    
    //handles music volume state change for volume slider
    const handleVolumeChange = (e) => {
        props.onChangeMusicVolume(e.target.value);
        console.log(e);
    }
    
    //handles which song is selected for visual feedback 
    function setSelectedMusic(div){
        let current = document.querySelector(".selectedMusic");
        if(current){
            current.className = current.className.replace(" selectedMusic", "");
            current = div;
            div.className += " selectedMusic";
        } else if(!current){
            div.className += " selectedMusic";
        }
    }

    //resets which song is selected when music is stopped
    function resetSelectedMusic(){
        let current = document.querySelector(".selectedMusic");
        if(current){
            current.className = current.className.replace(" selectedMusic", "");
        } else {
            return;
        }
    }

    
    
    // This function is responsible for dynamically rendering the the song list
    useEffect(() => {
        const musicList = document.querySelector('#music-list');
        const db = firebase.firestore();
        db.collection('music').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderMusic(doc);
            })
        })
        function renderMusic(doc){
            let li = document.createElement('li');
            li.setAttribute('data-id', doc.id);
            li.className = "items";
            li.textContent = doc.data().title;
            li.addEventListener('click', function(){
                props.refToAudio.current.src = doc.data().musicSource;
                props.onClickMusic(doc.data().title);
                setSelectedMusic(li);
                props.refToAudio.current.play();
                props.onChangeMusicState("playing");
            })

            musicList.appendChild(li);
        }
        
    }, []);
    

    return (

        <div className="container-main music container-fluid">
            {/* conditional rendering of html elements */}
             {props.currentMusicState === "stop" ? (
                <div className="music-header"><h1> Select Music</h1></div>
            ) : null}
            <div>
                {props.currentMusicState === "playing" ? (
                    <div className="current-song">Now Playing: {props.currentSongValue}</div>
                ): null}
                {props.currentMusicState === "paused" ? (
                     <div className="current-song">{props.currentSongValue} is paused</div>
                ): null}
            </div>
        
            <div className="button-container">
                {props.currentMusicState === "paused" && (
                    <button onClick={() => {
                        props.refToAudio.current.play();
                        props.onChangeMusicState("playing");
                    }}>Play</button>
                )}
                
                {props.currentMusicState === "playing" && (
                    <button onClick={() => {
                        props.refToAudio.current.pause();
                        props.onChangeMusicState("paused");
                    }}>Pause</button>
                )}
                
                {props.currentMusicState === "playing" || props.currentMusicState === "paused" ?
                    <button onClick={() => {
                        props.refToAudio.current.pause();
                        props.onChangeMusicState("stop");
                        props.refToAudio.current.src = null;
                        resetSelectedMusic();
                    }}>Stop</button>
                : null }
            </div>
            <div id="music-list"className="playlist_div flex-wrap"></div>
            {props.currentMusicState === "playing" || props.currentMusicState === "paused" ? (
                <div className="vol_div">
                <h1>Volume:</h1>
                <input className="slider" type="range" min="0" max="1" step=".1" defaultValue={props.musicValue} onChange={handleVolumeChange} />
                {props.refToAudio.current.volume = props.musicValue}
            </div> 
            ) : null} 
            
        </div>  
    );
}

export default Music;