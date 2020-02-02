import React, { useEffect, useState } from "react";
import Quiz from "../components/Quiz";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import API from "../api";
import YoutubePlayer from "../components/YoutubePlayer.jsx";
import { getCurrentMeditation } from "../store/actions/meditationActions";
import { clearError } from "../store/actions/authActions";
import "./Home.scss";


const Home = ({ hasRegistered, meditationSession, dispatch }) => {
  const [playSession, setPlaySession] = useState(false);

  useEffect(() => {
    if (!meditationSession) {
      dispatch(getCurrentMeditation());
    }
    // return () => {
    //   dispatch(clearError());
    // };
  }, [dispatch, hasRegistered, meditationSession]);

  const errorMsg = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {" "}
      <h4>Pleaes go to discover page and pick a meditation</h4>{" "}
    </div>
  );

  const displayButtonComponent = () => (
    <div className="landing-page">
      <p>Level {meditationSession.sessionDetail.level}</p>

      {meditationSession.sessionDetail.totalTime === 180 ? (
        <h1>Beginner</h1>
      ) : (
        ""
      )}
      {meditationSession.sessionDetail.totalTime === 300 ? (
        <h1>Intermediate</h1>
      ) : (
        ""
      )}
      {meditationSession.sessionDetail.totalTime === 600 ? <h1>Expert</h1> : ""}
      {/* <p onClick={updatePage}>Click to play</p> */}
      <div className="buttons">
        <div className="begin-button" onClick={updatePage}>
          BEGIN
        </div>
        <div className="time-button" onClick={updatePage}>
          {meditationSession.sessionDetail.totalTime / 60} MIN
        </div>
      </div>
    </div>
  );

  const updatePage = () => {
    setPlaySession(!playSession);
  };

  return (
    <>
      {hasRegistered ? <Quiz /> : null}
      {meditationSession ? (
        <>
          {playSession ? (
            <YoutubePlayer
              meditationSession={meditationSession}
              updatePage={updatePage}
            />
          ) : (
            <div className="landing-page">
              <p>Level {meditationSession.sessionDetail.level}</p>

              {meditationSession.sessionDetail.totalTime === 180 ? (
                <h1>Beginner</h1>
              ) : (
                ""
              )}
              {meditationSession.sessionDetail.totalTime === 300 ? (
                <h1>Intermediate</h1>
              ) : (
                ""
              )}
              
            {meditationSession.sessionDetail.totalTime === 600 ? (
                <h1>Expert</h1>
              ) : (
                ""
              )}
              {/* <p onClick={updatePage}>Click to play</p> */}
              <div className="buttons">
                <div className="begin-button" onClick={updatePage}>
                  BEGIN
                </div>
                <div className="time-button" onClick={updatePage}>
                  {meditationSession.sessionDetail.totalTime / 60} MIN
                </div>
              </div>
            </div>
            // displayButtonComponent()
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};
const mapState = state => ({
  hasRegistered: state.auth.hasRegistered,
  meditationSession: state.auth.meditationSession
});
export default connect(mapState)(Home);
