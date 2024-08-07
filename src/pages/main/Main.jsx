import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Full from "../../components/main/full/full";
import Clock from "../../components/Todo/Clock";
import Home from "../Home/Home";
import "../../components/main/full/full.css";
import "./Main.css";
import Diary from "../Diary/Diary";

const Main = ({ profilePicture, nickname }) => {
  const [currentProfilePicture, setCurrentProfilePicture] = useState(() => {
    return localStorage.getItem("userProfilePicture") || profilePicture;
  });

  useEffect(() => {
    localStorage.setItem("userProfilePicture", currentProfilePicture);
  }, [currentProfilePicture]);

  const navigate = useNavigate();

  return (
    <div className="Mainbody">
      <div className="menu_wrapper">
        <div className="left_container1">
          <div className="setting-icon-div">
            <Home />
          </div>

          <div className="profile-info">
            <img
              id="profile-img"
              src={currentProfilePicture}
              alt="Profile"
              className="profile-picture"
              // style={{ width: "150px", height: "150px" }}
            />
            <div className="nickname"> {nickname}님 </div>
          </div>

          <div className="fullClock">
            <Clock />
          </div>
        </div>

        <div className="left_container2">
          {/* ProfilePicture component has been removed */}
        </div>
      </div>

      <main className="content">
        <Full />
      </main>
    </div>
  );
};

export default Main;
