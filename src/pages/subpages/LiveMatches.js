import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { getLiveScores, getTeams } from "../../api";

export default function LiveMatches() {

    const [liveMatches, setLiveMatches] = useState([]);
    const [leagueTeams, setLeaguesTeams] = useState([])
    const location = useLocation();
    const [color, setColor] = useState("red");

    let leagueKey = 0;
    let leagueURL = "";
    if(location.pathname.includes("bundesliga")) {leagueKey=195; leagueURL="/bundesliga"}
    if(location.pathname.includes("ligue1")) {leagueKey=176; leagueURL="/ligue1"};
    if(location.pathname.includes("seriea")) {leagueKey=262; leagueURL="/seriea"};
    if(location.pathname.includes("laliga")) {leagueKey=468; leagueURL="/laliga"};
    if(location.pathname.includes("premierleague")) {leagueKey=148; leagueURL="/premierleague"};

    useEffect(() => {
        const fetchData = async () => {
            const result = await getLiveScores(leagueKey).catch((err) => {
                console.error(err);
            });
            console.log(result);
            setLiveMatches(result.data.result); 
            if(color ==='red') 
                setColor('grey');   
            else
            setColor('red');
        };
        fetchData();
    },[color,leagueKey]);

    useEffect(() => {
        const getLeagueTeams = async () => {
            const result = await getTeams(leagueKey).catch((err)=>{
                console.log(err);
            })
            setLeaguesTeams(result.data.result)
        };
        getLeagueTeams();
        
    }, [leagueKey]);
    return (
        <>
            <div className="container my-5 text-center">
                <div style={{color: color}}>
                asdas
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10">
                        {!liveMatches && (
                        <>
                            <h1 className="title-h1"> 
                                 <i className="fa fa-frown-o fa-4x" aria-hidden="true"></i>  
                            </h1>
                            <h5 className="title-h1">       
                                No matches currently being played.
                                <br />
                                <NavLink  className="nav-link" to={leagueURL + "/upcoming"}>Check following matches!</NavLink>
                            </h5>
                        </>
                        )}  
                       {liveMatches && liveMatches.map((match)=>{
                          return(
                              
                              <>                            
                              <div id="containerLive" className="container my-5">
                                    <div className="row mx-auto my-1" id="headerLive">
                                        <div id="teaLive"className="text-center col-5 fw-bold align-middle" >{match.event_home_team}</div>
                                        <div id="resultLive" className=" text-center col-2 align-middle">{match.event_final_result}</div>
                                        <div id="teamLive" className=" text-center col-5 fw-bold align-middle">{match.event_away_team}</div>
                                    </div>
                                    <div className="row w-75 mx-auto">
                                        <div className="text-center col-3 my-1 align-middle">{match.statistics[0].home}</div>
                                        <div className="text-center col-6 my-1 align-middle">{match.statistics[0].type}</div>
                                        <div className="text-center col-3 my-1 align-middle">{match.statistics[0].away}</div>
                                    </div>
                                    <div className="row w-75 mx-auto">
                                        <div className="text-center col-3 my-1">{match.statistics[1].home}</div>
                                        <div className="text-center col-6 my-1">{match.statistics[1].type}</div>
                                        <div className="text-center col-3 my-1">{match.statistics[1].away}</div>
                                    </div>
                                    <div className="row w-75 mx-auto">
                                        <div className="text-center col-3 my-1">{match.statistics[2].home}</div>
                                        <div className="text-center col-6 my-1">{match.statistics[2].type}</div>
                                        <div className="text-center col-3 my-1">{match.statistics[2].away}</div>
                                    </div>
                                    <div className="row w-75 mx-auto">
                                        <div className="text-center col-3 my-1">{match.statistics[3].home}</div>
                                        <div className="text-center col-6 my-1">{match.statistics[3].type}</div>
                                        <div className="text-center col-3 my-1">{match.statistics[3].away}</div>
                                    </div>
                                    <div className="row w-75 mx-auto">
                                        <div className="text-center col-3 my-1">{match.statistics[5].home}</div>
                                        <div className="text-center col-6 my-1">{match.statistics[5].type}</div>
                                        <div className="text-center col-3 my-1">{match.statistics[5].away}</div>
                                    </div>
                                    <div className="row w-75 mx-auto">
                                        <div  className="text-center col-3 my-1">{match.statistics[6].home}</div>
                                        <div className="text-center col-6 my-1">{match.statistics[6].type}</div>
                                        <div className="text-center col-3 my-1">{match.statistics[6].away}</div>
                                    </div>
                                    <div className="row w-75 mx-auto">
                                        <div className="text-center col-3 my-1">{match.statistics[10].home}</div>
                                        <div className="text-center col-6 my-1">{match.statistics[10].type}</div>
                                        <div className="text-center col-3 my-1">{match.statistics[10].away}</div>
                                    </div>
                                    <div id="liveFooter" className="row mx-auto">
                                        <div id="timeLive"className="col-6 my-1"><i class="fa fa-clock-o" aria-hidden="true"></i> {match.event_time}</div>
                                        <div id="placeLive"className="col-6 my-1"><i class="fa fa-map-marker" aria-hidden="true"></i> {match.event_stadium}</div>
                                    </div>    
                              </div>
                                
                              </>
                          )
                       })}                     
                    </div>
                </div>
                
            </div>
            
           
        </>
    );
}