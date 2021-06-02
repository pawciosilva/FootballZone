import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { getTeam } from "../../api";

export default function TeamDetails() {
  const [team, setPlayer] = useState();
  const location = useLocation();

  let teamId = location.pathname.split("/").slice(-1)[0];
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
    getTeam(teamId).then((team) => {
      setPlayer(team.data.result[0]);
    });
  }, [teamId]);

  return (
    <>
      {team && (
        <div className="container my-5 px-0">
          <div className="container teambox ">
            <div className="row align-items-center p-5 mb-5">
              <div className="col-sm-12 col-md-4  d-flex flex-column align-items-center justify-content-center">
                <img class=" mx-2 " src={team.team_logo} alt="logo"></img>
              </div>
              <h2 className="col-sm-12 col-md-3 d-flex flex-column align-items-center justify-content-center">
                <span>
                  Team: <span className="fw-bold">{team.team_name}</span>
                </span>
              </h2>
              <h5 className="col-sm-12 col-md-5 d-flex flex-column align-items-center text-center justify-content-center">
                <span>
                  Coach:{" "}
                  <span className="fw-bold">
                    {team.coaches[0].coach_name} <br />
                    {team.coaches[0].coach_age}yo,{" "}
                    {team.coaches[0].coach_country}
                  </span>
                </span>
              </h5>
            </div>
          </div>
          <div className="row ">
            <div className="col-sm-12">
              <h3 className="text-center fw-bold mb-4">
                <span className="custom-underline position-relative">
                  Team Players
                </span>
              </h3>
              <table
                class="table table-responsive-lg overflow-auto"
                id="league-table"
              >
                <thead>
                  <tr>
                    <th scope="col" className="text-center align-middle">
                      Player Number
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Name
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Country
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Possition
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Match played
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Goals
                    </th>
                    <th scope="col" className="text-center align-middle">
                      Cards
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {team.players.map((player, key) => {
                    return (
                      <>
                        <tr key={key}>
                          <td className="text-center align-middle">
                            {console.log(player.player_number)}
                            {player.player_number}
                          </td>
                          <td className="text-center align-middle ">
                            <NavLink
                              className="nav-link"
                              to={
                                "/" + leagueUrl + "/player/" + player.player_key
                              }
                            >
                              <span className="fw-bold">
                                {player.player_name}
                              </span>
                            </NavLink>
                          </td>
                          <td className="text-center align-middle ">
                            {player.player_country}
                          </td>
                          <td className="text-center align-middle ">
                            {player.player_type}
                          </td>
                          <td className="text-center align-middle ">
                            {player.player_match_played}
                          </td>
                          <td className="text-center align-middle ">
                            {player.player_goals + " "}
                            <i className="fa fa-futbol-o text-success" />
                          </td>
                          <td className="text-center align-middle ">
                            {player.player_red_cards + " "}
                            <i className="fa fa-sticky-note text-danger" />
                            {"  "}
                            {player.player_yellow_cards + " "}
                            <i className="fa fa-sticky-note text-warning" />
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
