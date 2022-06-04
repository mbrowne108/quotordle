import { useState, useEffect } from "react";

function QuoteContainer({ user, onUpdateUser }) {
  const [hintCount, setHintCount] = useState(0);
  const [movieGuess, setMovieGuess] = useState('')
  const [afterGuess, setAfterGuess] = useState(false)
  const [newQuote, setNewQuote] = useState(false)
  const [quote, setQuote] = useState([])

  useEffect(() => {
    fetch('/quotes')
    .then(r => r.json())
    .then(data => setQuote(data))
  }, [newQuote])

  function handleChange(e) {
    setMovieGuess(e.target.value)
  }

  function formSubmit(e) {
    e.preventDefault()
    setAfterGuess(true)
    if (movieGuess.toLowerCase() === quote.movie.toLowerCase()) {
      fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          score: user.score += 1,
          weighted_score: user.weighted_score += (1 - hintCount/4)
        }),
      })
        .then(r => r.json())
        .then((updatedUser) => onUpdateUser(updatedUser))
    }
  }

  function nextQuestion(e) {
    setAfterGuess(false)
    setHintCount(0)
    setMovieGuess('')
    setNewQuote(!newQuote)
  }

  function hintClick(e) {
    hintCount === 3 ? setHintCount(3) : setHintCount(() => hintCount + 1)
  }

  return (
    <div className="card">
      <p className="card-header h5"><i>"{quote.quote}"</i></p>
      <div className="card-body">
        <p className="h6">{hintCount >= 1 ? `Year: ${quote.year}` : null}</p>
        <p className="h6">{hintCount >= 2 ? `Character: ${quote.character}` : null}</p>
        <p className="h6">{hintCount >= 3 ? `Actor: ${quote.actor}` : null}</p>
        <button className="btn btn-outline-success" onClick={hintClick}>Hint</button>
      </div>
      <form className="row" onSubmit={formSubmit}>
        <div className="col-2">
          <input type="text" name="movie" value={movieGuess} onChange={handleChange}></input>
        </div>
        <div className="col-1">
          <button className="btn btn-sm btn-success" type="submit">Guess</button>
        </div>
        {afterGuess ? 
          <div className="card-footer">
            <p>{movieGuess.toLowerCase() === quote.movie.toLowerCase() ? `${quote.movie} is correct!` : `Incorrect. The correct answer was ${quote.movie}.`}</p>
            <button className="btn btn-success" onClick={nextQuestion}>Play again!</button>
          </div> : null 
        }
      </form>
    </div>
  );
}

export default QuoteContainer;