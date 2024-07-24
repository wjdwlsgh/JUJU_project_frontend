import React, { Component, createRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "./full.css";
import Modal from "./modal";
import Modal2 from "./modal2";
import Clock from "../../Todo/Clock";

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
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    if (this.calendarRef.current) {
      this.calendarRef.current.getApi().updateSize();
    }
  };

  handleDateClick = (arg) => {
    const { lastClickedDate, clickTimeout, isDoubleClick } = this.state;

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
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    this.setState({
      isModal2Open: true,
      editingEventId: arg.event.id,
      newEvent: {
        title: arg.event.title,
        start: arg.event.startStr || currentDateTime,
        end: arg.event.endStr || currentDateTime,
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

    this.setState({
      events: [
        ...this.state.events,
        {
          id: new Date().getTime().toString(),
          ...this.state.newEvent,
          extendedProps: {
            color: this.state.newEvent.color,
          },
        },
      ],
      isModalOpen: false,
      newEvent: { title: "", start: "", end: "", color: "" },
    });
  };
  handleSaveEvent2 = () => {
    const { editingEventId, newEvent, events } = this.state;

    if (newEvent.title.trim() === "") {
      alert("제목을 입력해 주세요.");
      return;
    }

    this.setState({
      events: events.map((event) =>
        event.id === editingEventId
          ? {
              ...event,
              title: newEvent.title,
              start: newEvent.start,
              end: newEvent.end,
              backgroundColor: newEvent.color,
            }
          : event
      ),
      isModal2Open: false,
      newEvent: { title: "", start: "", end: "", color: "" },
      editingEventId: null,
    });
  };

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
        <div className="fullClock">
          <Clock />
        </div>
        <div className="custom-calendar-container">
          <FullCalendar
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
            events={this.state.events.map((event) => ({
              ...event,
              backgroundColor: event.extendedProps.color || "blue",
              title: event.title,
            }))}
            dateClick={this.handleDateClick}
            eventClick={this.handleEventClick}
            selectable={true}
            handleWindowResize={true}
            className="custom-calendar"
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
            handleChange={this.handleInputChange}
            colorMap={this.state.colorMap}
          />
        )}
      </div>
    );
  }
}

export default Full;
