import React, { useState, useEffect } from "react";
import "./friendsModal.css";
import porfileImg from "../assets/imgs/common.jpg";
import AddFriends from "./addFriends";

const FriendsModal = ({ isOpen, handleClose }) => {
  const [isAddFriendsOpen, setIsAddFriendsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  const handleAddFriendsOpen = () => {
    setIsAddFriendsOpen(true);
  };

  const handleAddFriendsClose = () => {
    setIsAddFriendsOpen(false);
  };

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setShouldRender(false);
    }
  };

  const handleModalClose = () => {
    handleClose();
    setTimeout(() => setShouldRender(false)); // 페이드 아웃 애니메이션이 완료된 후 렌더링 제거
  };

  return shouldRender ? (
    <div
      className={`freinds-modal-overlay ${!isOpen ? "fade-out" : ""}`}
      onAnimationEnd={handleAnimationEnd}>
      <div className="freinds-modal-content">
        <div className="friends_title_mom">
          <div className="friends_title_baby1">친구 관리</div>
          <div className="friends_title_baby2">
            🔍 <span onClick={handleAddFriendsOpen}>➕</span> ⚙️
          </div>
        </div>
        <div className="friends_catalog_mom">
          <div className="friends_catalog_son">
            <div className="friends_catalog">
              <img src={porfileImg} className="freinds_catalog_pic" alt="프로필" /> 이름
            </div>
            <div className="friends_catalog_button">
              <button>프로필</button>
            </div>
          </div>
        </div>
        <button onClick={handleModalClose} className="modal-close-button">
          Close
        </button>
      </div>
      <AddFriends isOpen={isAddFriendsOpen} handleClose={handleAddFriendsClose} />
    </div>
  ) : null;
};

export default FriendsModal;
