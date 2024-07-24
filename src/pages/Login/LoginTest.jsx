import React, { useState } from "react";
import "./LoginTest.css"; // CSS 파일을 가져옵니다

function LoginTest() {
  const [showSignup, setShowSignup] = useState(false); // 상태 관리: true면 회원가입 폼을 보여줌

  return (
    <div className="container">
      <div className="welcome">
        <div
          className="pinkbox"
          style={{
            transform: showSignup ? "translateX(80%)" : "translateX(0%)",
          }}
        >
          <div className={`signup ${showSignup ? "" : "nodisplay"}`}>
            <h1>Register</h1>
            <form autoComplete="off">
              <input type="text" placeholder="Username" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="password" placeholder="Confirm Password" />
              <button className="button submit">Create Account</button>
            </form>
          </div>
          <div className={`signin ${showSignup ? "nodisplay" : ""}`}>
            <h1>Sign In</h1>
            <form className="more-padding" autoComplete="off">
              <input type="text" placeholder="Username" />
              <input type="password" placeholder="Password" />
              <div className="checkbox">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <button className="button submit">Login</button>
            </form>
          </div>
        </div>
        <div className="leftbox">
          <h2 className="title">
            <span>BLOOM</span>&<br />
            BOUQUET
          </h2>
          <p className="desc">
            Pick your perfect <span>Bouquet</span>
          </p>
          <img
            className="flower smaller"
            src="https://image.ibb.co/d5X6pn/1357d638624297b.jpg"
            alt="Flower"
          />
          <p className="account">Have an account?</p>
          <button
            className="button"
            id="signin"
            onClick={() => setShowSignup(false)}
          >
            Login
          </button>
        </div>
        <div className="rightbox">
          <h2 className="title">
            <span>BLOOM</span>&<br />
            BOUQUET
          </h2>
          <p className="desc">
            Pick your perfect <span>Bouquet</span>
          </p>
          <img
            className="flower"
            src="https://preview.ibb.co/jvu2Un/0057c1c1bab51a0.jpg"
            alt="Bouquet"
          />
          <p className="account">Don't have an account?</p>
          <button
            className="button"
            id="signup"
            onClick={() => setShowSignup(true)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginTest;
