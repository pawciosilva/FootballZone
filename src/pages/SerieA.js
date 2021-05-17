import { Link, Route } from "react-router-dom";
import LiveMatches from "./subpages/LiveMatches";
import PlayersStatistics from "./subpages/PlayersStatistics";
import Table from "./subpages/Table";
import UpcomingMatches from "./subpages/UpcomingMatches";

//leagueId = 262

export default function SerieA() {
    return (
        <>
            <div>
                <h1>Serie A</h1>
                <ul>
                    <li><Link to="/seriea/table">Table</Link></li>
                    <li><Link to="/seriea/livematches">Live Matches</Link></li>
                    <li><Link to="/seriea/upcoming">Upcoming matches</Link></li>
                    <li><Link to="/seriea/playerstats">Players Statistics</Link></li>
                </ul>
                <Route path="/seriea/table"><Table /></Route>
                <Route path="/seriea/livematches"><LiveMatches /></Route>
                <Route path="/seriea/upcoming"><UpcomingMatches /></Route>
                <Route path="/seriea/playerstats"><PlayersStatistics /></Route>
            </div>
        </>
    );
}