import { useState, useEffect } from "react";

function QuoteContainer({ user, onUpdateUser }) {
  const [hintCount, setHintCount] = useState(0);
  const [movieGuess, setMovieGuess] = useState('')
  const [afterGuess, setAfterGuess] = useState(false)
  const [correctAnswer, setCorrectAnswer] = useState(false)
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
    const answers = quote.title.map((t) => t.toLowerCase())
    setAfterGuess(true)
    if (answers.includes(movieGuess.toLowerCase())) {
      setCorrectAnswer(true)
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
    setCorrectAnswer(false)
    setHintCount(0)
    setMovieGuess('')
    setNewQuote(!newQuote)
  }

  function hintClick(e) {
    hintCount === 3 ? setHintCount(3) : setHintCount(() => hintCount + 1)
  }
  
  return (
    <div className="card bg-dark ps-4 mb-4">
      <p className="card-header h5"><i>"{quote.quote}"</i></p>
      <table className="p-2 bg-dark">
        <tbody>
          <tr className="h6 list-group-item bg-dark text-light border col-6">{hintCount >= 1 ? `Year: ${quote.year}` : null}</tr>
          <tr className="h6 list-group-item bg-dark text-light border col-6">{hintCount >= 2 ? `Character: ${quote.character}` : null}</tr>
          <tr className="h6 list-group-item bg-dark text-light border col-6">{hintCount >= 3 ? `Actor: ${quote.actor}` : null}</tr>
          <button className="btn btn-sm btn-success col-2" onClick={hintClick}>Hint</button>
        </tbody>
      </table>
      <form className="row mt-4" onSubmit={formSubmit}>
        <div className="col-4">
          <input type="text" name="movie" value={movieGuess} onChange={handleChange} className="col-12"></input>
        </div>
        <div className="col-2">
          <button className="btn btn-sm btn-success" type="submit">Guess</button>
        </div>
      </form>
      <div className="col-5 mt-2">
        {afterGuess ? 
          <div className={correctAnswer ? 'alert alert-success' : 'alert alert-danger'}>
            <p>{correctAnswer ? `${quote.title[0]} is correct!` : `Incorrect. The correct answer was ${quote.title[0]}.`}</p>
            <button className="btn btn-success" onClick={nextQuestion}>Play again!</button>
          </div> : null 
        }
      </div>
    </div>
  );
}

export default QuoteContainer;