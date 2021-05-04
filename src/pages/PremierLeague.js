import { Link, Route } from "react-router-dom";
import LiveMatches from "./subpages/LiveMatches";
import PlayersStatistics from "./subpages/PlayersStatistics";
import Table from "./subpages/Table";
import UpcomingMatches from "./subpages/UpcomingMatches";

export default function PremierLeague() {
    return (
        <>
            <div>
                <h1>Premier League</h1>
                <ul>
                    <li><Link to="/premierleague/table">Table</Link></li>
                    <li><Link to="/premierleague/livematches">Live Matches</Link></li>
                    <li><Link to="/premierleague/upcoming">Upcoming matches</Link></li>
                    <li><Link to="/premierleague/playerstats">Players Statistics</Link></li>
                </ul>
                <Route path="/premierleague/table"><Table /></Route>
                <Route path="/premierleague/livematches"><LiveMatches /></Route>
                <Route path="/premierleague/upcoming"><UpcomingMatches /></Route>
                <Route path="/premierleague/playerstats"><PlayersStatistics /></Route>
            </div>
        </>
    );
}