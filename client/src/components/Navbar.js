import react from 'react';
import {NavLink} from 'react-router-dom';

function Navbar({handleLogout}) {
    return (
        <div className='navbar navbar-expand header-padding'>
            <div className="container">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink exact to='/' className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item"> 
                        <NavLink to='/Addnewtrip' className="nav-link">New Trip</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/Calendar' className="nav-link">Calendar view</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/profile' className="nav-link">Profile</NavLink>
                    </li>
                </ul>
                <div>
                <button className="nav-link button-link" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    )
}



export default Navbar;