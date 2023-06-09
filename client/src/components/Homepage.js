import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TripCard from './TripCard';
import { tripsAtom } from './atoms';
import axios from 'axios';

function Homepage({ user }) {
  const setTrips = useSetRecoilState(tripsAtom);
  const trips = useRecoilValue(tripsAtom);
 
  useEffect(() => {
    // Fetch new data from /trips endpoint and update the tripsAtom state
    axios.get('/trips')
      .then(response => {
        setTrips(response.data);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
      });
  }, [setTrips]);

  const userTrips = trips.filter(trip => trip.user_id === user.id);

  return (
    <div>
      <h1>Welcome {user.username}!</h1>
      <br></br>
      <br></br>
      <h2>Your Trips</h2>
      <br></br>
      <div className='tripdisplay'>
      {userTrips.map(trip => (
        <TripCard key={trip.id} trip={trip} />
      ))}
      </div>
    </div>
  );
}

export default Homepage;