import React, { useState } from 'react';
import Popup from 'reactjs-popup';

function EditProfile({ user, handleLogout }) {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function handleChangePassword(e) {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirmation') {
      setPasswordConfirmation(value);
    }
  }

  function handleSubmitPassword(e) {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      alert('Passwords must match!');
    } else {
      const updateProfile = {
        password_hash: password,
      };
      fetch(`/users/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProfile),
      });
    }
  }
  function handleDelete() {

    fetch(`/users/delete/${user.id}`, {
        method:'DELETE',
    })
    .then(handleLogout)
    alert("Profile Deleted Sucessfully")
}

  return (
    <><div>
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmitPassword}>
              <div>
                  <label htmlFor="password">New Password:</label>
                  <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChangePassword} />
              </div>
              <div>
                  <label htmlFor="passwordConfirmation">Confirm Password:</label>
                  <input
                      type="password"
                      name="passwordConfirmation"
                      value={passwordConfirmation}
                      onChange={handleChangePassword} />
              </div>
              <div>
                  <button type="submit">Save Password</button>
              </div>
          </form>
      </div>
        <div>
        <button onClick={handleDelete} >Delete Profile</button>
    </div></>
  );
}
   

export default EditProfile;