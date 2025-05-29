import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import moment from 'moment';

<FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
    }}
    events={events.map((event) => ({
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: event.is_canceled ? '#f87171' : '#60a5fa',
        borderColor: '#e5e7eb',
    }))}
    selectable={true}
    dateClick={(info) => handleDateClick(info.date)}
    eventClick={(info) => handleSelectEvent({ id: info.event.id })}
/>
