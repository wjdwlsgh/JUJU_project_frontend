import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "../../components/Setting/ProfilePicture";
import Nickname from "../../components/Setting/Nickname";
import ChangePassword from "../../components/Setting/ChangePassword";
import mainImage from "../../assets/imgs/main.png";
import homeImage from "../../assets/imgs/home.png";
import "./SettingPage.css";

const SettingPage = ({ userEmail, setProfilePicture, setNickname }) => {
  const navigate = useNavigate();
  const [newNickname, setNewNickname] = useState("");

  const handleNicknameChange = () => {
    setNickname(newNickname);
    setNewNickname("");
    alert("닉네임 변경이 완료되었습니다!");
  };

  const handleHomeClick = () => {
    navigate("/api/main");
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
        <tbody>
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
                userEmail={userEmail}
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                onSubmit={handleNicknameChange}
              />
            </td>
          </tr>

          <tr>
            <th className="mypage-th">비밀번호 변경</th>
            <td className="mypage-div">
              <ChangePassword userEmail={userEmail} />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="mypage-buttons">
        <button className="home-button" onClick={handleHomeClick}>
          <img
            src={homeImage}
            alt="설정 아이콘"
            style={{ width: "30px", height: "25px" }}
          />
          홈으로
        </button>
      </div>
    </div>
  );
};

export default SettingPage;
