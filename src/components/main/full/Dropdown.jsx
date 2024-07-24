import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const events = [
  {
    title: "TODO1",
    start: new Date("2023-3-22"),
    extendedProps: {
      todo: [
        "강쥐산책하기🐕‍🦺",
        "기술면접공부📝",
        "플젝하기👩🏻‍💻",
        "블로그 정리💡",
        "원티드 플젝 💻",
        "이력서 작성 📄",
      ],
    },
  },
  {
    title: "TODO2",
    start: new Date("2023-3-29"),
    extendedProps: {
      todo: ["강쥐산책하기🐕‍🦺", "모의면접🌟", "플젝하기👩🏻‍💻", "카페 🍰"],
    },
  },
  {
    title: "TODO3",
    start: new Date("2023-3-30"),
    extendedProps: {
      todo: ["강쥐산책하기🐕‍🦺", "기술면접공부📝", "플젝하기👩🏻‍💻", "방청소하기🧹"],
    },
  },
];

const renderEventContent = (eventInfo) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        <span>{eventInfo.title}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {eventInfo.extendedProps.todo.map((todoItem, index) => (
          <Dropdown.Item key={index}>{todoItem}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const App = () => {
  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>{renderEventContent(event)}</div>
      ))}
    </div>
  );
};

export default App;
