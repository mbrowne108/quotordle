import React, { useState } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("mbrowne");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark text-light">
      <div className='mb-3'>
        <h4>Login</h4>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          className='form-control bg-light'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='mb-3'>
        <button variant="fill" color="primary" type="submit" className='btn btn-success'>
          {isLoading ? "Loading..." : "Login"}
        </button>
      </div>
      <div className="bg-dark">
        {errors ? errors.map((err) => (
          <p className='alert alert-danger alert-dismissible fade show mb-3' key={err}>
            {err} 
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
          </p>
        )) : null}
      </div>
    </form>
  );
}

export default LoginForm;
