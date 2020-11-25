import React, {useEffect} from 'react';
import '../App';
import './Meditation.css';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from 'firebase/app';

function Meditation(props){
     //handles audio volume state change for volume slider
    const handleVolumeChange = (e) => {
        props.onChangeMeditationVolume(e.target.value);
    }
    
    //resets which audio is selected when audio is stopped
    function resetSelectedMeditation(){
        let current = document.querySelector(".selectedMeditation");
        if(current){
            current.className = current.className.replace(" selectedMeditation", "");
        } else {
            return;
        }
    }

    //handles which audio option is selected for visual feedback 
    function setSelectedMeditation(div){
        let current = document.querySelector(".selectedMeditation");
        if(current){
            current.className = current.className.replace(" selectedMeditation", "");
            current = div;
            div.className += " selectedMeditation";
        } else if(!current){
            div.className += " selectedMeditation";
        }
    }

    // This function is responsible for dynamically rendering the the audio div elements
    useEffect(() => {
        const mediGrid = document.querySelector('#mediGrid');
        const db = firebase.firestore();
        db.collection('meditations').get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                renderMeditations(doc);
            })
        })
        function renderMeditations(doc){
            let div = document.createElement('div');
            div.setAttribute('data-id', doc.id);
            div.className = "card-ele1";
            div.textContent = doc.data().desc;
            div.addEventListener('click', function(){
                props.refToMeditationAudio.current.src = doc.data().audioSource;
                props.onClickMeditation(doc.data().title);
                setSelectedMeditation(div);
                props.refToMeditationAudio.current.play();
                props.onChangeMeditationState("playing");
            })

            mediGrid.appendChild(div);
        }
    }, []);

    

   

    return (
        <div className="container-main meditation container-fluid">
            <div className="meditation-header"><h1>How are you feeling?</h1></div>
            <div>
                {/* conditional rendering of html elements */}
                {props.currentMeditationState === "playing" ? (
                    <div className="current-song">Now Playing: {props.currentMeditationValue}</div>
                ): null}
                {props.currentMeditationState === "paused" ? (
                     <div className="current-song">{props.currentMeditationValue} is paused</div>
                ): null}
            </div>
            <div className="button-container">
                {props.currentMeditationState === "paused" && (
                    <button onClick={() => {
                        props.refToMeditationAudio.current.play();
                        props.onChangeMeditationState("playing");
                    }}>Play</button>
                )}
                
                {props.currentMeditationState === "playing" && (
                    <button onClick={() => {
                        props.refToMeditationAudio.current.pause();
                        props.onChangeMeditationState("paused");
                    }}>Pause</button>
                )}
                
                {props.currentMeditationState === "playing" || props.currentMeditationState === "paused" ?
                    <button onClick={() => {
                        props.refToMeditationAudio.current.pause();
                        props.onChangeMeditationState("stop");
                        props.refToMeditationAudio.current.src = null;
                        resetSelectedMeditation();
                    }}>Stop</button>
                : null }
            </div>
            <div id="mediGrid" className="grid-container"></div>
            {props.currentMeditationState === "playing" || props.currentMeditationState === "paused" ? (
                <div className="vol_div">
                <h1>Volume:</h1>
                <input className="slider" type="range" min="0" max="1" step=".1" defaultValue={props.meditationValue} onChange={handleVolumeChange} />
                {props.refToMeditationAudio.current.volume = props.meditationValue}
            </div> 
            ) : null} 
        </div>
    );
}

export default Meditation;