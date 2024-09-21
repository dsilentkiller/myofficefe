import React from "react";
import { useLocation } from "react-router-dom"; // useLocation to get event data passed through link

const EventDetail = () => {
  const location = useLocation();
  const { event } = location.state || {};

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Event Details</h1>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="card card-primary">
            <div className="card-body">
              <h3>Title: {event.title}</h3>
              <p>
                <strong>Start:</strong> {new Date(event.start).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(event.end).toLocaleString()}
              </p>
              <p>
                <strong>Attendees:</strong> {event.attendees.join(", ")}
              </p>
              <p>
                <strong>Email:</strong> {event.email}
              </p>
              <p>
                <strong>Notes:</strong> {event.notes}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventDetail;
