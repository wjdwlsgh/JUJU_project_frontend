import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Full from "../../components/main/full/full";
import Clock from "../../components/Todo/Clock";
import Home from "../Home/Home";
import imgfile from "../../assets/imgs/main.png";
import "../../components/main/full/full.css";
import "./Main.css";
import FriendsModal from "../../friends/friendsModal";

const Main = ({ profilePicture, nickname }) => {
  const [currentProfilePicture, setCurrentProfilePicture] = useState(() => {
    return localStorage.getItem("userProfilePicture") || profilePicture;
  });

  const [isFriendsModalOpen, setFriendsModalOpen] = useState(false); // State for FriendsModal

  const navigate = useNavigate();

  useEffect(() => {
    if (profilePicture) {
      setCurrentProfilePicture(profilePicture);
    }
  }, [profilePicture]);

  useEffect(() => {
    localStorage.setItem("userProfilePicture", currentProfilePicture);
  }, [currentProfilePicture]);

  const handleOpenFriendsModal = () => {
    setFriendsModalOpen(true);
  };

  const handleCloseFriendsModal = () => {
    setFriendsModalOpen(false);
  };

  const goToDiary = () => {
    navigate("/api/Diary");
  };

  const goToArticle = () => {
    navigate("/api/Article");
  };

  const goToSetting = () => {
    navigate("/api/settingPage");
  };

  const goToPractice = () => {
    navigate("/api/Practice");
  };

  return (
    <div className="Mainbody">
      <div className="menu_wrapper">
        <div className="left_container1">
          {/* <div className="setting-icon-div">
            <Home />
          </div> */}

          <div className="profile-info">
            <img
              id="profile-img"
              src={imgfile}
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
          <div className="left_container2_baby" onClick={goToDiary}>
            일기 쓰기
          </div>
          <div className="left_container2_baby" onClick={goToArticle}>
            일기 페이지
          </div>
          <div
            className="left_container2_baby"
            onClick={handleOpenFriendsModal}
          >
            친구 목록
          </div>
          <div className="left_container2_baby" onClick={goToSetting}>
            설정
          </div>
        </div>
      </div>

      <main className="content">
        <Full />
      </main>

      {/* Friends Modal */}
      <FriendsModal
        isOpen={isFriendsModalOpen}
        handleClose={handleCloseFriendsModal}
      />
    </div>
  );
};
export default Main;
