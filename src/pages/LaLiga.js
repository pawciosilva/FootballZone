import { Route } from "react-router";
import { Link } from "react-router-dom";
import LiveMatches from "./subpages/LiveMatches";
import PlayersStatistics from "./subpages/PlayersStatistics";
import Table from "./subpages/Table";
import UpcomingMatches from "./subpages/UpcomingMatches";

export default function LaLiga() {
    return (
        <>
            <div>
                <h1>La Liga</h1>
                <ul>
                    <li><Link to="/laliga/table">Table</Link></li>
                    <li><Link to="/laliga/livematches">Live Matches</Link></li>
                    <li><Link to="/laliga/upcoming">Upcoming matches</Link></li>
                    <li><Link to="/laliga/playerstats">Players Statistics</Link></li>
                </ul>
                <Route path="/laliga/table"><Table /></Route>
                <Route path="/laliga/livematches"><LiveMatches /></Route>
                <Route path="/laliga/upcoming"><UpcomingMatches /></Route>
                <Route path="/laliga/playerstats"><PlayersStatistics /></Route>
            </div>
        </>
    );
}