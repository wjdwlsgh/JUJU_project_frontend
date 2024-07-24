import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../../components/Setting/ProfilePicture";
import Nickname from "../../components/Setting/Nickname";
import ChangePassword from "../../components/Setting/ChangePassword";
import mainImage from "../../assets/imgs/main.png";
import homeImage from "../../assets/imgs/home.png";
import "./Main.css";
import "./SettingPage.css";

const SettingPage = ({ setProfilePicture, setNickname }) => {
  // const [newProfilePicture, setNewProfilePicture] = useState(null);
  const navigate = useNavigate();
  const [newNickname, setNewNickname] = useState("");

  // const handleProfilePictureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setNewProfilePicture(reader.result);
  //       setProfilePicture(reader.result); // Update profile picture in App.js
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleNicknameChange = () => {
    setNickname(newNickname); // Update nickname in App.js
    setNewNickname(""); // Clear input after update
    alert("닉네임 변경이 완료되었습니다!");
  };

  const handleHomeClick = () => {
    navigate("/main");
  };

  return (
    <div className="mypage">
      <div id="mypage-top">
        <div className="mypage-top-left">JUJU-MY-PAGE</div>
        <div className="mypage-top-right">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>
      <table className="mypage-table">
        <tr>
          <th className="mypage-th">사진 변경</th>
          <td className="mypage-div">
            <ProfilePicture
              className="ProfilePicture"
              onUpload={setProfilePicture}
              defaultImage={mainImage}
            />
          </td>
        </tr>

        <tr>
          <th className="mypage-th">닉네임 변경</th>
          <td className="mypage-div">
            <Nickname
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              onSubmit={handleNicknameChange}
            />
          </td>
        </tr>

        <tr>
          <th className="mypage-th">비밀번호 변경</th>
          <td className="mypage-div">
            {" "}
            <ChangePassword />
          </td>
        </tr>
      </table>

      <div className="mypage-buttons">
        {/* <button className="save-button" onClick={handleNicknameChange}>
          저장
        </button> */}
        <button className="home-button" onClick={handleHomeClick}>
          <img
            src={homeImage}
            alt="설정 아이콘"
            style={{ width: "30px", height: "25px" }}
          />{" "}
          홈으로
        </button>
      </div>
    </div>
  );
};
export default SettingPage;

// <div>
//   <h2>설정 화면</h2>
//   <Link to="/">
//     <button>홈으로</button>
//   </Link>
//   <ProfilePicture onChange={handleProfilePictureChange} />
//   <Nickname
//     value={newNickname}
//     onChange={(e) => setNewNickname(e.target.value)}
//     onSubmit={handleNicknameChange}
//   />
//   <ChangePassword />
//   {newProfilePicture && (
//     <div>
//       <h3>Preview:</h3>
//       <img
//         src={newProfilePicture}
//         alt="New Profile Preview"
//         style={{ width: "100px", height: "100px" }}
//       />
//     </div>
//   )}
// </div>
