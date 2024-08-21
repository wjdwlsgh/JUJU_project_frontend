import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Full from "../../components/main/full/full";
import Clock from "../../components/Todo/Clock";
import imgfile from "../../assets/imgs/main.png";
import "../../components/main/full/full.css";
import "./Main.css";
import { CiSettings } from "react-icons/ci";
import FriendsModal from "../../friends/friendsModal";
import { IoPeople } from "react-icons/io5";
import { TbCategoryPlus } from "react-icons/tb";
import { FaPenAlt } from "react-icons/fa";
import LoginModal from "../login_kakao_ver/LoginModal";

const Main = ({ profilePicture, nickname }) => {
  const [currentProfilePicture, setCurrentProfilePicture] = useState(() => {
    return localStorage.getItem("userProfilePicture") || profilePicture;
  });

  const [isFriendsModalOpen, setFriendsModalOpen] = useState(false); // State for FriendsModal
  const [isLoginModalOpen, setLoginModalOpen] = useState(false); // State for FriendsModal

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

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const goTosettiong = () => {
    navigate("/api/SettingPage");
  };
  return (
    <div className="Mainbody-mom">
      <div className="Mainbody">
        <div className="menu_wrapper">
          <div className="left_container_mom">
            <div className="left_container1">
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
              <div className="left_container2_baby">
                <FaPenAlt /> <span className="mainCategory">글쓰기</span>
              </div>
              <div className="left_container2_baby">
                <TbCategoryPlus /> <span className="mainCategory">글 목록</span>
              </div>
              <div className="left_container2_baby">
                <span fontSize="20px" className="mainIcon">
                  <IoPeople />
                </span>
                <span className="mainCategory" onClick={handleOpenFriendsModal}>
                  {" "}
                  친구 목록
                </span>
              </div>
              <div className="left_container2_baby">
                <span fontSize="20px" className="mainIcon">
                  <CiSettings IoPeople />
                </span>
                <span className="mainCategory" onClick={goTosettiong}>
                  {" "}
                  설정
                </span>
                <div className="left_container2_logout" onClick={handleOpenLoginModal}>
                  로그아웃
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="content">
          <Full />
        </main>

        {/* Friends Modal */}
        <FriendsModal isOpen={isFriendsModalOpen} handleClose={handleCloseFriendsModal} />
        <LoginModal isOpen={isLoginModalOpen} onClose={handleCloseLoginModal} />
      </div>
    </div>
  );
};
export default Main;
