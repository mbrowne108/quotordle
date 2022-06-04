import { useState, useEffect } from "react";

function Leaderboard({ user }) {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetch('/users')
        .then(r => r.json())
        .then(data => setAllUsers(data))
    }, [user])

    const sortedAllUsers = allUsers.sort((a,b) => b.weighted_score - a.weighted_score)

    return (
        <div>
            <h5>Leaderboard</h5>
            <ul className="list-group">
                <div className="row">
                    <h6 className="col">User</h6>
                    <h6 className="col">Score</h6>
                    <h6 className="col">Weighted Score</h6>
                </div>
                {sortedAllUsers.map((u) => {
                    return (
                        <li className={`row ${u.id === user.id ? "bg-success" : "bg-light"}`}>
                            <p className="col">{u.username}</p>
                            <p className="col">{u.score}</p>
                            <p className="col">{u.weighted_score}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default Leaderboard;