import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getStandings } from "../../api";

export default function Table() {
  const [teams, setTeams] = useState([]);
  const location = useLocation();

  let leagueKey = 0;
  if (location.pathname.includes("bundesliga")) leagueKey = 195;
  if (location.pathname.includes("ligue1")) leagueKey = 176;
  if (location.pathname.includes("seriea")) leagueKey = 262;
  if (location.pathname.includes("laliga")) leagueKey = 468;
  if (location.pathname.includes("premierleague")) leagueKey = 148;

  useEffect(() => {
    const fetchData = async () => {
      const result = await getStandings(leagueKey).catch((err) => {
        console.error(err);
      });
      setTeams(result.data.result.total);
    };
    fetchData();
  }, [leagueKey]);

  return (
    <>
      <div className="container my-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
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
                          {team.standing_team}
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
          </div>
        </div>
      </div>
    </>
  );
}
