import React, { useState } from "react";
import "./Main.css";
import mainImage from "../../assets/imgs/main.png";
import Full from "../../components/main/full/full";
import Home from "../Home/Home";
import Clock from "../../components/Todo/Clock";
import ProfilePicture from "../../components/Setting/ProfilePicture";
import "../../components/main/full/full.css";

const Main = ({ initialProfilePicture, nickname }) => {
  const [profilePicture, setProfilePicture] = useState(
    initialProfilePicture || mainImage
  );

  const handleUpload = (newProfilePictureUrl) => {
    setProfilePicture(newProfilePictureUrl);
  };

  return (
    <div className="Mainbody">
      <div className="menu_wrapper">
        <div className="left_container1">
          <div className="setting-icon-div">
            <Home />
          </div>

          <div className="profile-info">
            <ProfilePicture
              onUpload={handleUpload}
              defaultImage={profilePicture}
            />
            <div className="nickname"> {nickname}님 </div>
          </div>

          <div className="fullClock">
            <Clock />
          </div>
        </div>

        <div className="left_container2"></div>
      </div>

      <main className="content">
        <Full />
      </main>
    </div>
  );
};

export default Main;
