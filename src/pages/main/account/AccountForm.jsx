import React from "react";
import "./JUJU_account.css";
<<<<<<< HEAD
import axios from "axios"; // Axios import
import { useForm } from "react-hook-form"; // react-hook-form import
import { useNavigate } from "react-router-dom";

function AccountForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        data
      );
      console.log("회원가입 응답:", response.data); // 응답 데이터 로그 출력

      alert("회원가입 성공");
      navigate("/"); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert(
        "회원가입 실패: " + (error.response?.data?.message || error.message)
      );
    }
  };
=======

function AccountForm() {
>>>>>>> 338eab33b2b08d861d0f66ccc85db7cd46113883
  return (
    <div className="account-wrapper">
      <div className="Accounttt">
        <div className="Accounttt2">JUJU__Calendar_</div>
        <div className="Accounttt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>

<<<<<<< HEAD
      <form onSubmit={handleSubmit(onSubmit)} id="account-form">
=======
      <form method="post" action="서버의url" id="account-form">
>>>>>>> 338eab33b2b08d861d0f66ccc85db7cd46113883
        <div className="account-mom">
          <h2>회원가입</h2>
          <div className="account1">
            <p className="account_name">이름</p>
<<<<<<< HEAD
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              {...register("fullName", { required: "이름은 필수 입력입니다." })}
            />
            {errors.fullName && (
              <small role="alert">{errors.fullName.message}</small>
            )}
          </div>
          <div className="account2">
            <p className="account_name">닉네임</p>
            <input
              type="text"
              name="nickname"
              placeholder="Nickname"
              {...register("nickname", {
                required: "닉네임은 필수 입력입니다.",
              })}
            />
            {errors.nickname && (
              <small role="alert">{errors.nickname.message}</small>
            )}
          </div>
          <div className="account3">
            <p className="account_name">이메일</p>
            <input
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "이메일은 필수 입력입니다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
            />
            {errors.email && <small role="alert">{errors.email.message}</small>}
=======
            <input type="text" name="FUll_Name" placeholder="Full Name" />
          </div>
          <div className="account2">
            <p className="account_name">닉네임</p>
            <input type="text" name="nickname" placeholder="Nickname" />
          </div>
          <div className="account3">
            <p className="account_name">이메일</p>
            <input type="email" name="userName" placeholder="Email" />
>>>>>>> 338eab33b2b08d861d0f66ccc85db7cd46113883
          </div>
          <div className="account4">
            <p className="account_name">비밀번호</p>
            <input
              type="password"
<<<<<<< HEAD
              name="password1"
              placeholder="Password"
              {...register("password1", {
                required: "비밀번호는 필수 입력입니다.",
                minLength: {
                  value: 8,
                  message: "8자리 이상 비밀번호를 사용하세요.",
                },
              })}
            />
            {errors.password1 && (
              <small role="alert">{errors.password1.message}</small>
            )}
=======
              name="userPassword1"
              placeholder="Password"
            />
>>>>>>> 338eab33b2b08d861d0f66ccc85db7cd46113883
          </div>
          <div className="account5">
            <p className="account_name">비밀번호 확인</p>
            <input
              type="password"
<<<<<<< HEAD
              name="password2"
              placeholder="Password"
              {...register("password2", {
                required: "비밀번호 확인은 필수 입력입니다.",
                validate: (value) =>
                  value === getValues("password1") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.password2 && (
              <small role="alert">{errors.password2.message}</small>
            )}
          </div>
          <div className="account6">
            <p className="account_name">생년월일</p>
            <input
              type="date"
              name="birthDate"
              {...register("birthDate", {
                required: "생년월일은 필수 입력입니다.",
              })}
            />
            {errors.birthDate && (
              <small role="alert">{errors.birthDate.message}</small>
            )}
=======
              name="userPassword2"
              placeholder="Password"
            />
          </div>
          <div className="account6">
            <p className="account_name">생년월일</p>
            <input type="date" name="user_Date" />
>>>>>>> 338eab33b2b08d861d0f66ccc85db7cd46113883
          </div>
          <div className="account7">
            <input type="submit" id="Create_Id" value="가입하기" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountForm;
