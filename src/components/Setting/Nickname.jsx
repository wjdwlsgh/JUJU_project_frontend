// import React, { useState } from "react";
import React from "react";
// import axios from "axios";
import "./Nickname.css";

const Nickname = ({ value, onChange, onSubmit }) => {
  return (
    <div>
      <input
        className="nickname-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder="닉네임을 입력하세요"
      />
      <button id="nickname-button" onClick={onSubmit}>
        변경
      </button>
    </div>
  );
};

export default Nickname;
