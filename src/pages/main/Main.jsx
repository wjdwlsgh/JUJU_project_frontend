// Main.js
import React from "react";
import "./Main.css";
import mainImage from "../../assets/imgs/main.png";
import Full from "../../components/main/full/full";
import Home from "../Home/Home";

const Main = ({ profilePicture, nickname }) => {
  // fetch("http://localhost:4000/api/todo")
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));
  return (
    <div className="Mainbody">
      <div className="menu_wrapper">
        <div className="left_container1">
          <div className="setting-icon">
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
                src={mainImage} // 기본 이미지
                alt="Default Profile"
                className="profile-picture"
                style={{ width: "150px", height: "150px" }}
              />
            )}
          </div>
          <div className="nickname"> {nickname}님 </div>
        </div>
        <div className="left_container2"></div>
        <div className="left_container3"></div>
      </div>

      <main className="content">
        <Full />
      </main>
    </div>
  );
};

export default Main;
