import React from "react";
import kakaoLoginImg from "../../assets/imgs/kakaologin.png";
import closeButton from "../../assets/imgs/close.png";
import loginImg from "../../assets/imgs/main.png";

import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const loginHandler = () => {
    window.location.href = link;
  };

  const handleModalClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div className="login_modal_background">
        <div className="login_modal_contents">
          <div className="login_modal_close_button">
            <img src={closeButton} onClick={handleModalClose} alt="close_button" />
          </div>
          <h1 className="login_title">
            <p>JUJU</p>CALENDAR
          </h1>
          <div className="login_contents_img">
            <img src={loginImg} alt="login_img" />
          </div>
          <div className="login_contents_sententce">
            <span>
              <p>카카오톡 로그인으로</p> 나만의 캘린더를 이용해보세요!
            </span>
          </div>
          <div className="login_kakao_button">
            <img src={kakaoLoginImg} onClick={loginHandler} alt="kakao_login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
