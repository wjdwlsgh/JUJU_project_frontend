import React from "react";
import "./friendsModal.css"; // 모달의 스타일을 위한 CSS 파일을 임포트합니다
import porfileImg from "../assets/imgs/common.jpg";

const FriendsModal = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return (
    <div className="freinds-modal-overlay">
      <div className="freinds-modal-content">
        <div className="friends_title_mom">
          <div className="friends_title_baby1">친구 관리</div>
          <div className="friends_title_baby2">🔍 ➕ ⚙️</div>
          <div className="freinds_"></div>
          <div className="friends-main"></div>
        </div>
        <div className="friends_catalog_mom">
          <div className="friends_catalog_son">
            <div className="friends_catalog">
              <div></div>
              <img src={porfileImg} className="freinds_catalog_pic" /> 이름
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
    </div>
  );
};

export default FriendsModal;
