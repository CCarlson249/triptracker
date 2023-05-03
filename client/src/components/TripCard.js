import react from 'react';
import {useState} from 'react';

function TripCard({trip, user}){
    return (
        <div>
            <h2>{trip.name}</h2>
            <h3>{trip.departure_date}</h3>
            <h4>{trip.start}</h4>
            <p>to</p>
            <h4>{trip.end}</h4>
            <button>Activity Page</button>


        </div>
        
    )
}

export default TripCard;