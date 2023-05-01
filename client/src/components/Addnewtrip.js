import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Addnewtrip({user}) {
  const [startAirport, setStartAirport] = useState('');
  const [endAirport, setEndAirport] = useState('');
  const [startAirportId, setStartAirportId] = useState(null);
  const [endAirportId, setEndAirportId] = useState(null);
  const [tripName, setTripName] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [arriveDate, setArriveDate] = useState('');
  const [arriveTime, setArriveTime] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [airports, setAirports] = useState([]);

  // Fetch the list of airports from the backend on component mount
  useEffect(() => {
    axios.get('/locations')
      .then(response => {
        setAirports(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Validate the start airport against the list of airports
  useEffect(() => {
    const airport = airports.find(a => a.airports === startAirport);
    if (airport) {
      setStartAirportId(airport.id);
    } else {
      setStartAirportId(null);
    }
  }, [startAirport, airports]);

  // Validate the end airport against the list of airports
  useEffect(() => {
    const airport = airports.find(a => a.airports === endAirport);
    if (airport) {
      setEndAirportId(airport.id);
    } else {
      setEndAirportId(null);
    }
  }, [endAirport, airports]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a new trip object with the validated airport ids
    const newTrip = {
      name: tripName,
      start: startAirportId,
      end: endAirportId,
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
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Airport:
        <select value={startAirport} onChange={event => setStartAirport(event.target.value)}>
          <option value="">Select an airport</option>
          {airports.map(airport => (
            <option key={airport.id} value={airport.airports}>{airport.airports}</option>
          ))}
        </select>
      </label>
      <label>
        End Airport:
        <select value={endAirport} onChange={event => setEndAirport(event.target.value)}>
          <option value="">Select an airport</option>
          {airports.map(airport => (
            <option key={airport.id} value={airport.airports}>{airport.airports}</option>
          ))}
        </select>
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