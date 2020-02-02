import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
// import ProgressBar from "./ProgressBar.jsx";
import API from "../api";
import axios from "axios";
import { connect } from "react-redux";
import { getCurrentMeditation } from "../store/actions/meditationActions";
import "./YoutubePlayer.scss";
import { CircularProgressbar } from 'react-circular-progressbar';
import Loader from "./Loader";
import 'react-circular-progressbar/dist/styles.css';

//when server is running: 
//need to create loading screen until (video !== 0)

//5. try to style circularProgressionbar better. different colours etc check out: https://www.npmjs.com/package/react-circular-progressbar

import clouds from '../assets/Clouds.svg';
import cloudOne from "../assets/Cloud_one.svg";

const youtubeSession = meditationTime => {
  let videoURL;
  switch (meditationTime) {
    case 180:
      // videoURL = "iHdviZkM7S4";
      //instead use this one, it has sound:
      videoURL = "cI4ryatVkKw";
      return videoURL;
    case 300:
      // videoURL = "xTczn5RUgnk";
      //instead use this one, it has sound:
      videoURL = "_6_akBtKZdE";
      return videoURL;
    case 600:
      // videoURL = "KAHKP313P2I";
      //instead use this one, it has sound:
      videoURL = "w6wIqnK5GPE";
      return videoURL;
    default:
      return;
  }
};

const YoutubePlayer = (props) => {
  const [finished, setFinished] = useState(false)
  const [video, setVideo] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [percentage, setPercentage] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  useEffect(() => {
    return () => {
      //runs when component unmounts!
      console.log(
        "I have unmounted and i will get the updated version of meditation"
      );
      props.getCurrentMeditation();
    }
  }, []);

  const _onReady = (event) => {
    setVideo(event.target);
    // access to player outside of this using "video"
  };

  const playOrPause = (info) => {
    if (info === "play") {
      setIntervalId(
        setInterval(() => {
          const newPercentage = video.getCurrentTime() / video.getDuration()
          const newPercentageCalculated = Math.round(newPercentage * 100);
          // console.log(newPercentageCalculated);
          setPercentage(newPercentageCalculated);
        }, 1000)
      );
    } else if (info === "pause") {
      clearInterval(intervalId);
    }
  }

  const playTheVideo = () => {
    video.playVideo();
    video.setVolume(50);
    setVideoPlaying(true);

    playOrPause("play");
  }

  const pauseTheVideo = () => {
    video.pauseVideo();
    setVideoPlaying(false);

    playOrPause("pause");
  }

  const onEnd = async (event) => {
    // console.log("video has ended");
    setFinished(true);
    const token = localStorage.getItem("CMCFlow");
    await axios({
      headers: { Authorization: `bearer ${token}` },
      url: API.updateMeditationTime,
      method: "post",
      data: { currentTime: event.target.getCurrentTime() }
    });
  }

    const { meditationSession } = props;
    const videoId = youtubeSession(meditationSession.sessionDetail.totalTime);

    const opts = {
      height: "0",
      width: "0",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 2
      }
    };

    const skipTrack = async () => {
      console.log("video has ended");
      setFinished(true);
      const token = localStorage.getItem("CMCFlow");
      await axios({
        headers: { Authorization: `bearer ${token}` },
        url: API.updateMeditationTime,
        method: "post",
        data: { currentTime: video.getDuration() }
      });
    }

  return (
    <>
    {/* need some logic here to check if video is finished loading, instead of just "true" */}
    {true ?
       <div className="meditation-player">      
       {finished ? 
       // if meditation session is finished 
       <div className="finished-screen">
         <div className="left-side">
           <p>WELL DONE</p>
           <div className="left-time">
             <h1>{meditationSession.sessionDetail.totalTime / 60}</h1>
             <p>MINUTES MEDITATED</p>
           </div>
         </div>
         <div className="right-side">
           <div className="quote">{meditationSession.sessionDetail.quote}</div>
           <div onClick={props.updatePage} className="complete-button">COMPLETE</div>
         </div>
       </div> 
       : 
       // if not finished
       <>
       <div className="zwrapper">
         <h4 onClick={props.updatePage} className="close-button">
           X
         </h4>
         <h4 onClick={skipTrack} className="skip">>></h4>
         <div className="meditation-component">
           <div>{meditationSession.sessionDetail.totalTime == 180 && "BEGINNER"}
           {meditationSession.sessionDetail.totalTime == 300 && "INTERMEDIATE"}
           {meditationSession.sessionDetail.totalTime == 600 && "EXPERT"}
           &nbsp;
           {meditationSession.sessionDetail.level}</div>
           <h4 className="message">Lets start your meditation session.</h4>
           <YouTube
             videoId={videoId}
             opts={opts}
             onReady={_onReady}
             onEnd={onEnd}
           />
           <CircularProgressbar value={percentage} className="loading-bar" />
             {
               videoPlaying ? 
               <div className="circlePause" onClick={pauseTheVideo}>
                 <i className="fas fa-pause fa-4x"></i>
               </div>
               :
               <div className="circlePlay" onClick={playTheVideo}>
                 <i className="fas fa-play fa-4x"></i>
               </div>
             }
           <div>{meditationSession.sessionDetail.totalTime / 60} MINUTES</div>
 
           <img src={cloudOne} className="clouds" id="cloud1" />
           <img src={cloudOne} className="clouds" id="cloud2" />
           <img src={cloudOne} className="clouds" id="cloud3" />
           <img src={cloudOne} className="clouds" id="cloud4" />
         </div>
       </div>
       </>
       } 
     </div> 
      : 
      <Loader />
      }
    </>
  )
}

const mapDispatch = dispatch => ({
  getCurrentMeditation: () => dispatch(getCurrentMeditation())
});
export default connect(
  null,
  mapDispatch
)(YoutubePlayer);