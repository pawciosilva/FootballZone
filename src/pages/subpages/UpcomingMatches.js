import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { getFixtures } from "../../api";
import HashLoader from "react-spinners/HashLoader";

export default function UpcomingMatches() {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const date = new Date();
  const dateWeek = new Date();

  dateWeek.setDate(date.getDate() + 7);

  let leagueKey = 0;
  if (location.pathname.includes("bundesliga")) leagueKey = 195;
  if (location.pathname.includes("ligue1")) leagueKey = 176;
  if (location.pathname.includes("seriea")) leagueKey = 262;
  if (location.pathname.includes("laliga")) leagueKey = 468;
  if (location.pathname.includes("premierleague")) leagueKey = 148;

  useEffect(() => {
    // const fetchData = async () => {
    //   const result = await getFixtures(date, dateWeek, leagueKey).catch((err) => {
    //     console.error(err);
    //   });
    //   if (result.data.result) {
    //     setMatches(result.data.result);
    //   }
    // };

    //only for test
    const fetchData = async () => {
      const result = await getFixtures(date, dateWeek, undefined).catch(
        (err) => {
          console.error(err);
        }
      );
      if (result.data.result) {
        setMatches(result.data.result.slice(0, 19));
        setLoading(false);
      }
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
              <>
                <table className="table table-hover mt-4" id="league-table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center">
                        Date
                      </th>
                      <th scope="col" className="text-center">
                        Hour
                      </th>
                      <th scope="col" className="text-center">
                        Teams
                      </th>
                      <th scope="col" className="text-center">
                        Round
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.reverse().map((match, index) => (
                      <tr
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          history.push({
                            pathname: `/h2h/${match.event_home_team.replace(
                              / /g,
                              ""
                            )}-${match.event_away_team.replace(/ /g, "")}`,
                            state: {
                              teamId1: match.home_team_key,
                              teamId2: match.away_team_key,
                            },
                          })
                        }
                      >
                        <td className="text-center align-middle">
                          {match.event_date}
                        </td>
                        <td className="text-center align-middle">
                          {match.event_time}
                        </td>
                        <td className="text-center fw-bold align-middle">
                          <img
                            class="upcoming-img mx-2"
                            src={match.home_team_logo}
                            alt="logo"
                          ></img>
                          {match.event_home_team} - {match.event_away_team}
                          <img
                            class="upcoming-img mx-2"
                            src={match.away_team_logo}
                            alt="logo"
                          ></img>
                        </td>
                        <td className="text-center align-middle">
                          {match.league_round}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
