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

  //console.log(player);

  return (
    <>
      <div className="container my-5 px-0">
          <h4>{player.player_name}</h4>  
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
                Assists
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
                  <td className="text-center align-middle ">{player.player_assists}</td>
                  <td className="text-center align-middle ">{player.player_yellow_cards}</td>
                  <td className="text-center align-middle ">{player.player_red_cards}</td>
                </tr>
          </tbody>
        </table>
          <h5>{player.team_name}</h5>  
          <p>Position: {player.player_type}</p>
      </div>
    </>
  );
}
