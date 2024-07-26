import React, { Component, createRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./full.css";
import Modal from "./modal";
import Modal2 from "./modal2";
import axios from "axios";

class Full extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = createRef();
    this.state = {
      events: [],
      isModalOpen: false,
      isEditMode: false,
      editingEventId: null,
      newEvent: { title: "", start: "", end: "", color: "" },
      colorMap: {
        Red: "red",
        Blue: "blue",
        Green: "green",
        Yellow: "yellow",
        Purple: "purple",
        Orange: "orange",
        "Custom Pink": "#d79999",
      },
      lastClickedDate: null,
      clickTimeout: null,
      isModal2Open: false,
      isDoubleClick: false,
    };
  }

  componentDidMount() {
    this.handleResize(); // Initial resize
    window.addEventListener("resize", this.handleResize);

    // 서버에서 데이터 가져오기
    axios
      .get("http://localhost:8080/api/todo")
      .then((response) => {
        const events = response.data.map((item) => ({
          id: item.id,
          title: item.title,
          start: item.start || new Date().toISOString(),
          end: item.end || new Date().toISOString(),
          backgroundColor: item.color || "blue",
          extendedProps: {
            color: item.color || "blue",
          },
        }));
        this.setState({ events });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (this.calendarRef.current) {
      this.calendarRef.current.getApi().updateSize();
    }
  };
  //clickTimeout
  handleDateClick = (arg) => {
    const { lastClickedDate, isDoubleClick } = this.state;

    if (isDoubleClick) {
      this.setState({
        isModalOpen: true,
        newEvent: {
          ...this.state.newEvent,
          start: arg.dateStr,
          end: arg.dateStr,
        },
        isDoubleClick: false,
      });
    } else {
      if (lastClickedDate && new Date().getTime() - lastClickedDate < 1000) {
        this.setState({ isDoubleClick: true });
      } else {
        this.setState({
          lastClickedDate: new Date().getTime(),
          clickTimeout: setTimeout(() => {
            this.setState({ lastClickedDate: null, isDoubleClick: false });
          }, 1000),
        });
      }
    }
  };

  handleEventClick = (arg) => {
    this.setState({
      isModal2Open: true,
      editingEventId: arg.event.id,
      newEvent: {
        title: arg.event.title || "",
        start: arg.event.startStr || "",
        end: arg.event.endStr || "",
        color: arg.event.backgroundColor || "",
      },
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      newEvent: { title: "", start: "", end: "", color: "" },
    });
  };

  handleCloseModal2 = () => {
    this.setState({
      isModal2Open: false,
      newEvent: { title: "", start: "", end: "", color: "" },
      editingEventId: null,
    });
  };

  handleSaveEvent = () => {
    if (this.state.newEvent.title.trim() === "") {
      alert("제목을 입력해 주세요.");
      return;
    }

    const newEvent = {
      id: new Date().getTime().toString(),
      ...this.state.newEvent,
      extendedProps: {
        color: this.state.newEvent.color,
      },
    };

    // 서버로 데이터 보내기
    axios
      .post("http://localhost:8080/api/todo", {
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        color: newEvent.color,
      })
      .then((response) => {
        console.log("Save success:", response.data);
        this.setState({
          events: [...this.state.events, response.data], // 서버에서 반환된 데이터를 사용
          isModalOpen: false,
          newEvent: { title: "", start: "", end: "", color: "" },
        });
      })
      .catch((error) => {
        console.error("Save error:", error);
      });
  };

  handleSaveEvent2 = () => {
    const { editingEventId, newEvent, events } = this.state;

    if (newEvent.title.trim() === "") {
      alert("제목을 입력해 주세요.");
      return;
    }

    const updatedEvent = {
      id: editingEventId,
      ...newEvent,
      extendedProps: {
        color: newEvent.color,
      },
    };

    // 서버로 데이터 업데이트
    axios
      .put(`http://localhost:8080/api/todo/${editingEventId}`, {
        title: newEvent.title,
        start: newEvent.start,
        end: newEvent.end,
        color: newEvent.color,
      })
      .then((response) => {
        console.log("Update success:", response.data);
        this.setState({
          events: events.map((event) =>
            event.id === editingEventId ? response.data : event
          ),
          isModal2Open: false,
          newEvent: { title: "", start: "", end: "", color: "" },
          editingEventId: null,
        });
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  handleDeleteEvent = () => {
    const { editingEventId, events } = this.state;

    if (!editingEventId) {
      alert("삭제할 일정을 선택해 주세요.");
      return;
    }

    // 서버로 데이터 삭제 요청
    axios
      .delete(`http://localhost:8080/api/todo/${editingEventId}`)
      .then(() => {
        console.log("Delete success");

        // 상태 업데이트
        this.setState(
          (prevState) => {
            const updatedEvents = prevState.events.filter(
              (event) => event.id !== editingEventId
            );
            return {
              events: updatedEvents,
              isModal2Open: false,
              newEvent: { title: "", start: "", end: "", color: "" },
              editingEventId: null,
            };
          },
          () => {
            console.log("Updated events after delete:", this.state.events);
            // 강제 렌더링 호출
            this.calendarRef.current.getApi().render();
          }
        );
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.events !== this.state.events) {
      this.calendarRef.current.getApi().render();
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ newEvent: { ...this.state.newEvent, [name]: value } });
  };

  handlePrev = () => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.prev();
  };

  handleNext = () => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.next();
  };

  handleToday = () => {
    const calendarApi = this.calendarRef.current.getApi();
    calendarApi.today();
  };

  render() {
    return (
      <div className="fullMain">
        {/* <div className="fullClock">
          <Clock />
        </div> */}
        <div class="main-logo">JUJU-CALENDAR</div>
        {/* <div class="main-top-line"></div> */}
        <div className="custom-calendar-container">
          <FullCalendar
            key={this.state.events.length} // key 추가
            ref={this.calendarRef}
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
              interactionPlugin,
            ]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today addEventButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
            }}
            customButtons={{
              addEventButton: {
                text: "Add Event",
                click: () => this.setState({ isModalOpen: true }),
              },
            }}
            buttonText={{
              prev: "〈", // 이전 화살표
              next: "〉", // 다음 화살표
              today: "Today",
            }}
            aspectRatio={2}
            events={this.state.events}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
            selectable={true}
            handleWindowResize={true}
            eventClassNames={["custom-class"]} // 이벤트 클래스 이름을 정의
          />
        </div>

        {this.state.isModalOpen && (
          <Modal
            newEvent={this.state.newEvent}
            handleClose={this.handleCloseModal}
            handleSave={this.handleSaveEvent}
            handleChange={this.handleInputChange}
            colorMap={this.state.colorMap}
          />
        )}

        {this.state.isModal2Open && (
          <Modal2
            newEvent={this.state.newEvent}
            handleClose={this.handleCloseModal2}
            handleSave={this.handleSaveEvent2}
            handleDelete={this.handleDeleteEvent}
            handleChange={this.handleInputChange}
            colorMap={this.state.colorMap}
          />
        )}
      </div>
    );
  }
}

export default Full;
