import React, { useState } from "react";
import axios from "axios";
import "./Nickname.css";

const Nickname = ({ userEmail, value, onChange, onSubmit }) => {
  const [newNickname, setNewNickname] = useState(value);

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
    onChange(e);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:8080/api/changeNickname", {
        email: userEmail,
        newNickname,
      });
      console.log("Nickname updated:", response.data);
      onSubmit(); // Call the parent component's submit handler
      alert("닉네임 변경이 완료되었습니다!");
    } catch (error) {
      console.error("Error updating nickname:", error);
      alert("닉네임 변경에 실패하였습니다.");
    }
  };

  return (
    <div>
      <input
        className="nickname-input"
        type="text"
        value={newNickname}
        onChange={handleNicknameChange}
        placeholder="닉네임을 입력하세요"
      />
      <button id="nickname-button" onClick={handleSave}>
        변경
      </button>
    </div>
  );
};

export default Nickname;
