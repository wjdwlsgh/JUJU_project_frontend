import React, { useState } from "react";
import "./Main.css";
// import ProgressDisplay from "../../components/Goal/ProgressDisplay";
// import TaskManager from "../../components/Goal/TaskManger";
import mainImage from "../../assets/imgs/main.png";

import Home from "./Home";
// import { Link } from "react-router-dom";

const Main = ({ profilePicture, nickname }) => {
  // const [tasks, setTasks] = useState([]);
  // const [categories, setCategories] = useState([]);

  return (
    <div className="Body">
      <h1 className="JUJU">JUJU</h1>
      <div>
        <Home />
      </div>
      <div className="content_wrapper">
        <div className="menu_wrapper">
          <div className="left_container1">
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

            {/* <img src={mainImage} alt="Main" /> */}
          </div>
          <div className="left_container2"></div>
          {/* <div className="left_container3"></div> */}
        </div>
        <main className="content">
          <div className="content-placeholder">
            <div className="content-placeholder-1"></div>
          </div>
          {/* 캘린더를 위한 자리 표시자 */}
        </main>
        {/* <TaskManager
          tasks={tasks}
          setTasks={setTasks}
          categories={categories}
          setCategories={setCategories}
        /> */}
      </div>
    </div>
  );
};

export default Main;
