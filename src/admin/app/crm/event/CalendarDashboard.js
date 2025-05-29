// CalendarDashboard.jsx
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventScheduler from "./EventScheduler";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarDashboard = ({
  events,
  selectedEvents,
  handleSelectEvent,
  handleShow,
  handleDateClick,
  eventData,
  setEventData,
  handleSaveEvent,
  showModal,
  handleClose,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      {/* <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Event Management Dashboard</h1>
        {/* <button
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={toggleDarkMode}
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button> 
    </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Calendar View</h2>
          <Calendar
            localizer={localizer}
            events={events.map((event) => ({
              ...event,
              start: new Date(event.start),
              end: new Date(event.end),
              id: event.id,
            }))}
            startAccessor="start"
            endAccessor="end"
            selectable
            views={["month", "week", "day"]}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleShow}
            onNavigate={handleDateClick}
            style={{ height: 500 }}
          />
        </div>


      </div>


    </div >
  );
};

export default CalendarDashboard;
