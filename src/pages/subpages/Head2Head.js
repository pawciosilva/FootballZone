import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import { getTeamComparison } from "../../api";

export default function Head2Head() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState(null);
  const [stats, setStats] = useState({ matches: 0, homeWins: 0, awayWins: 0, draws: 0 });

  const { teamId1, teamId2 } = useLocation().state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTeamComparison(teamId1, teamId2);
        setMatches(result);
        setTeams(() => {
          if (result[0].home_team_key === teamId1) {
            return {
              homeTeamName: result[0].event_home_team,
              homeTeamLogo: result[0].home_team_logo,
              awayTeamName: result[0].event_away_team,
              awayTeamLogo: result[0].away_team_logo,
            };
          } else {
            return {
              homeTeamName: result[0].event_away_team,
              homeTeamLogo: result[0].away_team_logo,
              awayTeamName: result[0].event_home_team,
              awayTeamLogo: result[0].home_team_logo,
            };
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (teams && matches.length > 0)
      setStats({
        matches: matches.length,
        homeWins:
          matches.filter(
            (item) =>
              item.event_final_result.split(/\s*/)[0] > item.event_final_result.split(/\s*/)[2] &&
              item.event_home_team === teams.homeTeamName
          ).length +
          matches.filter(
            (item) =>
              item.event_final_result.split(/\s*/)[0] < item.event_final_result.split(/\s*/)[2] &&
              item.event_home_team === teams.awayTeamName
          ).length,
        awayWins:
          matches.filter(
            (item) =>
              item.event_final_result.split(/\s*/)[0] < item.event_final_result.split(/\s*/)[2] &&
              item.event_home_team === teams.homeTeamName
          ).length +
          matches.filter(
            (item) =>
              item.event_final_result.split(/\s*/)[0] > item.event_final_result.split(/\s*/)[2] &&
              item.event_home_team === teams.awayTeamName
          ).length,
        draws: matches.filter(
          (item) =>
            item.event_final_result.split(/\s*/)[0] === item.event_final_result.split(/\s*/)[2]
        ).length,
      });
  }, [teams]);

  return (
    <div className="container my-3 px-0">
      {matches.length > 0 && teams && stats && (
        <div className="row justify-content-center mx-0">
          <div className="row col-lg-10">
            <div className="container">
              <div className="row align-items-center mb-3">
                <div className="col-sm col-12 d-flex flex-column justify-content-center align-items-center">
                  <img className="w-10" src={teams.homeTeamLogo} alt="logo" />
                  <h3 className>{teams.homeTeamName}</h3>
                </div>
                <div className="col-sm col-12 d-flex flex-column justify-content-center align-items-center">
                  <span style={{ fontSize: 40, fontWeight: "bold" }}>vs</span>
                </div>
                <div className="col-sm col-12 d-flex flex-column justify-content-center align-items-center">
                  <img className="w-10 mx-2" src={teams.awayTeamLogo} alt="logo" />
                  <h3>{teams.awayTeamName}</h3>
                </div>
              </div>
              <div className="row align-items-center mb-5">
                <div className="col-sm col-12 mb-sm-0 mb-3 d-flex flex-column align-items-center justify-content-center">
                  <h4>
                    Wins: {stats.homeWins}/{stats.matches}
                  </h4>
                  <div class="w-75 progress" style={{ height: "30px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(100 * stats.homeWins) / stats.matches}%`,
                        backgroundColor: "green",
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm col-12 d-flex flex-column align-items-center justify-content-center">
                  <h4>
                    Draws: {stats.draws}/{stats.matches}
                  </h4>
                  <div className="w-75 progress" style={{ height: "30px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(100 * stats.draws) / stats.matches}%`,
                        backgroundColor: "gray",
                      }}
                    />
                  </div>
                </div>
                <div className="col-sm col-12 d-flex flex-column align-items-center justify-content-center">
                  <h4>
                    Wins: {stats.awayWins}/{stats.matches}
                  </h4>
                  <div className="w-75 progress" style={{ height: "30px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${(100 * stats.awayWins) / stats.matches}%`,
                        backgroundColor: "red",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row col-lg-10">
            <table className="table" id="league-table">
              <thead>
                <tr>
                  <th scope="col" className="text-center align-middle">
                    No
                  </th>
                  <th scope="col" className="text-center align-middle">
                    Date
                  </th>
                  <th scope="col" className="text-center align-middle">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {matches.map(
                  (
                    {
                      event_home_team,
                      home_team_logo,
                      event_away_team,
                      away_team_logo,
                      event_date,
                      event_final_result,
                    },
                    index
                  ) => (
                    <tr scope="row" key={index}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="text-center align-middle fw-bold">{event_date}</td>
                      <td className="text-center fw-bold align-middle">
                        <img class="upcoming-img mx-2" src={home_team_logo} alt="logo"></img>
                        {event_home_team} {event_final_result} {event_away_team}
                        <img class="upcoming-img mx-2" src={away_team_logo} alt="logo"></img>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
