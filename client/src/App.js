import { useState, useEffect } from "react";
import Login from "./Components/Login/Login.js";
import QuoteContainer from "./Components/QuoteContainer.js";

function App() {
  const [user, setUser] = useState(null);
  const [quotes, setQuotes] = useState([])

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch('/quotes')
    .then(r => r.json())
    .then(data => setQuotes(data))
  }, [])

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  console.log(quotes)
  
  if (!user) return <Login onLogin={setUser}/>

  return (
    <div className="App">
      <div className="container rounded p-3 my-2 border bg-light text-center">
        <h1 className='display-1'>QUOTORDLE</h1>
      </div>
      <h4>{user.username}<button onClick={handleLogoutClick}>Logout</button></h4>
      <QuoteContainer quotes={quotes} user={user} />
    </div>
  );
}

export default App;