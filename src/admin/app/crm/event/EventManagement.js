import React, { useState } from "react";
import moment from "moment";
import EventScheduler from "./EventScheduler"; // Your calendar component

/**
 * Displays the list of events for the selected date.
 */
const SelectedDateEvents = ({ selectedEvents }) => {
    return (
        <section
            aria-label="Events on selected date"
            className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Events on Selected Date
            </h3>

            {selectedEvents.length > 0 ? (
                <ul className="space-y-6">
                    {selectedEvents.map((event) => (
                        <li
                            key={event.id}
                            className="bg-gray-50 dark:bg-gray-700 p-5 rounded-lg shadow-sm"
                            tabIndex={0}
                            aria-label={`Event: ${event.title} at ${moment(event.start).format("LLLL")}`}
                        >
                            <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-1">
                                {event.title}
                            </h4>
                            <time
                                dateTime={moment(event.start).toISOString()}
                                className="block text-sm text-gray-600 dark:text-gray-300 mb-2"
                            >
                                {moment(event.start).format("dddd, MMMM Do YYYY, h:mm A")}
                            </time>
                            <p className="text-gray-700 dark:text-gray-200">{event.description || "No description."}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 dark:text-gray-400">No events for this date.</p>
            )}
        </section>
    );
};

/**
 * Main wrapper component combining calendar and selected date events list.
 */
const EventManagement = ({ events }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Filter events by selectedDate (ignore time part)
    const selectedEvents = selectedDate
        ? events.filter(
            (event) =>
                moment(event.start).isSame(selectedDate, "day") ||
                moment(event.end).isSame(selectedDate, "day")
        )
        : [];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <EventScheduler events={events} onDateSelect={setSelectedDate} />

            <SelectedDateEvents selectedEvents={selectedEvents} />
        </div>
    );
};

export default EventManagement;
