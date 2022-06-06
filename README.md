
# QUOTORDLE

A Wordle-like guessing game where you are given a famous movie quote and have to guess the move it is from.

## Technologies used

In this project I use the following technologies:

    1. CSS (Bootstrap)
    2. HTML/JSX
    3. React
    4. Ruby
    5. Active Record
    6. Rails

## Libraries Used

The following libraries are also used:

1. [React-Bootstrap](http://react-bootstrap.github.io/)

## Front End (React)
To start the front end server, run : ``npm start --prefix client`` The server will be hosted on [http://localhost:4000](http://localhost:4000)

The front end consists of React components fetching data from our JSON API, using fetch requests to perform CRUD actions.

Additionally, the site is hosted on Heroku at [quotordle.herokuapp.com/](https://quotordle.herokuapp.com/). The following actions below can be accessed on the remote server by replacing **localhost:4000** with **quotordle.herokuapp.com/**.


You may create your own user login or additionally check out the admin user: Username: ``mbrowne``

### READ
- #### GET: ``useEffect`` on the ``/quotes`` table grabs a random quote (with additional clues) from the API.
- #### GET: ``useEffect`` on the ``/users`` table grabs the entire list of registered users, for listing on the leaderboard.
- #### GET: ``useEffect`` on the ``/me`` route reads the current user.

### UPDATE
- #### PATCH: If the user registers a correct answer, their ``score`` and ``weighted score`` will automatically be edited in their respetive user info in the database.

### CREATE
- #### POST: On the initial ``Sign Up`` screen, filling out the ``Sign Up Form`` posts a new user to the database, with authentication.
- #### POST: On the initial login screen, filling out the ``Login Form`` posts a new session to the database, with associated user data.

### DELETE
- #### DELETE: Clicking the ``Logout`` button will automatically delete the session from the sessions table.

## Back End (Ruby, ActiveRecord, Rails)
To start the back end server, run : ``rails s`` The server will be hosted on [http://localhost:3000](http://localhost:3000)

The front end consists of React components fetching data from our JSON API, using fetch requests to perform CRUD actions.

Additionally, the site is hosted on Heroku at [quotordle.herokuapp.com/](https://quotordle.herokuapp.com/). The following actions below can be accessed on the remote server by replacing **localhost:3000** with **quotordle.herokuapp.com/**.

### READ
- #### GET [localhost:3000/quotes](http://localhost:3000/quotes): Gets a random quote from the database.
- #### GET [localhost:3000/users](http://localhost:3000/users): Gets a list of every user in the database.
- #### GET [localhost:3000/me](http://localhost:3000/me): Gets the currently logged in user, and all their visits.

### UPDATE
- #### PATCH [localhost:3000/users/:id](http://localhost:3000/users/:id): Updates a user's ``score`` and ``weighted_score`` when a correct answer is registered.

### CREATE
- #### POST [localhost:3000/signup](http://localhost:3000/signup): Creates a new user with authentication.
- #### POST [localhost:3000/login](http://localhost:3000/login): Creates a new session with an associated user.

### DELETE
- #### DELETE [localhost:3000/logout](http://localhost:3000/logout): Deletes a user's current session.

## License
[MIT](https://choosealicense.com/licenses/mit/)