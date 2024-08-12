import React, { useState, useEffect } from "react";
import "./Article.css";

const Article = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    setEntries(savedEntries);
  }, []);

  return (
    <div className="article-page">
      <header className="article-header-div">
        <div id="article-p-style">일기 목록</div>
      </header>

      <section className="entries-list">
        {entries.length === 0 ? (
          <p>저장된 일기가 없습니다.</p>
        ) : (
          <ul className="entries-ul">
            {entries.map((entry, index) => (
              <li key={index} className="entry-li">
                {entry.photo && (
                  <div className="entry-photo">
                    <img src={entry.photo} alt="Diary" />
                  </div>
                )}
                <div className="entry-content">
                  <div className="entry-title">
                    {entry.diary.substring(0, 20)}...
                  </div>
                  <div className="entry-date">{entry.date}</div>
                  <div className="entry-emotion">감정: {entry.emotion}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Article;
