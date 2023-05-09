import React, { useState, useEffect } from 'react';

function AddActivity({ user }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [trips, setTrips] = useState([]);
  const [selectedTripId, setSelectedTripId] = useState('');

  useEffect(() => {
    // Fetch the list of trips from your API
    fetch('/trips')
      .then(response => response.json())
      .then(trips => {
        // Filter the trips to only include those with the current user ID
        const filteredTrips = trips.filter(trip => trip.user_id === user.id);
        // Update the state with the filtered trips
        setTrips(filteredTrips);
        // Select the first trip by default, if there are any trips
        if (filteredTrips.length > 0) {
          setSelectedTripId(filteredTrips[0].id);
        }
      });
  }, [user.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newActivity = {
      name: name,
      address: address,
      date: date,
      time: time,
      description: description,
      trip_id: selectedTripId,
      user_id: user.id
    };
    // Save the new activity to your database using your API or database
    fetch('/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
    } )
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Trip:
        <select value={selectedTripId} onChange={event => setSelectedTripId(event.target.value)}>
          <option value="">Select a trip</option>
          {trips.map(trip => (
            <option key={trip.id} value={trip.id}>{trip.name}</option>
          ))}
        </select>
      </label>
      <label>
        Name:
        <input type='text' value={name} onChange={event => setName(event.target.value)} />
      </label>
      <label>
        Address:
        <input type='text' value={address} onChange={event => setAddress(event.target.value)} />
      </label>
      <label>
        Date:
        <input type='date' value={date} onChange={event => setDate(event.target.value)} />
      </label>
      <label>
        Time:
        <input type='time' value={time} onChange={event => setTime(event.target.value)} />
      </label>
      <label>
        Description:
        <input type='text' value={description} onChange={event => setDescription(event.target.value)} />
      </label>
      <button type="submit">Submit new Activity</button>
    </form>
  )
}

export default AddActivity;