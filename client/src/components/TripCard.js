import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { tripsAtom } from './atoms'; // Assuming you have an API module for other interactions

function TripCard({ trip, user }) {
  const setTrips = useSetRecoilState(tripsAtom);

  const deleteTrip = async () => {
    try {
      await axios.delete(`/trips/${trip.id}`);
      setTrips((prevTrips) => prevTrips.filter((t) => t.id !== trip.id));
    } catch (error) {
      console.error('Failed to delete trip:', error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      <h2>{trip.name}</h2>
      <h3>Leaving on: {trip.depart_day}</h3>
      <br />
      <br />
      <h4>{trip.start}</h4>
      <p>to</p>
      <h4>{trip.end}</h4>

      <Link to={`/trip/${trip.id}`}>
        <button type='button' class='btn btn-info'>Activity Page</button>
      </Link>
    
      <button type='button' class='btn btn-warning'  onClick={deleteTrip}>Remove Trip</button>
    </div>
  );
}

export default TripCard;