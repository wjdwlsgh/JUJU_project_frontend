// import React from "react";
// import { Link } from "react-router-dom";
// import settingImg from "../../assets/imgs/setting.png";

// const Home = () => (
//   <div>
//     <Link to="/SettingPage">
//       <button className="setting-icon">
//         <img
//           src={settingImg}
//           alt="설정 아이콘"
//           style={{ width: "20px", height: "20px" }}
//         />
//         설정
//       </button>
//     </Link>
//   </div>
// );

// export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import settingImg from "../../assets/imgs/setting.png";
import "./Home.css";
const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/api/SettingPage");
  };

  return (
    <div className="setting-icon">
      <button className="setting-icon-button" onClick={handleClick}>
        <img className="setting-icon-img" src={settingImg} alt="설정 아이콘" />
        설정
      </button>
    </div>
  );
};

export default Home;
