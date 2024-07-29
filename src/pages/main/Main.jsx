import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Main.css";
import mainImage from "../../assets/imgs/main.png";
import Full from "../../components/main/full/full";
import Home from "../Home/Home";
import Clock from "../../components/Todo/Clock";
import ProfilePicture from "../../components/Setting/ProfilePicture";
import "../../components/main/full/full.css";

const Main = () => {
  const [profilePicture, setProfilePicture] = useState(mainImage);
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();
  const userEmail = "user@example.com"; // 현재 로그인한 사용자의 이메일을 여기에 입력하세요.

  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/user/${userEmail}`);
        setNickname(response.data.user.nickname);
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchUserInfo();
  }, [userEmail]);

  const handleProfilePictureUpload = (imageUrl) => {
    setProfilePicture(imageUrl);
  };

  return (
    <div className="Mainbody">
      <div className="menu_wrapper">
        <div className="left_container1">
          <div className="setting-icon-div">
            <Home />
          </div>

          <div className="profile-info">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
                style={{ width: "150px", height: "150px" }}
              />
            ) : (
              <img
                src={mainImage}
                alt="Default Profile"
                className="profile-picture"
                style={{ width: "150px", height: "150px" }}
              />
            )}
            <div className="nickname"> {nickname}님 </div>
          </div>

          <div className="fullClock">
            <Clock />
          </div>
        </div>

        <div className="left_container2">
          {/* <ProfilePicture
            onUpload={handleProfilePictureUpload}
            defaultImage={profilePicture}
          /> */}
        </div>
      </div>

      <main className="content">
        <Full />
      </main>
    </div>
  );
};

export default Main;
