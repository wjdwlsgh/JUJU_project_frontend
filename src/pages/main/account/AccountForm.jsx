import React from "react";
import "./JUJU_account.css";

function AccountForm() {
  return (
    <div className="account-wrapper">
      <div className="Accounttt">
        <div className="Accounttt2">JUJU__Calendar_</div>
        <div className="Accounttt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>

      <form method="post" action="서버의url" id="account-form">
        <div className="account-mom">
          <h2>회원가입</h2>
          <div className="account1">
            <p className="account_name">이름</p>
            <input type="text" name="FUll_Name" placeholder="Full Name" />
          </div>
          <div className="account2">
            <p className="account_name">닉네임</p>
            <input type="text" name="nickname" placeholder="Nickname" />
          </div>
          <div className="account3">
            <p className="account_name">이메일</p>
            <input type="email" name="userName" placeholder="Email" />
          </div>
          <div className="account4">
            <p className="account_name">비밀번호</p>
            <input
              type="password"
              name="userPassword1"
              placeholder="Password"
            />
          </div>
          <div className="account5">
            <p className="account_name">비밀번호 확인</p>
            <input
              type="password"
              name="userPassword2"
              placeholder="Password"
            />
          </div>
          <div className="account6">
            <p className="account_name">생년월일</p>
            <input type="date" name="user_Date" />
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
