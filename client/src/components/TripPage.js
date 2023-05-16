import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import ActivityCard from './ActivityCard';

function TripPage(){
    const [trips, setTrips] = useState([])    
    const [tripEvents, setTripEvents] = useState([])
    let params = useParams();
    
    useEffect(() =>{
        fetch(`/trips/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setTrips(data)
            console.log(data)
        })
    }, [params.id])

    useEffect(() =>{
        fetch('/events')
        .then(res => res.json())
        .then(events => {
            console.log(events)
            const filteredEvents = events.filter(event => event.trip_id === trips.id)
            console.log(filteredEvents)
            setTripEvents(filteredEvents)
        })
    }, [trips.id])

    const removeActivity = (activityId) => {
        // Make a DELETE request to remove the activity from the backend
        fetch(`/events/${activityId}`, {
          method: 'DELETE',
        })
          .then((res) => {
            if (res.ok) {
              // Remove the activity from the tripEvents state
              setTripEvents((prevTripEvents) => prevTripEvents.filter((event) => event.id !== activityId));
            } else {
              throw new Error('Failed to delete activity');
            }
          })
          .catch((error) => {
            console.error('Error deleting activity:', error);
            // Handle error if necessary
          });
      };


    return (
        <div>
            <div>
                <h1>{trips.name}</h1>
                <h3>Traveling from {trips.start} to {trips.end}</h3>
                <h4>Flight Number: {trips.flight_number}</h4>
                <h4>Departing on {trips.depart_day} at {trips.depart_time}</h4>
                <h4>Arriving on {trips.arrive_day} at {trips.arrive_time}</h4>
            </div>
            <div>
                {tripEvents.map(tripEvent => <ActivityCard removeActivity={removeActivity} tripEvent={tripEvent}/>)}
            </div>
        </div>
    )
}

export default TripPage;