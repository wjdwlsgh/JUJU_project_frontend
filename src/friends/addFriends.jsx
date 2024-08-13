import React from "react";
import "../friends/addFriends.css";

const addFriends = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;

  return (
    <div className="addFreinds-modal-overlay">
      <div className="addFreinds-modal-content"></div>
      <button onClick={handleClose} className="addmodal-close-button">
        Close
      </button>
    </div>
  );
};

export default addFriends;
