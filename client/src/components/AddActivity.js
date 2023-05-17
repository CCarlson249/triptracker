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
        <div>
      <label>
        Select Trip:
        <select value={selectedTripId} onChange={event => setSelectedTripId(event.target.value)}>
          <option value="">Select a trip</option>
          {trips.map(trip => (
            <option key={trip.id} value={trip.id}>{trip.name}</option>
          ))}
        </select>
      </label>
      </div>
      <div>
      <label>
        Name:
        <input class="form-control" placeholder='name'type='text' value={name} onChange={event => setName(event.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Address:
        <input class="form-control" placeholder='address'type='text' value={address} onChange={event => setAddress(event.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Date:
        <input type='date' class="form-control" value={date} onChange={event => setDate(event.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Time:
        <input type='time' class="form-control" value={time} onChange={event => setTime(event.target.value)} />
      </label>
      </div>
      <div>
      <label>
        Description:
        <input class="form-control" placeholder='description'type='text' value={description} onChange={event => setDescription(event.target.value)} />
      </label>
      <div>
      <button type="submit" class="btn btn-primary">Submit new Activity</button>
      </div>
      </div>
    </form>
  )
}

export default AddActivity;