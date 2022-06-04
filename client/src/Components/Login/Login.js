import { useState } from "react";
import LoginForm from "./LoginForm.js";
import SignUpForm from "./SignUpForm.js";

function Login({ onLogin }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="bg-dark bg-gradient">
      <div className="container rounded p-3 my-2 border bg-dark text-light text-center">
        <h1 className='display-1'>QUOTORDLE</h1>
        <p className="display-6 fst-italic fst-light"><small>Guess the movie based on a famous quote!</small></p>
      </div>
      <div className="container card text-center col-sm-4 bg-dark text-light">
        {showLogin ? (
            <>
                <LoginForm onLogin={onLogin} />
                <p>
                    Don't have an account? &nbsp;
                    <button className="btn btn-secondary" onClick={() => setShowLogin(false)}>
                    Sign Up
                    </button>
                </p>
            </>
        ) : (
            <>
            <SignUpForm onLogin={onLogin} />
            <p>
                Already have an account? &nbsp;
                <button className="btn btn-secondary" onClick={() => setShowLogin(true)}>
                Log In
                </button>
            </p>
            </>
        )}
      </div>
    </div>
  );
}

export default Login;
