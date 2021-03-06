import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { getLiveScores, getTeam } from "../../api";

import HashLoader from "react-spinners/HashLoader";
export default function LiveMatches() {
  const [loading, setLoading] = useState(true);
  const [liveMatches, setLiveMatches] = useState([]);
  const [playingTeams, setPlayingTeams] = useState([]);
  const location = useLocation();

  var teamsID = [];
  var statistic = [
    "Ball Possession",
    "Goal Attempts",
    "Shots on Goal",
    "Shots off Goal",
    "Free Kicks",
    "Corner Kicks",
    "Fouls",
  ];
  let leagueKey = 0;
  let leagueURL = "";
  if (location.pathname.includes("bundesliga")) {
    leagueKey = 195;
    leagueURL = "/bundesliga";
  }
  if (location.pathname.includes("ligue1")) {
    leagueKey = 176;
    leagueURL = "/ligue1";
  }
  if (location.pathname.includes("seriea")) {
    leagueKey = 262;
    leagueURL = "/seriea";
  }
  if (location.pathname.includes("laliga")) {
    leagueKey = 468;
    leagueURL = "/laliga";
  }
  if (location.pathname.includes("premierleague")) {
    leagueKey = 248;
    leagueURL = "/premierleague";
  }

  useEffect(() => {
    getLiveScores(undefined)
      .catch((err) => console.error(err))
      .then((response) => {
        setLiveMatches(response);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container my-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">
          {loading ? (
            <HashLoader color={"#4e80b4"} />
          ) : (
            <>
              {!liveMatches && (
                <>
                  <h1 className="title-h1">
                    <i className="fa fa-frown-o fa-4x" aria-hidden="true"></i>
                  </h1>
                  <h5 className="title-h1">
                    No matches currently being played.
                    <br />
                    <NavLink className="nav-link" to={leagueURL + "/upcoming"}>
                      Check following matches!
                    </NavLink>
                  </h5>
                </>
              )}
              {liveMatches &&
                liveMatches.map((match, i) => (
                  <div className="container my-5" key={match.event_key + i}>
                    <div
                      className="row mx-auto my-1 text-center justify-content-center"
                      id="headerLive"
                    >
                      <div
                        id="teamLive"
                        className="text-center col-3 fw-bold d-flex align-items-center justify-content-center"
                      >
                        {match.event_home_team}
                      </div>
                      <div
                        id="liveLogo"
                        className="col-2 d-flex align-items-center justify-content-center"
                      >
                        <img
                          className="w-75"
                          src={match.home_team_logo}
                          alt="logo"
                        ></img>
                      </div>
                      <div
                        id="resultLive"
                        className="col-2  d-flex align-items-center justify-content-center"
                      >
                        {match.event_final_result}
                      </div>
                      <div
                        id="liveLogo"
                        className="col-2 d-flex align-items-center justify-content-center"
                      >
                        <img
                          className="w-75"
                          src={match.away_team_logo}
                          alt="logo"
                        ></img>
                      </div>
                      <div
                        id="teamLive"
                        className=" text-center col-3 fw-bold d-flex align-items-center justify-content-center"
                      >
                        {" "}
                        {match.event_away_team}
                      </div>
                    </div>
                    {match.statistics.length > 0 &&
                      match.statistics.map((stats, j) => {
                        if (statistic.includes(stats.type)) {
                          return (
                            <div
                              id="rowLive"
                              className="row w-75 mx-auto"
                              key={stats.type + j}
                            >
                              <div className="text-center col-3 my-1 align-middle">
                                {stats.home}
                              </div>
                              <div className="text-center col-6 my-1 align-middle">
                                {stats.type}
                              </div>
                              <div className="text-center col-3 my-1 align-middle">
                                {stats.away}
                              </div>
                            </div>
                          );
                        }
                      })}
                    <div id="liveFooter" className="row mx-auto">
                      <div id="timeLive" className="col-6 my-1">
                        <i className="fa fa-clock-o" aria-hidden="true" />{" "}
                        {match.event_time}
                      </div>
                      <div id="placeLive" className="col-6 my-1">
                        <i className="fa fa-map-marker" aria-hidden="true" />{" "}
                        {match.event_stadium}
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div className="container my-5 text-center">
//       {console.log(playingTeams)}
//       <div className="row justify-content-center">
//         <div className="col-md-12 col-lg-10">
//           {loading ? (
//             <HashLoader color={"#4e80b4"} />
//           ) : (
//             <>
//               {!liveMatches && (
//                 <>
//                   <h1 className="title-h1">
//                     <i className="fa fa-frown-o fa-4x" aria-hidden="true"></i>
//                   </h1>
//                   <h5 className="title-h1">
//                     No matches currently being played.
//                     <br />
//                     <NavLink className="nav-link" to={leagueURL + "/upcoming"}>
//                       Check following matches!
//                     </NavLink>
//                   </h5>
//                 </>
//               )}
//               {liveMatches &&
//                 liveMatches.map((match, i) => (
//                   <div className="container my-5" key={match.event_key + i}>
//                     <div
//                       className="row mx-auto my-1 text-center justify-content-center"
//                       id="headerLive"
//                     >
//                       <div
//                         id="teamLive"
//                         className="text-center col-3 fw-bold d-flex align-items-center justify-content-center"
//                       >
//                         {match.event_home_team}
//                       </div>
//                       <div
//                         id="liveLogo"
//                         className="col-2 d-flex align-items-center justify-content-center"
//                       >
//                         {playingTeams &&
//                           playingTeams.forEach((team) => {
//                             // console.log(match.event_home_team)
//                             // console.log(team.team_name + " : " + team.team_key);
//                             if (team.team_key === match.home_team_key) {
//                               return (
//                                 <img
//                                   className="w-75"
//                                   key={team.team_key}
//                                   src={team.team_logo}
//                                   alt="logo"
//                                 ></img>
//                               );
//                             }
//                           })}
//                       </div>
//                       <div
//                         id="resultLive"
//                         className="col-2  d-flex align-items-center justify-content-center"
//                       >
//                         {match.event_final_result}
//                       </div>
//                       <div
//                         id="liveLogo"
//                         className="col-2 d-flex align-items-center justify-content-center"
//                       >
//                         {playingTeams &&
//                           playingTeams.forEach((team) => {
//                             if (team.team_key === match.away_team_key) {
//                               return (
//                                 <img
//                                   className="w-75"
//                                   key={team.team_key}
//                                   src={team.team_logo}
//                                   alt="logo"
//                                 ></img>
//                               );
//                             }
//                           })}
//                       </div>
//                       <div
//                         id="teamLive"
//                         className=" text-center col-3 fw-bold d-flex align-items-center justify-content-center"
//                       >
//                         {" "}
//                         {match.event_away_team}
//                       </div>
//                     </div>
//                     {match.statistics.length > 0 &&
//                       match.statistics.map((stats, j) => {
//                         if (statistic.includes(stats.type)) {
//                           return (
//                             <div
//                               id="rowLive"
//                               className="row w-75 mx-auto"
//                               key={stats.type + j}
//                             >
//                               <div className="text-center col-3 my-1 align-middle">
//                                 {stats.home}
//                               </div>
//                               <div className="text-center col-6 my-1 align-middle">
//                                 {stats.type}
//                               </div>
//                               <div className="text-center col-3 my-1 align-middle">
//                                 {stats.away}
//                               </div>
//                             </div>
//                           );
//                         }
//                       })}
//                     <div id="liveFooter" className="row mx-auto">
//                       <div id="timeLive" className="col-6 my-1">
//                         <i className="fa fa-clock-o" aria-hidden="true" />{" "}
//                         {match.event_time}
//                       </div>
//                       <div id="placeLive" className="col-6 my-1">
//                         <i className="fa fa-map-marker" aria-hidden="true" />{" "}
//                         {match.event_stadium}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
