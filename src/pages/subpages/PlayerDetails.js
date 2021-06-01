import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getPlayerDetails } from "../../api";

export default function PlayersStatistics() {
  const [player, setPlayer] = useState([]);
  const location = useLocation();

  let playerId = location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    getPlayerDetails(playerId).then((player) => {
        if(player.length > 1)
            setPlayer(player[1]);
        else
            setPlayer(player);
    });
  }, [playerId]);

  return (
      <div className="container my-5 px-0">
        <div id="headerPlayer">
        <div className="row align-items-center mb-5">
          <h2 className="col-sm col-12 mb-sm-0 mb-3 d-flex flex-column align-items-center justify-content-center">{player.player_name}</h2>  
          <h5 className="col-sm col-12 d-flex flex-column align-items-center justify-content-center">Number: {player.player_number}</h5>  
          <h5 className="col-sm col-12 d-flex flex-column align-items-center justify-content-center">Position: {player.player_type}</h5>
        </div>
        </div>
          <table class="table table-responsive-lg" id="league-table">
          <thead>
          <tr>
              <th scope="col" className="text-center align-middle">
                Matches
              </th>
              <th scope="col" className="text-center align-middle">
                Goals
              </th>
              <th scope="col" className="text-center align-middle">
                Yellow cards
              </th>
              <th scope="col" className="text-center align-middle">
                Red cards
              </th>
            </tr>
          </thead>
          <tbody>
                <tr scope="row" key={0}>
                  <td className="text-center align-middle">{player.player_match_played}</td>
                  <td className="text-center align-middle ">{player.player_goals}</td>
                  <td className="text-center align-middle ">{player.player_yellow_cards}</td>
                  <td className="text-center align-middle ">{player.player_red_cards}</td>
                </tr>
          </tbody>
        </table>
        <img class="upcoming-img mx-2 " src={player.team_logo} alt="logo"></img>{player.team_name} 
      </div>
  );
}
