import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/changePassword", {
        currentPassword,
        newPassword,
      });
      console.log("Password updated:", response.data);
    } catch (error) {
      console.error("Error updating password:", error);
    }
    alert("비밀번호 변경이 완료되었습니다!");
  };

  return (
    <div>
      {/* <h2>비밀번호 변경</h2> */}
      <input
        className="password-input"
        // className="password-input"
        type="password"
        placeholder="현재 비밀번호를 입력하세요"
        value={currentPassword}
        onChange={handleCurrentPasswordChange}
      />
      <input
        className="password-input"
        type="password"
        placeholder="새로운 비밀번호를 입력하세요"
        value={newPassword}
        onChange={handleNewPasswordChange}
      />
      <button id="password-button" onClick={handleSave}>
        변경
      </button>
    </div>
  );
};

export default ChangePassword;
