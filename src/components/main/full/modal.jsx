import React, { useEffect } from "react";
import "./modal.css"; // 모달 스타일링 파일
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  newEvent,
  handleClose,
  handleSave,
  handleChange,
  colorMap,
}) => {
  useEffect(() => {
    const options = document.querySelectorAll(".coloroption");
    options.forEach((option) => {
      option.style.height = "50px";
      option.style.padding = "10px";
      option.style.fontSize = "16px";
      option.style.backgroundColor = "#f0f0f0";
    });
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, y: "-50%" },
    visible: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "50%" },
  };

  return (
    <AnimatePresence>
      <div className="modal">
        <motion.div
          className="modal-content"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          transition={{ duration: 0.3 }}
        >
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <h2>일정을 입력하세요.</h2>
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
              <label htmlFor="color" className="col-form-label2">
                색상 선택
                <select
                  className="form-control"
                  id="color"
                  name="color"
                  value={newEvent.color}
                  onChange={handleChange}
                  required
                >
                  <option className="coloroption" value="">
                    색상을 선택하세요
                  </option>
                  {Object.keys(colorMap).map((colorName) => (
                    <option
                      key={colorName}
                      className="coloroption"
                      value={colorMap[colorName]}
                    >
                      {colorName}
                    </option>
                  ))}
                </select>
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={handleSave}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default Modal;
