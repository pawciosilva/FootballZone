import { useEffect, useState } from "react";
import { Route, useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { getLiveScores } from "../../api";

export default function LiveMatches() {

    const [liveMatches, setLiveMatches] = useState([]);
    const location = useLocation();

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
            setLiveMatches(result.data.result);              
        };
        fetchData();
    }, [leagueKey]);
    return (
        <>
            <div className="container my-5 text-center">
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
                    </div>
                    
                </div>
                
            </div>
            
           
        </>
    );
}