import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { getTopScorersWithStats } from "../../api";
import HashLoader from "react-spinners/HashLoader";

export default function PlayersStatistics() {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState([]);
  const location = useLocation();

  let leagueKey = 0;
  let leagueUrl = "";
  if (location.pathname.includes("bundesliga")) {
    leagueUrl = "bundesliga";
    leagueKey = 195;
  }
  if (location.pathname.includes("ligue1")) {
    leagueUrl = "ligue1";
    leagueKey = 176;
  }
  if (location.pathname.includes("seriea")) {
    leagueUrl = "seriea";
    leagueKey = 262;
  }
  if (location.pathname.includes("laliga")) {
    leagueUrl = "laliga";
    leagueKey = 468;
  }
  if (location.pathname.includes("premierleague")) {
    leagueUrl = "premierleague";
    leagueKey = 148;
  }

  useEffect(() => {
    getTopScorersWithStats(leagueKey).then((topScorers) => {
      setPlayers(topScorers);
      setLoading(false);
    });
  }, [leagueKey]);

  return (
    <>
      <div className="container my-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            {loading ? (
              <HashLoader color={"#4e80b4"} />
            ) : (
              <table className="table table-responsive-lg" id="league-table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle">
                      No
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Name
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Team
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Position
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Matches
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Yellow cards
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Red cards
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Goals
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(
                    (
                      {
                        player_key,
                        player_name,
                        team_name,
                        team_logo,
                        player_type,
                        player_match_played,
                        player_yellow_cards,
                        player_red_cards,
                        player_goals,
                      },
                      index
                    ) => (
                      <tr scope="row" key={index}>
                        <td className="text-center align-middle">
                          {index + 1}
                        </td>
                        <td className="text-center align-middle fw-bold">
                          <NavLink
                            className="nav-link"
                            to={"/" + leagueUrl + "/player/" + player_key}
                          >
                            {player_name}
                          </NavLink>
                        </td>
                        <td className="d-flex flex-column align-items-center text-center">
                          <img
                            class="upcoming-img mx-2"
                            src={team_logo}
                            alt="logo"
                          ></img>
                          {team_name}
                        </td>
                        <td className="text-center align-middle">
                          {player_type}
                        </td>
                        <td className="text-center align-middle">
                          {player_match_played}
                        </td>
                        <td className="text-center align-middle">
                          {player_yellow_cards}
                        </td>
                        <td className="text-center align-middle">
                          {player_red_cards}
                        </td>
                        <td className="text-center align-middle fw-bold">
                          {player_goals}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
