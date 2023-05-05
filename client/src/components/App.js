import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from './Header';
import Login from './Login';
import Navbar from "./Navbar";
import Profile from "./Profile";
import Homepage from "./Homepage";
import Addnewtrip from './Addnewtrip';
import Calendar from './Calendar';
import EditProfile from "./EditProfile";
import TripPage from "./TripPage";
import { tripsAtom } from "./atoms";
import {useRecoilState} from 'recoil';

function App() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useRecoilState(tripsAtom)


  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
  }, []);

  useEffect(() => {
    fetch('/trips')
      .then(res => res.json())
      .then(data => {
        console.log('data:', data);
        setTrips(data); // set the data directly to the trips state
      })
      .catch(error => console.error(error));
  }, []);

  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"})
      .then((r) => {
        if (r.ok) {
          setUser(null)
        }
      })
  }
  
  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className = ''>
      <div className='App'>
        <Header className='Header'/>
        <Navbar handleLogout={handleLogout} />

        <div className='main'>
          <Switch>
            <Route exact path='/'>
              <div className='row'>
                <Homepage  user={user}/>
              </div>
            </Route>
            <Route exact path='/trip/:id'>
            <div className='row'>
              <TripPage />
            </div>
            </Route>
            <Route path= '/Addnewtrip'>
              <div>
                <Addnewtrip  user={user}/>
              </div>
            </Route>
            <Route path='/Calendar'>
              <div>
                <Calendar />
              </div>
            </Route>
            <Route path='/profile'>
              <div>
              <Profile user = {user} handleLogout={handleLogout}/>
              </div>
            </Route>
            <Route path ="/edit_profile">
              <div>
              <EditProfile user={user} handleLogout={handleLogout} />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App;
