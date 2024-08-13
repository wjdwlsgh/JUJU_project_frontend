import React, { useState } from "react";
import "./friendsModal.css"; // 모달의 스타일을 위한 CSS 파일을 임포트합니다
import porfileImg from "../assets/imgs/common.jpg";
import AddFriends from "./addFriends";

const FriendsModal = ({ isOpen, handleClose }) => {
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);

  const handleAddFriendsOpen = () => {
    setIsAddFriendsOpen(true);
  };

  const handleAddFriendsClose = () => {
    setIsAddFriendsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="freinds-modal-overlay">
      <div className="freinds-modal-content">
        <div className="friends_title_mom">
          <div className="friends_title_baby1">친구 관리</div>
          <div className="friends_title_baby2">
            🔍 <span onClick={handleAddFriendsOpen}>➕</span> ⚙️
          </div>
          <div className="freinds_"></div>
          <div className="friends-main"></div>
        </div>
        <div className="friends_catalog_mom">
          <div className="friends_catalog_son">
            <div className="friends_catalog">
              <div></div>
              <img
                src={porfileImg}
                className="freinds_catalog_pic"
                alt="프로필"
              />{" "}
              이름
            </div>
            <div className="friends_catalog_button">
              <button>프로필</button>
            </div>
          </div>
        </div>
        <button onClick={handleClose} className="modal-close-button">
          Close
        </button>
      </div>

      {/* AddFriends 모달을 렌더링 */}
      <AddFriends
        isOpen={isAddFriendsOpen}
        handleClose={handleAddFriendsClose}
      />
    </div>
  );
};

export default FriendsModal;
