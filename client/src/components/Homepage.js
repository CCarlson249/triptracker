
import React from 'react';
import { useRecoilValue } from 'recoil';
import TripCard from './TripCard';
import { tripsAtom } from './atoms';




function Homepage({user}) {


  const trips = useRecoilValue(tripsAtom);
  

  const userTrips = trips.filter(trip => trip.user_id === user.id);

  return (
    <div>
      <h1>Trips</h1>
      {userTrips.map(trip => (
        <TripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
      }

export default Homepage;