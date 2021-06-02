import { NavLink, Route, useLocation } from "react-router-dom";
import LiveMatches from "./subpages/LiveMatches";
import PlayersStatistics from "./subpages/PlayersStatistics";
import PlayerDetails from "./subpages/PlayerDetails";
import Table from "./subpages/Table";
import UpcomingMatches from "./subpages/UpcomingMatches";
import bundesliga from "../assets/bundesliga.png";
import laliga from "../assets/laliga.png";
import seriea from "../assets/seriea.png";
import ligue1 from "../assets/ligue1.png";
import premierleague from "../assets/premierleague.png";
import TeamDetails from "./subpages/TeamDetails";

//leagueId = 176

export default function MainLeague() {
    const location = useLocation();

    let leagueUrl = "";
    let leagueLogo = "";
    if(location.pathname.includes("bundesliga")) { leagueUrl="bundesliga"; leagueLogo=bundesliga; }
    if(location.pathname.includes("ligue1")) { leagueUrl="ligue1"; leagueLogo=ligue1; }
    if(location.pathname.includes("seriea")) { leagueUrl="seriea"; leagueLogo=seriea; }
    if(location.pathname.includes("laliga")) { leagueUrl="laliga"; leagueLogo=laliga; }
    if(location.pathname.includes("premierleague")) { leagueUrl="premierleague"; leagueLogo=premierleague; }

    return (
      <div className="container px-3 mt-0">
        <div id="league-navbar">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/" + leagueUrl + "/table"}>
                Table
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={"/" + leagueUrl + "/livematches"}
              >
                Live Matches
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={"/" + leagueUrl + "/upcoming"}>
                Upcoming matches
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={"/" + leagueUrl + "/playerstats"}
              >
                Players Statistics
              </NavLink>
            </li>
          </ul>
        </div>
        <Route exact path={"/" + leagueUrl}>
          <div className="container my-5 text-center">
            <div className="row justify-content-center">
              <div className="col-md-12 col-lg-10">
                <img class="league-logo" src={leagueLogo} alt={leagueUrl}></img>
              </div>
            </div>
          </div>
        </Route>
        <Route path={"/" + leagueUrl + "/table"}>
          <Table />
        </Route>
        <Route path={"/" + leagueUrl + "/livematches"}>
          <LiveMatches />
        </Route>
        <Route path={"/" + leagueUrl + "/upcoming"}>
          <UpcomingMatches />
        </Route>
        <Route path={"/" + leagueUrl + "/playerstats"}>
          <PlayersStatistics />
        </Route>
        <Route path={"/" + leagueUrl + "/player"}>
          <PlayerDetails />
        </Route>
        <Route path={"/" + leagueUrl + "/team"}>
          <TeamDetails />
        </Route>
      </div>
    );
}