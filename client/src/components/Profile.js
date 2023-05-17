import react from 'react';
import {NavLink, Link} from 'react-router-dom'

function Profile({user}) {
    return(
        <div>
      <h1>Welcome to your profile, {user.username}!</h1>
      <Link to="/edit_profile">
        <button type='button' className='btn btn-light'>Edit Profile</button>
      </Link>
    </div>
        
        )
}

export default Profile;