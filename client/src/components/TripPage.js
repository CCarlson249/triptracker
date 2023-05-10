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

    return (
        <div>
            <div>
                <h1>{trips.name}</h1>
            </div>
            <div>
                {tripEvents.map(tripEvent => <ActivityCard tripEvent={tripEvent}/>)}
            </div>
        </div>
    )
}

export default TripPage;