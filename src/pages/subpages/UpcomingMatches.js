import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getFixtures } from "../../api"

export default function UpcomingMatches() {
    const [matches, setMatches] = useState([]);
    const location = useLocation();
    const date = new Date();
    const dateWeek = new Date();
    
    dateWeek.setDate(date.getDate() + 7)
    
    let leagueKey = 0;
    if(location.pathname.includes("bundesliga")) leagueKey=195;
    if(location.pathname.includes("ligue1")) leagueKey=176;
    if(location.pathname.includes("seriea")) leagueKey=262;
    if(location.pathname.includes("laliga")) leagueKey=468;
    if(location.pathname.includes("premierleague")) leagueKey=148;

    useEffect(() => {
        const fetchData = async () => {
            const result = await getFixtures(date, dateWeek, leagueKey).catch((err) => {
                console.error(err);
            });
            setMatches(result.data.result);
        };
        fetchData();
    }, [leagueKey]);

    return (
        <>
            <div className="container my-5 text-center">
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        <table class="table mt-4" id="league-table">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">Date</th>
                                    <th scope="col" className="text-center">Hour</th>
                                    <th scope="col" className="text-center">Teams</th>
                                    <th scope="col" className="text-center">Round</th>
                                </tr>
                            </thead>
                        {matches && matches.map((match) => {
                            return (
                                <tbody>
                                    <tr>
                                        <td className="text-center align-middle">{match.event_date}</td>
                                        <td className="text-center align-middle">{match.event_time}</td>
                                        <td className="text-center fw-bold align-middle">
                                            <img class="upcoming-img mx-2" src={match.home_team_logo} alt="logo"></img>{match.event_home_team} - {match.event_away_team}<img class="upcoming-img mx-2" src={match.away_team_logo} alt="logo"></img>  
                                        </td>
                                        <td className="text-center align-middle">{match.league_round}</td>
                                    </tr>
                                </tbody>
                            )
                        })} 
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}