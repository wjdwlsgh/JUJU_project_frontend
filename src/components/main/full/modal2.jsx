import React from "react";
import "./modal2.css"; // 모달 스타일링 파일

const Modal2 = ({
  newEvent,
  handleClose,
  handleSave,
  handleChange,
  colorMap,
}) => {
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
                value={newEvent.title}
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
                value={newEvent.start}
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
                value={newEvent.end}
                onChange={handleChange}
                required
              />
            </label>
            <label htmlFor="color" className="col-form-label">
              색상 선택
              <select
                className="form-control"
                id="color"
                name="color"
                value={newEvent.color}
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
