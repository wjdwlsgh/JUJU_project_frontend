import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"; // Axios import

function Login({ setNickname }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        data
      );
      console.log("로그인 응답:", response.data); // 응답을 콘솔에 출력

      // 로그인 성공 시 닉네임 업데이트
      setNickname(response.data.user.nickname); // 서버 응답에 따라 적절한 필드로 설정

      alert("로그인 성공");
      navigate("/main"); // 로그인 후 홈 페이지로 이동
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="Logintt">
        <div className="Logintt2">JUJU__Calendar_</div>
        <div className="Logintt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>
      <div className="login-form-mom">
        <form noValidate onSubmit={handleSubmit(onSubmit)} id="login-form">
          <h2 id="Login_Title">로그인🔓</h2>
          <div className="Login_text1">
            <label htmlFor="LoginEmail" className="Login_text_title">
              이메일
            </label>
            <input
              type="email"
              id="LoginEmail"
              placeholder="  test@email.com"
              aria-invalid={
                isSubmitted ? (errors.email ? "true" : "false") : undefined
              }
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // 이메일 정규식 패턴
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            <div className="error-message">
              {errors.email && (
                <small role="alert">{errors.email.message}</small>
              )}
            </div>
          </div>

          <div className="Login_text2">
            <label htmlFor="LoginPs" className="Login_text_title">
              비밀번호
            </label>
            <input
              type="password"
              id="LoginPs"
              placeholder="  Password"
              aria-invalid={
                isSubmitted ? (errors.password ? "true" : "false") : undefined
              }
              {...register("password", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요.",
                },
              })}
            />
            <div className="error-message">
              {errors.password && (
                <small role="alert">{errors.password.message}</small>
              )}
            </div>
          </div>

          <div className="Login_button">
            <button id="Login_button" type="submit" disabled={isSubmitting}>
              로그인
            </button>
          </div>
          <div className="Login_find">
            <button
              type="button"
              id="Login_button2"
              onClick={() => handleNavigate("/api/account")}
            >
              회원가입
            </button>
            <button
              type="button"
              id="Login_button3"
              onClick={() => handleNavigate("/api/find")}
            >
              비밀번호 찾기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
