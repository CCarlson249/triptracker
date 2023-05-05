import react from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom'

function TripCard({trip, user}){
    return (
        <div>
            <h2>{trip.name}</h2>
            <h3>Leaving on: {trip.depart_day}</h3>
            <br></br>
            <br></br>
            <h4>{trip.start}</h4>
            <p>to</p>
            <h4>{trip.end}</h4>
            
            <Link to={`/trip/${trip.id}`}>
        <button>Activity Page</button>
      </Link>


        </div>
        
    )
}

export default TripCard;