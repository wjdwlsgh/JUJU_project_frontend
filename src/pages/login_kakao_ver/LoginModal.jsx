import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import kakaoLoginImg from "../../assets/imgs/kakaologin.png";
import closeButton from "../../assets/imgs/close.png";
import loginImg2 from "../../assets/imgs/calendar.png";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  useEffect(() => {
    // 현재 URL에서 인가 코드 추출
    const code = new URL(window.location.href).searchParams.get("code");
    console.log("Extracted code:", code);

    if (code) {
      // 서버로 인가 코드 전달
      axios
        .post("http://localhost:8080/api/auth/kakao", { code })
        .then((response) => {
          // 서버로부터 받은 응답 처리
          console.log(response.data);
          // 필요한 경우 사용자 정보를 저장하거나 리다이렉트 처리
          // navigate("/"); // 로그인 후 이동할 페이지로 리다이렉트
        })
        .catch((error) => {
          console.error("Error during Kakao login", error);
          // 에러 처리
        });
    }
  }, [navigate]);

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
          <div className="login_contents_background">
            <div className="login_contents_img">
              <img src={loginImg2} alt="login_img" />
              <div className="login_contents_sententce">
                <span>
                  <p>카카오톡 로그인으로</p> 나만의 캘린더를 이용해보세요!
                </span>
              </div>
            </div>
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
