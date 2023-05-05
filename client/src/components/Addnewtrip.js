import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
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
    setTrips([...trips, response.data]); // Update the local state with the new trip
  })
  .catch(error => {
    console.log(error);
  });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Airport:
        <input type='test' value={startAirport} onChange={event => setStartAirport(event.target.value)} />
      </label>
      
        
        <label>
        End Airport:
        <input type="text" value={endAirport} onChange={event => setEndAirport(event.target.value)} />
      </label>
      
      <label>
        Trip Name:
        <input type="text" value={tripName} onChange={event => setTripName(event.target.value)} />
      </label>
      <label>
        Departure Date:
        <input type="date" value={departDate} onChange={event => setDepartDate(event.target.value)} />
      </label>
      <label>
        Departure Time:
        <input type="time" value={departTime} onChange={event => setDepartTime(event.target.value)} />
            </label>
            <label>
        Arrival Date:
        <input type="date" value={arriveDate} onChange={event => setArriveDate(event.target.value)} />
      </label>
      <label>
        Arrival Time:
        <input type="time" value={arriveTime} onChange={event => setArriveTime(event.target.value)} />
            </label>
        <label>
            Flight Number:
            <input type='text' value={flightNumber} onChange={event => setFlightNumber(event.target.value)} />
        </label>
        <button onClick={handleSubmit}>Submit new trip</button>
            </form>
)}
export default Addnewtrip;