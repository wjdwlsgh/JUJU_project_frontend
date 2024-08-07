import React, { useState } from "react";

const Diary = () => {
  const [date, setDate] = useState("");
  const [emotion, setEmotion] = useState("");
  const [diary, setDiary] = useState("");

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

  const handleCancel = () => {
    setDate("");
    setEmotion("");
    setDiary("");
  };

  // const handleComplete = () => {
  //   // 완료 버튼 로직 추가
  //   console.log("Date:", date);
  //   console.log("Emotion:", emotion);
  //   console.log("Diary:", diary);
  // };

  return (
    <div className="diary-page-mom">
      <Header />

      <section className="date-div">
        <p>오늘의 날짜</p>
        <input type="date" value={date} onChange={handleDateChange} />
      </section>

      <section className="emotion-div">
        <p>오늘의 감정</p>
        <button onClick={() => handleEmotionChange("완전 좋음")}>🤩</button>
        <button onClick={() => handleEmotionChange("좋음")}>😁</button>
        <button onClick={() => handleEmotionChange("그럭저럭")}>😐</button>
        <button onClick={() => handleEmotionChange("나쁨")}>😔</button>
        <button onClick={() => handleEmotionChange("완전 나쁨")}>🤬</button>
      </section>

      <section className="diary-write-div">
        <p>오늘의 하루는 어땠나요?</p>
        <textarea value={diary} onChange={handleDiaryChange} maxLength={100} />
      </section>

      <footer className="button-div">
        <button onClick={handleCancel}>취소</button>
        <button onClick={handleCancel}>완료</button>
      </footer>
    </div>
  );
};

const Header = () => (
  <header>
    <p> 일기 </p>
  </header>
);

export default Diary;
