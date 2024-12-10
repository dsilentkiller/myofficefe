import React, { useState } from "react";
import EventForm from "./EventForm";

const ParentComponent = () => {
  const [eventData, setEventData] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Define the createEvent function
  const createEvent = async (event) => {
    try {
      console.log("Saving event:", event); // Debugging purpose
      // Simulate an API call to save the event
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Event saved successfully!");
    } catch (error) {
      console.error("Error while saving event:", error.message || error);
      throw error;
    }
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <button onClick={handleOpenModal}>Create Event</button>
      <EventForm
        show={showModal}
        handleClose={handleCloseModal}
        eventData={eventData}
        setEventData={setEventData}
        createEvent={createEvent} // Pass the function here
      />
    </>
  );
};

export default ParentComponent;
