// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/main/Main";
import Login from "./pages/Login/Login";
import Find from "./pages/Login/Find";
import AccountForm from "./pages/main/account/AccountForm";
import SettingPage from "./pages/main/SettingPage";

function App() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [nickname, setNickname] = useState("");

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/api/Main"
            element={
              <Main profilePicture={profilePicture} nickname={nickname} />
            }
          />
          <Route path="/" element={<Login />} />
          <Route path="/api/Find" element={<Find />} />
          <Route path="api/Account" element={<AccountForm />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
