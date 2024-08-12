import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import Login from "./pages/Login/Login";
import Find from "./pages/Login/Find";
import AccountForm from "./pages/main/account/AccountForm";
import SettingPage from "./pages/main/SettingPage";
import mainImage from "./assets/imgs/main.png";
import { ToastContainer } from "react-toastify"; // ToastContainer 임포트
import "react-toastify/dist/ReactToastify.css"; // Toast 스타일 임포트
import Diary from "./pages/Diary/Diary";

function App() {
  const [profilePicture, setProfilePicture] = useState(
    localStorage.getItem("userProfilePicture") || mainImage
  );
  const [nickname, setNickname] = useState("");
  // const [userEmail, setUserEmail] = useState("test@example.com"); // 테스트 이메일 설정

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                setNickname={setNickname}
                setProfilePicture={setProfilePicture}
              />
            }
          />
          <Route
            path="/api/Main"
            element={
              <Main profilePicture={profilePicture} nickname={nickname} />
            }
          />
          <Route path="/api/Find" element={<Find />} />
          <Route path="/api/Account" element={<AccountForm />} />
          <Route
            path="/api/SettingPage"
            element={
              <SettingPage
                profilePicture={profilePicture}
                nickname={nickname}
                setProfilePicture={setProfilePicture}
                setNickname={setNickname}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/api/Diary" element={<Diary />} />
        </Routes>
        <ToastContainer /> {/* ToastContainer 추가 */}
      </Router>
    </div>
  );
}

export default App;
