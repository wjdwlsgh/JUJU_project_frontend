import React from "react";
import "./modal2.css"; // 모달 스타일링 파일

const Modal2 = ({
  newEvent,
  handleClose,
  handleSave,
  handleChange,
  handleDelete, // 삭제 핸들러 추가
  colorMap,
}) => {
  // Helper function to format the date
  const formatDate = (date) => {
    if (!date) return ""; // Return empty string if no date is provided
    // Convert to ISO string and extract date and time
    const isoString = new Date(date).toISOString();
    return isoString.slice(0, 16); // Extract 'yyyy-MM-ddThh:mm'
  };

  return (
    <div className="modal2">
      <div className="modal-content2">
        <span className="close" onClick={handleClose}>
          &times;
        </span>
        <h2>일정을 수정하세요.</h2>
        <div className="schedule">
          <form className="modalform">
            <label htmlFor="title" className="col-form-label">
              일정 내용
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={newEvent.title || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="start" className="col-form-label">
              시작 날짜와 시간
              <input
                type="datetime-local"
                className="form-control"
                id="start"
                name="start"
                value={formatDate(newEvent.start)}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="end" className="col-form-label">
              종료 날짜와 시간
              <input
                type="datetime-local"
                className="form-control"
                id="end"
                name="end"
                value={formatDate(newEvent.end)}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="color" className="col-form-label">
              색상 선택
              <select
                className="form-control"
                id="color"
                name="color"
                value={newEvent.color || ""}
                onChange={handleChange}
                required
              >
                <option value="">색상을 선택하세요</option>
                {Object.keys(colorMap).map((colorName) => (
                  <option key={colorName} value={colorMap[colorName]}>
                    {colorName}
                  </option>
                ))}
              </select>
            </label>
            <div className="modal-buttons">
              <button type="button" onClick={handleSave}>
                Save
              </button>
              <button type="button" onClick={handleDelete}>
                Delete
              </button>
              <button type="button" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal2;
