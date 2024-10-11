import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEvents,
  createEvent,
  updateEvent,
} from "../../redux/slice/crm/eventSlice";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import EventForm from "./EventForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const EventSystem = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events?.events || []);
  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({
    title: "",
    start: null,
    end: null,
    email: "",
    notes: "",
  });

  // Fetch events when the component mounts
  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  // Handle showing the modal for new event creation
  const handleShow = ({ start, end }) => {
    setEventData({ title: "", start, end, email: "", notes: "" }); // Reset form for new event
    setShowModal(true);
  };

  // Handle closing the modal
  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  // Handle saving or updating event
  const handleSaveEvent = async () => {
    const { title, start, end } = eventData;

    // Check if the event title already exists in the list of events
    const isDuplicateTitle = events.some((event) => event.title === title);

    if (!title || !start || !end) {
      toast.error("Event title, start, and end time are required!");
      return;
    }

    if (isDuplicateTitle) {
      toast.error("Event name already exists!");
      return;
    }

    try {
      if (eventData.id) {
        // If editing an existing event
        await dispatch(updateEvent({ id: eventData.id, eventData })).unwrap();
        toast.success("Event updated successfully!");
      } else {
        // If creating a new event
        await dispatch(createEvent(eventData)).unwrap();
        toast.success("Event created successfully!");
      }
      handleClose();
    } catch (error) {
      console.error("Error saving event: ", error);
      toast.error("Failed to save event!");
    }
  };

  // Handle selecting an event from the calendar (for editing)
  const handleSelectEvent = (event) => {
    setEventData(event); // Pre-fill the form with event details
    setShowModal(true);
  };

  // Reset the form after close
  const resetForm = () => {
    setEventData({
      title: "",
      start: null,
      end: null,
      email: "",
      notes: "",
    });
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        selectable
        onSelectEvent={handleSelectEvent} // For editing event
        onSelectSlot={handleShow} // For creating new event
      />

      {/* Reusable EventForm Component */}
      <EventForm
        eventData={eventData}
        setEventData={setEventData}
        handleSaveEvent={handleSaveEvent}
        show={showModal}
        handleClose={handleClose}
      />

      <ToastContainer />
    </div>
  );
};

export default EventSystem;
