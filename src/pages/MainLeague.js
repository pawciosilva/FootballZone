import { NavLink, Route, useLocation } from "react-router-dom";
import LiveMatches from "./subpages/LiveMatches";
import PlayersStatistics from "./subpages/PlayersStatistics";
import Table from "./subpages/Table";
import UpcomingMatches from "./subpages/UpcomingMatches";

//leagueId = 176

export default function MainLeague() {
    const location = useLocation();

    let leagueUrl = "";
    if(location.pathname.includes("bundesliga")) { leagueUrl="/bundesliga"; }
    if(location.pathname.includes("ligue1")) { leagueUrl="/ligue1"}
    if(location.pathname.includes("seriea")) { leagueUrl="/seriea"}
    if(location.pathname.includes("laliga")) { leagueUrl="/laliga"}
    if(location.pathname.includes("premierleague")) { leagueUrl="/premierleague"}

    return (
      <div className="container px-3 mt-0">
        <div id="league-navbar">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to={leagueUrl + "/table"}>
                Table
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={leagueUrl + "/livematches"}>
                Live Matches
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={leagueUrl + "/upcoming"}>
                Upcoming matches
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={leagueUrl + "/playerstats"}>
                Players Statistics
              </NavLink>
            </li>
          </ul>
        </div>
        <Route path={leagueUrl + "/table"}>
          <Table />
        </Route>
        <Route path={leagueUrl + "/livematches"}>
          <LiveMatches />
        </Route>
        <Route path={leagueUrl + "/upcoming"}>
          <UpcomingMatches />
        </Route>
        <Route path={leagueUrl + "/playerstats"}>
          <PlayersStatistics />
        </Route>
      </div>
    );
}