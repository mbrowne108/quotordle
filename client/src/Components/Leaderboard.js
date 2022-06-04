import { useState, useEffect } from "react";
import { OverlayTrigger, Popover } from 'react-bootstrap';

function Leaderboard({ user }) {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        fetch('/users')
        .then(r => r.json())
        .then(data => setAllUsers(data))
    }, [user])

    const sortedAllUsers = allUsers.sort((a,b) => b.weighted_score - a.weighted_score)

    const popover = (
        <Popover id="popover">
            <Popover.Body>
                Weighted score is determined by how many hints you used to get a correct answer. Use of no hints = 1 point, use of 1 hint = 0.75, use of 2 hints = 0.5, and use of all 3 hints = 0.25 points.
            </Popover.Body>
        </Popover>
    )

    return (
        <div>
            <h5>Leaderboard</h5>
            <table className="table table-hover">
                <thead>
                    <tr className="">
                        <th className="h6">User</th>
                        <th className="h6">Score</th>
                        <th className="h6">Weighted Score {
                            <OverlayTrigger trigger="hover" overlay={popover}>
                                <p className="badge h6">❓</p>
                            </OverlayTrigger>
                        }</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAllUsers.map((u) => {
                        return (
                            <tr className={`${u.id === user.id ? "bg-success" : "bg-light"}`}>
                                <td className="">{u.username}</td>
                                <td className="">{u.score}</td>
                                <td className=""><strong>{u.weighted_score}</strong></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Leaderboard;