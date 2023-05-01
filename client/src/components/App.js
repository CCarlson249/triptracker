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

function App() {
  const [user, setUser] = useState(null);


  useEffect(() => {
    fetch("/check_session")
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
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
                <Homepage />
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
