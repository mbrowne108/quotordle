import { useState, useEffect } from "react";
import { OverlayTrigger, Popover } from 'react-bootstrap';

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

  const popover = (
    <Popover id="popover">
      <Popover.Body>
        Answers are not case sentitive, but you MUST have correct spelling and punctuation (down to the proper use of colons or the use of II instead of 2, for example)
      </Popover.Body>
    </Popover>
  )

  return (
    <div className="card">
      <p className="card-header h5"><i>"{quote.quote}"</i></p>
      <table className="p-2">
        <td className="h6 list-group-item">{hintCount >= 1 ? `Year: ${quote.year}` : ' '}</td>
        <td className="h6 list-group-item">{hintCount >= 2 ? `Character: ${quote.character}` : ' '}</td>
        <td className="h6 list-group-item">{hintCount >= 3 ? `Actor: ${quote.actor}` : ' '}</td>
        <button className="btn btn-outline-success col-4" onClick={hintClick}>Hint</button>
      </table>
      <form className="row mt-4" onSubmit={formSubmit}>
        <div className="col-4">
          <input type="text" name="movie" value={movieGuess} onChange={handleChange} className="col-12"></input>
        </div>
        <div className="col-2">
          <button className="btn btn-sm btn-success" type="submit">Guess</button>
          <OverlayTrigger trigger="hover" overlay={popover}>
            <h6 className="badge bg-light">❓</h6>
          </OverlayTrigger>
        </div>
        {afterGuess ? 
          <div className={movieGuess.toLowerCase() === quote.movie.toLowerCase() ? 'alert alert-success' : 'alert alert-danger'}>
            <p>{movieGuess.toLowerCase() === quote.movie.toLowerCase() ? `${quote.movie} is correct!` : `Incorrect. The correct answer was ${quote.movie}.`}</p>
            <button className="btn btn-success" onClick={nextQuestion}>Play again!</button>
          </div> : null 
        }
      </form>
    </div>
  );
}

export default QuoteContainer;