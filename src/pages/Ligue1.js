import { Link, Route } from "react-router-dom";
import LiveMatches from "./subpages/LiveMatches";
import PlayersStatistics from "./subpages/PlayersStatistics";
import Table from "./subpages/Table";
import UpcomingMatches from "./subpages/UpcomingMatches";

export default function Ligue1() {
    return (
        <>
            <div>
                <h1>Ligue 1</h1>
                <ul>
                    <li><Link to="/ligue1/table">Table</Link></li>
                    <li><Link to="/ligue1/livematches">Live Matches</Link></li>
                    <li><Link to="/ligue1/upcoming">Upcoming matches</Link></li>
                    <li><Link to="/ligue1/playerstats">Players Statistics</Link></li>
                </ul>
                <Route path="/ligue1/table"><Table /></Route>
                <Route path="/ligue1/livematches"><LiveMatches /></Route>
                <Route path="/ligue1/upcoming"><UpcomingMatches /></Route>
                <Route path="/ligue1/playerstats"><PlayersStatistics /></Route>
            </div>
        </>
    );
}