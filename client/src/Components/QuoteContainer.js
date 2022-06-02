import { useState } from "react";

function QuoteContainer({ quotes, user }) {
  const [hintCount, setHintCount] = useState(0);
  const [movieGuess, setMovieGuess] = useState('')
  const quote = quotes[Math.floor(Math.random() * (quotes.length + 1))]

  function handleChange(e) {
    setMovieGuess(e.target.value)
  }

  function formSubmit(e) {
    e.preventDefault()
    if (movieGuess.toLowerCase() === quote.movie.toLowerCase()) {
      console.log("Correct!")
    } else {
      console.log(`Incorrect. The correct answer was ${quote.movie}`)
    }
  }

  function hintClick(e) {
    hintCount === 3 ? setHintCount(3) : setHintCount(() => hintCount + 1)
  }

  return (
    <div className="card">
      <h3>{quote.quote}</h3>
      <h3>{hintCount >= 1 ? quote.year : null}</h3>
      <h3>{hintCount >= 2 ? quote.character : null}</h3>
      <h3>{hintCount >= 3 ? quote.actor : null}</h3>
      <button onClick={hintClick}>Hint</button>
      <form onSubmit={formSubmit}>
        <div>
          <input type="text" name="movie" value={movieGuess} onChange={handleChange}></input>
        </div>
        <div>
          <button type="submit">Guess</button>
        </div>
      </form>
    </div>
  );
}

export default QuoteContainer;