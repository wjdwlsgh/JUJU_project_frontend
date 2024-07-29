import React, { useState } from "react";
import "./Find.css";
import axios from "axios";

function Find() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    birthDate: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/forgot-password",
        formData
      );
      if (response.data.success) {
        alert("임시 비밀번호가 이메일로 전송되었습니다.");
      } else {
        alert(response.data.message || "오류가 발생했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다.");
      console.error(
        "서버 응답 오류:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="find-wrapper">
      <div className="Findtt">
        <div className="Findtt2">JUJU__Calendar_</div>
        <div className="Findtt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>
      <div className="find-form-mom">
        <form method="post" id="find-form" onSubmit={handleSubmit}>
          <h2 id="Find_Title">비밀번호 찾기🔐</h2>
          <div className="Find_text1">
            <label htmlFor="fullName" className="find_text_title">
              이름
            </label>
            <input
              type="text"
              placeholder="Name"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="Find_text2">
            <label htmlFor="email" className="find_text_title">
              이메일
            </label>
            <input
              type="email"
              placeholder="test@email.com"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="Find_text3">
            <label htmlFor="birthDate" className="find_text_title">
              생년월일
            </label>
            <input
              type="date"
              id="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="Find_text4">
            <input type="submit" value="비밀번호 찾기" id="Findbutton" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Find;
