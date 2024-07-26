import React from "react";
import "./Find.css";

function Find() {
  return (
    <div className="find-wrapper">
      <div className="Findtt">
        <div className="Findtt2">JUJU__Calendar_</div>
        <div className="Findtt3">
          # 하 이 # juju # 코 린 이 들 # 쌈 @ 뽕 # 🐧 🐹 🐶 🐿️ 🐤
        </div>
      </div>
      <div className="find-form-mom">
        <form method="post" action="서버의url" id="find-form">
          <h2 id="Find_Title">비밀번호 찾기🔐</h2>
          <div className="Find_text1">
            <label htmlFor="FindName" className="find_text_title">
              이름
            </label>
            <input type="text" placeholder="  Name" id="FindName" />
          </div>
          <div className="Find_text2">
            <label htmlFor="FindEmail" className="find_text_title">
              이메일
            </label>
            <input
              type="email"
              name="userName"
              placeholder="  test@email.com"
              id="FindEmail"
            />
          </div>
          <div className="Find_text3">
            <label htmlFor="FindBirth" className="find_text_title">
              생년월일
            </label>
            <input type="date" name="userName" id="FindBirth" />
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
