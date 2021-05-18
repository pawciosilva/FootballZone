import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getLiveScores } from "../../api";

export default function LiveMatches() {

    const [liveMatches, setLiveMatches] = useState([]);
    const location = useLocation();

    let leagueKey = 0;
    if(location.pathname.includes("bundesliga")) leagueKey=195;
    if(location.pathname.includes("ligue1")) leagueKey=176;
    if(location.pathname.includes("seriea")) leagueKey=262;
    if(location.pathname.includes("laliga")) leagueKey=468;
    if(location.pathname.includes("premierleague")) leagueKey=148;

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
                        <h1>Live Matches </h1>  
                        {console.log(liveMatches)}
                    </div>
                </div>
            </div>
           
        </>
    );
}