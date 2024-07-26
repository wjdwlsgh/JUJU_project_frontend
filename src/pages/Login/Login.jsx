import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
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
    await new Promise((r) => setTimeout(r, 1000));
    alert(JSON.stringify(data));
  };

  return (
    <div className="login-wrapper">
      <div className="Logintt">
        <div className="Logintt2">JUJU__Calendar_</div>
        <div className="Logintt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
          {/* <button>🏠</button>
          <button>❎</button> */}
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
              onClick={() => handleNavigate("/api/Account")}
            >
              회원가입
            </button>
            <button
              type="button"
              id="Login_button3"
              onClick={() => handleNavigate("/api/Find")}
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
