import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const updateClock = () => {
      setTime(new Date().toLocaleTimeString());
    };

    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 interval 정리
  }, []);

  return <h3 id="Clock">{time}</h3>;
}

export default Clock;
