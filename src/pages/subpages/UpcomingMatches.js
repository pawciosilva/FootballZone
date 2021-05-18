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
                <h1 className="title-h1">Upcoming Matches</h1> 
                {matches && matches.map((match) => {
                    return (
                        <p>{match.event_home_team} - {match.event_away_team}</p>
                    )
                })} 
            </div>
        </>
    );
}