import { useState, useEffect } from "react";
import Login from "./Components/Login/Login.js";
import QuoteContainer from "./Components/QuoteContainer.js";
import Leaderboard from "./Components/Leaderboard.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  function onUpdateUser(updatedUser) {
    setUser(updatedUser)
  }
  
  if (!user) return <Login onLogin={setUser}/>

  return (
    <div className="row">
      <div className="container rounded p-3 my-2 border bg-light text-center">
        <h1 className='display-1'>QUOTORDLE</h1>
      </div>
      <div className="p text-center">Logged in as: <strong>{user.username}</strong> <button className="btn btn-sm btn-success" onClick={handleLogoutClick}>Logout</button></div>
      <div className="col-8">
        <QuoteContainer user={user} onUpdateUser={onUpdateUser} />
      </div>
      <div className="col-4">
        <Leaderboard user={user} />
      </div>
    </div>
  );
}

export default App;