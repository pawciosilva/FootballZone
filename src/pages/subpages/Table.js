import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getStandings } from "../../api"

export default function Table() {
    const [teams, setTeams] = useState([]);
    const location = useLocation();

    let leagueKey = 0;
    if(location.pathname.includes("bundesliga")) leagueKey=195;
    if(location.pathname.includes("ligue1")) leagueKey=176;
    if(location.pathname.includes("seriea")) leagueKey=262;
    if(location.pathname.includes("laliga")) leagueKey=468;
    if(location.pathname.includes("premierleague")) leagueKey=148;

    useEffect(() => {
        const fetchData = async () => {
            const result = await getStandings(leagueKey).catch((err) => {
                console.error(err);
            });
            setTeams(result.data.result.total);
        };
        fetchData();
    }, [leagueKey]);

    return (
        <>
            <div>
                <h1>Table</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Position</th>
                            <th scope="col">Team</th>
                            <th scope="col">Points</th>
                            <th scope="col">W</th>
                            <th scope="col">D</th>
                            <th scope="col">L</th>
                            <th scope="col">Goal Diffrence</th>
                        </tr>
                    </thead>
                {teams && teams.map((team) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{team.standing_place}.</td>
                                <td>{team.standing_team}</td>
                                <td>{team.standing_PTS}</td>
                                <td>{team.standing_W}</td>
                                <td>{team.standing_D}</td>
                                <td>{team.standing_L}</td>
                                <td>{team.standing_GD}</td>
                            </tr>
                        </tbody>
                    )
                })}
                </table>
            </div>
        </>
    );
}