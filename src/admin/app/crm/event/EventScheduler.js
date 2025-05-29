// components/EventManagement.js
import React, { useState } from "react";
import moment from "moment";
import EventScheduler from "./EventScheduler";

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
                            <p className="text-gray-700 dark:text-gray-200">
                                {event.description || "No description."}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600 dark:text-gray-400">
                    No events for this date.
                </p>
            )}
        </section>
    );
};

const EventManagement = ({ events }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const selectedEvents = selectedDate
        ? events.filter((event) =>
            moment(event.start).isSame(selectedDate, "day")
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

// import moment from "moment";

// const EventScheduler = ({ events }) => {
//     const groupedEvents = events.reduce((acc, event) => {
//         const dateKey = moment(event.start).format("YYYY-MM-DD");
//         if (!acc[dateKey]) acc[dateKey] = [];
//         acc[dateKey].push(event);
//         return acc;
//     }, {});

//     return (
//         <div className="bg-white rounded-xl shadow p-6 mt-6">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Scheduler View</h2>
//             {Object.entries(groupedEvents).map(([date, dayEvents]) => (
//                 <div key={date} className="mb-6">
//                     <h3 className="text-lg font-semibold text-indigo-600 mb-2">
//                         {moment(date).format("dddd, MMMM Do YYYY")}
//                     </h3>
//                     <ul className="space-y-2">
//                         {dayEvents.map((event) => (
//                             <li
//                                 key={event.id}
//                                 className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded"
//                             >
//                                 <div className="font-semibold">{event.title}</div>
//                                 <div className="text-sm text-gray-600">
//                                     {moment(event.start).format("HH:mm")} -{" "}
//                                     {moment(event.end).format("HH:mm")}
//                                 </div>
//                                 <div className="text-sm text-gray-700">{event.description}</div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default EventScheduler;
