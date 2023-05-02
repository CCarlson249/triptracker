import react from 'react';
import {useState} from 'react';

function TripCard({trip, user}){
    return (
        <div>{trip.name}</div>
    )
}

export default TripCard;