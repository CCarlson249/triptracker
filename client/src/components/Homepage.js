
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import TripCard from './TripCard';
import { tripsAtom } from './atoms';
import {useState} from 'react';



function Homepage({user}) {


  const trips = useRecoilValue(tripsAtom);
 
console.log(trips);
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