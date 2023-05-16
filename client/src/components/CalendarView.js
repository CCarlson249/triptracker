import React from 'react';
import ReactCalendar from 'react-calendar';
import { tripsAtom } from "./atoms";
import {useRecoilState} from 'recoil';
import {useState, useEffect} from 'react';

function CalendarView({user}) {
  const [trips, setTrips] = useRecoilState(tripsAtom);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/trips')
      .then(res => res.json())
      .then(data => {
        console.log('data:', data);
        setTrips(data); // set the data directly to the trips state
      })
      .catch(error => console.error(error));
  }, []);

  const userTrips = trips.filter(trip => trip.user_id === user.id);

  useEffect(() => {
    fetch('/events')
      .then(res => res.json())
      .then(data => {
        console.log('data:', data);
        setEvents(data); // set the data directly to the trips state
      })
      .catch(error => console.error(error));
  }, []);

  const userEvents = events.filter(event => event.user_id === user.id);

  // Function to create an array of custom events for the calendar
  const createCalendarEvents = (trips, events) => {
    const tripEvents = trips.map(trip => ({
      name: trip.name,
      date: new Date(trip.depart_day),
      time: trip.depart_time
    }));

    const eventObjects = events.map(event => ({
      name: event.name,
      date: new Date(event.date),
      time: event.time
    }));

    return [...tripEvents, ...eventObjects];
  };

  const calendarEvents = createCalendarEvents(userTrips, userEvents);

  // Function to render custom tile content for the calendar
  const renderTileContent = ({ date, view }) => {
    if (view !== 'month') return null;

    const eventsOnDate = calendarEvents.filter(
      event => event.date.toDateString() === date.toDateString()
    );

    return (
      <div>
        {eventsOnDate.map((event, index) => (
          <div key={index}>
            {event.name} {event.time}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <ReactCalendar tileContent={renderTileContent} />
    </div>
  );
}

export default CalendarView;