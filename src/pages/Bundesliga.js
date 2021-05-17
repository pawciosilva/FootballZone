import { Route } from "react-router";
import { Link } from "react-router-dom";
import LiveMatches from "./subpages/LiveMatches";
import PlayersStatistics from "./subpages/PlayersStatistics";
import Table from "./subpages/Table";
import UpcomingMatches from "./subpages/UpcomingMatches";

//leagueId = 195

export default function Bundesliga() {
    return (
        <>
            <div>
                <h1>Bundesliga</h1>
                <ul>
                    <li><Link to="/bundesliga/table">Table</Link></li>
                    <li><Link to="/bundesliga/livematches">Live Matches</Link></li>
                    <li><Link to="/bundesliga/upcoming">Upcoming matches</Link></li>
                    <li><Link to="/bundesliga/playerstats">Players Statistics</Link></li>
                </ul>
                <Route path="/bundesliga/table"><Table /></Route>
                <Route path="/bundesliga/livematches"><LiveMatches /></Route>
                <Route path="/bundesliga/upcoming"><UpcomingMatches /></Route>
                <Route path="/bundesliga/playerstats"><PlayersStatistics /></Route>  
            </div>
        </>
    );
}