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
                Weighted score is determined by how many hints you used to get a correct answer. No hints = 1 point, 1 hint = 0.75 points, 2 hints = 0.5 points, all 3 hints = 0.25 points.
            </Popover.Body>
        </Popover>
    )

    return (
        <div>
            <h5>Leaderboard</h5>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr className="text-light">
                        <th>User</th>
                        <th>Score</th>
                        <th>Weighted Score {
                            <OverlayTrigger trigger={["hover", "focus"]} overlay={popover}>
                                <td className="badge">❓</td>
                            </OverlayTrigger>
                        }</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedAllUsers.map((u) => {
                        return (
                            <tr key={u.id} className={`${u.id === user.id ? "bg-success bg-gradient" : "bg-secondary bg-gradient"}`}>
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