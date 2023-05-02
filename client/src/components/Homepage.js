import react from 'react';
import {useState, useEffect} from 'react';
import TripCard from './TripCard';


function Homepage({ trips }) {
    console.log(trips, "this is a string");
    let tripsVar= []
    if (trips.trips)
    {tripsVar = trips.trips}
    return (
      <div>
        <h1>Trips</h1>
        {tripsVar.map(trip => <h1>Hello World</h1>)}
      </div>
    );
  }
  
  export default Homepage;