import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getPlayerDetails } from "../../api";
import HashLoader from "react-spinners/HashLoader";

export default function PlayersStatistics() {
  const [loading, setLoading] = useState(true);
  const [player, setPlayer] = useState([]);
  const location = useLocation();

  let playerId = location.pathname.split("/").slice(-1)[0];

  useEffect(() => {
    getPlayerDetails(playerId).then((player) => {
      if (player.length > 1) {
        setPlayer(player[1]);
        setLoading(false);
      } else {
        setPlayer(player);
        setLoading(false);
      }
    });
  }, [playerId]);

  return (
    <div className="container my-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">
          {loading ? (
            <HashLoader color={"#4e80b4"} />
          ) : (
            <>
              <div id="headerPlayer">
                <div className="row align-items-center mb-5">
                  <h5 className="col-sm col-12 d-flex flex-column align-items-center justify-content-center">
                    {player.player_name}
                  </h5>
                  <h5 className="col-sm col-12 d-flex flex-column align-items-center justify-content-center">
                    Number: {player.player_number}
                  </h5>
                  <h5 className="col-sm col-12 d-flex flex-column align-items-center justify-content-center">
                    Position: {player.player_type}
                  </h5>
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
                    <td className="text-center align-middle">
                      {player.player_match_played}
                    </td>
                    <td className="text-center align-middle ">
                      {player.player_goals}
                    </td>
                    <td className="text-center align-middle ">
                      {player.player_yellow_cards}
                    </td>
                    <td className="text-center align-middle ">
                      {player.player_red_cards}
                    </td>
                  </tr>
                </tbody>
              </table>
              <img
                class="upcoming-img mx-2 "
                src={player.team_logo}
                alt="logo"
              ></img>
              {player.team_name}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
