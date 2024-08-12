import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Diary.css";

const Diary = () => {
  const [date, setDate] = useState("");
  const [emotion, setEmotion] = useState("");
  const [diary, setDiary] = useState("");
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleEmotionChange = (emotion) => {
    setEmotion(emotion);
  };

  const handleDiaryChange = (e) => {
    if (e.target.value.length <= 100) {
      setDiary(e.target.value);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setDate("");
    setEmotion("");
    setDiary("");
  };

  const handleHomeClick = () => {
    navigate("/api/main");
  };

  // const handleComplete = () => {
  //   // 완료 버튼 로직 추가
  //   console.log("Date:", date);
  //   console.log("Emotion:", emotion);
  //   console.log("Diary:", diary);
  // };

  return (
    <div className="diary-page-mom">
      <div className="mypage-top">
        <button className="mypage-top-button" onClick={handleHomeClick}>
          🏠 JUJU-MY-PAGE
        </button>
      </div>
      <div className="diary-div">
        <header className="header-div">
          <div id="p-style"> 일기 </div>
        </header>

        <section className="date-div">
          <div id="p-style">오늘의 날짜</div>
          <input
            id="date-css"
            type="date"
            value={date}
            onChange={handleDateChange}
          />
        </section>

        <section className="emotion-div">
          <div id="p-style">오늘의 감정</div>

          <div id="emotion-button-mom">
            <button
              id="emotion-button"
              onClick={() => handleEmotionChange("완전 좋음")}
            >
              🤩
            </button>
            <button
              id="emotion-button"
              onClick={() => handleEmotionChange("좋음")}
            >
              😁
            </button>
            <button
              id="emotion-button"
              onClick={() => handleEmotionChange("그럭저럭")}
            >
              😐
            </button>
            <button
              id="emotion-button"
              onClick={() => handleEmotionChange("나쁨")}
            >
              😔
            </button>
            <button
              id="emotion-button"
              onClick={() => handleEmotionChange("완전 나쁨")}
            >
              🤬
            </button>
          </div>
        </section>

        <section className="diary-write-div">
          <div id="p-style">오늘의 하루는 어땠나요?</div>

          <div className="write-div">
            <article className="article-1">
              <label htmlFor="photo-upload" className="photo-label">
                사진 선택
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
              {photo && (
                <div className="photo-preview">
                  <img src={photo} alt="Diary" className="photo-thumbnail" />
                </div>
              )}
            </article>

            <article className="article-2">
              <textarea
                id="textarea-style"
                value={diary}
                onChange={handleDiaryChange}
                maxLength={100}
                placeholder="일기를 기록해 주세요. 최대 100자"
              />
            </article>
          </div>
        </section>

        <footer className="button-div">
          <button onClick={handleCancel}>취소</button>
          <button onClick={handleCancel}>완료</button>
        </footer>
      </div>
    </div>
  );
};

export default Diary;
