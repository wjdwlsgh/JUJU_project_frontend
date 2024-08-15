import React, { useState } from "react";
import axios from "axios";
import "../friends/addFriends.css";

const AddFriends = ({ isOpen, handleClose }) => {
  const [code, setCode] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUserInfo(null);

    try {
      // 서버로 코드를 전송하여 사용자 정보를 가져옵니다.
      const response = await axios.get(`/api/friends/search?code=${code}`);
      setUserInfo(response.data);
    } catch (err) {
      console.error("사용자 검색에 실패했습니다:", err);
      setError("사용자를 찾을 수 없습니다.");
    }

    setLoading(false);
  };

  const handleAddFriend = async () => {
    try {
      // 친구 추가 요청을 서버로 보냅니다.
      await axios.post("/api/friends/add", { friendId: userInfo.id });
      alert("친구 요청이 전송되었습니다!");
    } catch (err) {
      console.error("친구 추가에 실패했습니다:", err);
      alert("친구 추가에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="addFreinds-modal-overlay">
      <div className="addFriends-modal-content">
        <div className="addFriends-title">친구 추가</div>
        <div className="search-box">
          <form onSubmit={handleSearch} className="search-box">
            <input
              type="text"
              className="serch-txt"
              placeholder="코드 입력하세요."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="search-btn" type="submit">
              검색
            </button>
          </form>
        </div>

        <div className="search-results">
          {loading && <p>검색 중...</p>}
          {error && <p className="error">{error}</p>}
          {userInfo && (
            <div className="user-info">
              <p>이름: {userInfo.name}</p>
              <p>이메일: {userInfo.email}</p>
              <button onClick={handleAddFriend} className="add-friend-btn">
                친구 요청
              </button>
            </div>
          )}
        </div>
      </div>
      <button onClick={handleClose} className="addmodal-close-button">
        Close
      </button>
    </div>
  );
};

export default AddFriends;
