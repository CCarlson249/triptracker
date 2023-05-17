import { useState, useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import axios from 'axios';
import { tripsAtom } from './atoms';

function Addnewtrip({ user }) {
  const [startAirport, setStartAirport] = useState('');
  const [endAirport, setEndAirport] = useState('');
  const [tripName, setTripName] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [arriveDate, setArriveDate] = useState('');
  const [arriveTime, setArriveTime] = useState('');
  const [flightNumber, setFlightNumber] = useState('');

  const [trips, setTrips] = useRecoilState(tripsAtom);

  const refresh = useRecoilRefresher_UNSTABLE(trips);

console.log(trips);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new trip object with the validated airport ids
    const newTrip = {
      name: tripName,
      start: startAirport,
      end: endAirport,
      depart_day: departDate,
      depart_time: departTime,
      arrive_day: arriveDate,
      arrive_time: arriveTime,
      user_id: user.id,
      flight_number: flightNumber
    };

    // Patch the new trip object to the backend
  axios.post('/trips', newTrip)
  .then(response => {
    console.log(response.data);
    
    setTrips([...trips, response.data]);
    
    
  })
  .catch(error => {
    console.log(error);
  });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class='form row'>
        <div class='"form-group col-md-6"'>
      <label>
        Start Airport:
        <input placeholder='departing ariport' type='test'  class="form-control" value={startAirport} onChange={event => setStartAirport(event.target.value)} />
      </label>
      </div>
        <div class="form-group col-md-6">
        <label>
        End Airport:
        <input placeholder='arriving airport'type="text" class="form-control" value={endAirport} onChange={event => setEndAirport(event.target.value)} />
      </label>
      </div>
      </div>
      <div class='form-group'>
      <label>
        Trip Name:
        <input placeholder='Name'type="text"class="form-control" value={tripName} onChange={event => setTripName(event.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Departure Date:
        <input type="date" class="form-control" value={departDate} onChange={event => setDepartDate(event.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Departure Time:
        <input type="time" class="form-control" value={departTime} onChange={event => setDepartTime(event.target.value)} />
            </label>
            </div>
            <div>
            <label>
        Arrival Date:
        <input type="date" class="form-control" value={arriveDate} onChange={event => setArriveDate(event.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Arrival Time:
        <input type="time" class="form-control" value={arriveTime} onChange={event => setArriveTime(event.target.value)} />
            </label>
            </div>
            <div>
        <label>
            Flight Number:
            <input placeholder='flight number here' type='text' class="form-control" value={flightNumber} onChange={event => setFlightNumber(event.target.value)} />
        </label>
        </div>
        <div>
        <button type='submit' class='btn btn-primary' onClick={handleSubmit}>Submit new trip</button>
        </div>
        
            </form>
)}
export default Addnewtrip;