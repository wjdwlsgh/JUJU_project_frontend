import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        data
      );
      console.log("로그인 응답:", response.data); // 응답을 콘솔에 출력
      alert("로그인 성공");

      // 로그인 성공 후 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 홈 페이지로 이동 (경로를 `/` 또는 `/main`으로 설정)

      navigate("/api/main");
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
              onClick={() => navigate("/register")}
            >
              회원가입
            </button>
            <button
              type="button"
              id="Login_button3"
              onClick={() => navigate("/find-password")}
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
