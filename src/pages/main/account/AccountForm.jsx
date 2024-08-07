import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./AccountForm.css";

function AccountForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const onSubmit = async (data) => {
    if (!isVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        data
      );
      console.log("회원가입 응답:", response.data);

      alert("회원가입 성공");
      navigate("/"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert(
        "회원가입 실패: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const sendVerificationCode = async () => {
    const email = getValues("email");
    if (!email) {
      alert("이메일을 입력해주세요.");
      return;
    }
    setEmailSending(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/send-email-verification",
        {
          email,
        }
      );
      console.log("이메일 인증 코드 전송 응답:", response.data);
      alert("인증 코드가 이메일로 전송되었습니다.");
      setEmailSent(true);
    } catch (error) {
      console.error("이메일 인증 코드 전송 실패:", error);
      alert(
        "이메일 인증 코드 전송 실패: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setEmailSending(false);
    }
  };

  const verifyCode = async () => {
    const email = getValues("email");
    const verificationCode = getValues("verificationCode");
    if (!verificationCode) {
      alert("인증 코드를 입력해주세요.");
      return;
    }
    setVerificationLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/verify-email-code",
        {
          email,
          code: verificationCode,
        }
      );
      console.log("이메일 인증 코드 확인 응답:", response.data);
      if (response.data) {
        alert("이메일 인증이 완료되었습니다.");
        setIsVerified(true);
      } else {
        alert("인증 코드가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("이메일 인증 코드 확인 실패:", error);
      alert(
        "이메일 인증 코드 확인 실패: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setVerificationLoading(false);
    }
  };

  return (
    <div className="account-wrapper">
      <div className="Accounttt">
        <div className="Accounttt2">
          <button className="Account_button" onClick={() => navigate("/")}>
            JUJU__Calendar_
          </button>
        </div>
        <div className="Accounttt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} id="account-form">
        <div className="title-mom">
          <div id="frog">🐸</div>
          <div className="title">create account</div>
          <div id="frog">🐸</div>
        </div>

        <div className="account1">
          <p className="account_name">이름</p>
          <div className="input-mom">
            <input
              className="input-name"
              type="text"
              name="fullName"
              placeholder="Full Name"
              {...register("fullName", { required: "이름은 필수 입력입니다." })}
            />
            {errors.fullName && (
              <small className="Accountsmall" role="alert">
                {errors.fullName.message}
              </small>
            )}
          </div>
        </div>
        <div className="account2">
          <p className="account_name">닉네임</p>
          <div className="input-mom">
            <input
              className="input-nickname"
              type="text"
              name="nickname"
              placeholder="Nickname"
              {...register("nickname", {
                required: "닉네임은 필수 입력입니다.",
              })}
            />
            {errors.nickname && (
              <small className="Accountsmall" role="alert">
                {errors.nickname.message}
              </small>
            )}
          </div>
        </div>
        <div className="account3">
          <p className="account_name">이메일</p>
          <div className="input-mom">
            <div className="button-mom">
              <input
                className="input-email"
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="off" // 자동완성 비활성화
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                })}
              />
              {!emailSent && (
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={emailSending}
                  className="emailcode"
                >
                  {emailSending ? "전송 중..." : "인증 코드 전송"}
                </button>
              )}
            </div>
            {errors.email && (
              <small className="Accountsmall" role="alert">
                {errors.email.message}
              </small>
            )}
          </div>
        </div>
        {emailSent && !isVerified && (
          <div className="account3">
            <p className="account_name">인증 코드</p>
            <div className="verification-input-wrapper">
              <input
                type="text"
                name="verificationCode"
                placeholder="Verification Code"
                {...register("verificationCode", {
                  required: "인증 코드는 필수 입력입니다.",
                })}
              />
              <button
                type="button"
                onClick={verifyCode}
                disabled={verificationLoading}
              >
                {verificationLoading ? "확인 중..." : "인증 코드 확인"}
              </button>
            </div>
            {errors.verificationCode && (
              <small className="Accountsmall" role="alert">
                {errors.verificationCode.message}
              </small>
            )}
          </div>
        )}
        <div className="account4">
          <p className="account_name">비밀번호</p>
          <div className="input-mom">
            <input
              className="input-password"
              type="password"
              name="password1"
              placeholder="Password"
              {...register("password1", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "비밀번호는 최소 8자 이상이어야 합니다.",
                },
              })}
            />
            {errors.password1 && (
              <small className="Accountsmall" role="alert">
                {errors.password1.message}
              </small>
            )}
          </div>
        </div>
        <div className="account5">
          <p className="account_name">비밀번호 확인</p>
          <div className="input-mom">
            <input
              className="input-check-password"
              type="password"
              name="passwordConfirm"
              placeholder="Confirm Password"
              {...register("password2", {
                required: "비밀번호 확인은 필수 입력입니다.",
                validate: (value) =>
                  value === getValues("password1") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.password2 && (
              <small className="Accountsmall" role="alert">
                {errors.password2.message}
              </small>
            )}
          </div>
        </div>
        <div className="account6">
          <p className="account_name">생년월일</p>
          <div className="input-mom">
            <input
              className="input-birthday"
              type="date"
              name="birthDate"
              placeholder="Birth Date"
              {...register("birthDate", {
                required: "생년월일은 필수 입력입니다.",
              })}
            />
            {errors.birthDate && (
              <small className="Accountsmall" role="alert">
                {errors.birthDate.message}
              </small>
            )}
          </div>
        </div>
        <input type="submit" value="가입하기" id="signup" />
      </form>
    </div>
  );
}

export default AccountForm;
