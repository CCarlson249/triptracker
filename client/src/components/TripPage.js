import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom';





function TripPage(){
    const { id } = useParams();
    const trip = {}
return (
    <div>
        <h1>{trip.name}</h1>
        </div>
)
}

export default TripPage;