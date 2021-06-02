import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { getStandings } from "../../api";
import HashLoader from "react-spinners/HashLoader";

export default function Table() {
  const [loading, setLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const location = useLocation();

  let leagueKey = 0;
  var leagueUrl = "";
  if (location.pathname.includes("bundesliga")) {
    leagueKey = 195;
    leagueUrl = "bundesliga";
  }
  if (location.pathname.includes("ligue1")) {
    leagueKey = 176;
    leagueUrl = "ligue1";
  }
  if (location.pathname.includes("seriea")) {
    leagueKey = 262;
    leagueUrl = "seriea";
  }
  if (location.pathname.includes("laliga")) {
    leagueKey = 468;
    leagueUrl = "laliga";
  }
  if (location.pathname.includes("premierleague")) {
    leagueKey = 148;
    leagueUrl = "premierleague";
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await getStandings(leagueKey).catch((err) => {
        console.error(err);
      });
      setTeams(result.data.result.total);
      setLoading(false);
    };
    fetchData();
  }, [leagueKey]);

  return (
    <>
      <div className="container my-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            {loading ? (
              <HashLoader color={"#4e80b4"} />
            ) : (
              <table class="table mt-4" id="league-table">
                <thead>
                  <tr>
                    <th scope="col" className="text-center">
                      Position
                    </th>
                    <th scope="col" className="text-center">
                      Team
                    </th>
                    <th scope="col" className="text-center">
                      Points
                    </th>
                    <th scope="col" className="text-center">
                      W
                    </th>
                    <th scope="col" className="text-center">
                      D
                    </th>
                    <th scope="col" className="text-center">
                      L
                    </th>
                    <th scope="col" className="text-center">
                      Goal Diffrence
                    </th>
                  </tr>
                </thead>
                {teams &&
                  teams.map((team) => {
                    return (
                      <tbody>
                        <tr>
                          <td className="text-center fw-bold">
                            {team.standing_place}.
                          </td>
                          <td className="text-center fw-bold">
                            <NavLink
                              className="nav-link"
                              to={"/" + leagueUrl + "/team/" + team.team_key}
                            >
                              {team.standing_team}
                            </NavLink>
                          </td>
                          <td className="text-center">{team.standing_PTS}</td>
                          <td className="text-center">{team.standing_W}</td>
                          <td className="text-center">{team.standing_D}</td>
                          <td className="text-center">{team.standing_L}</td>
                          <td className="text-center">{team.standing_GD}</td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
