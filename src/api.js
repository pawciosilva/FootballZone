import axios from "axios";

const instance = axios.create({
  baseURL: "https://allsportsapi.com/api/football/",
});

instance.interceptors.request.use((config) => {
  config.params["APIkey"] = "8bb83d3da9b2342d32b27285da51cdf470346a203963d84c0d968647032480ce";
  return config;
});

export const getCountries = () => instance.get("", { params: { met: "Countries" } });

export const getLeagues = (countryId) => {
  const params = { met: "Leagues" };
  if (countryId) {
    params.countryId = countryId;
  }
  return instance.get("", { params });
};

export const getPlayer = (playerId) => {
  const params = { met: "Players", playerId };

  return instance.get("", { params });
};

export const getPlayerDetails = async (playerId) => {
  const response = await getPlayer(playerId);
  const player = response.data.result;
  //const logoName = player.team_name.replace(/\s+/g, "-").toLowerCase();
  //player.team_logo = `https://allsportsapi.com/logo/${player.team_key}_${logoName}`;

  return player;
};

export const getTopScorersWithStats = async (leagueId) => {
  const topScorerResponse = await getTopScorers(leagueId);
  const playerIds = topScorerResponse.data.result.map((player) => player.player_key).slice(0, 20);

  const teamResponse = await getTeams(leagueId);
  const teamIds = teamResponse.data.result.map((team) => team.team_key);

  const topScorers = [];
  for (const id of playerIds) {
    const response = await getPlayer(id);
    const result = response.data.result;
    const topScorer = result.find((player) => teamIds.includes(player.team_key));
    if (!topScorer) continue;

    const logoName = topScorer.team_name.replace(/\s+/g, "-").toLowerCase();
    topScorer.team_logo = `https://allsportsapi.com/logo/${topScorer.team_key}_${logoName}`;
    topScorers.push(topScorer);
  }
  return topScorers.sort((a, b) => b.player_goals - a.player_goals);
};

const getTopScorers = (leagueId) => {
  const params = { met: "Topscorers", leagueId };

  return instance.get("", { params });
};

export const getStandings = (leagueId) => {
  const params = { met: "Standings" };
  if (leagueId) {
    params.leagueId = leagueId;
  }
  return instance.get("", { params });
};

export const getTeams = (leagueId) => {
  const params = { met: "Teams" };
  if (leagueId) {
    params.leagueId = leagueId;
  }
  return instance.get("", { params });
};

export const getLiveScores = (leagueId) => {
  const params = { met: "Livescore" };
  if (leagueId) {
    params.leagueId = leagueId;
  }

  return instance.get("", { params });
};

export const getFixtures = (
  startDate = new Date(),
  endDate = new Date(),
  // countryId,
  leagueId
  // matchId,
  // teamId,
) => {
  const params = { met: "Fixtures" };
  // if (matchId) {
  //   params.matchId = matchId;
  //   return instance.get("", { params });
  // }
  //const isOtherParams = countryId && leagueId && teamId;
  const { from, to } = getDateParams(startDate, endDate); //, isOtherParams);

  params.from = from;
  params.to = to;

  // if (countryId) {
  //   params.countryId = countryId;
  // }
  if (leagueId) {
    params.leagueId = leagueId;
  }
  // if (teamId) {
  //   params.teamId = teamId;
  // }
  console.log(params);
  return instance.get("", { params });
};

export const getTeamComparison = (firstTeamId, secondTeamId) => {
  const params = { met: "H2H" };
  params.firstTeamId = firstTeamId;
  params.secondTeamId = secondTeamId;
  return instance.get("", { params });
};
//, isOtherParams) =>
const getDateParams = (startDate, endDate) => {
  if (!startDate) {
    throw new Error("StartDate must be specified");
  }
  if (startDate > endDate) {
    throw new Error("StartDate cannot occur later than endDate");
  }
  // if (!isOtherParams) {
  //   const difference = endDate.getTime() - startDate.getTime();
  //   const daysDifference = Math.round(difference / (1000 * 3600 * 24));
  //   if (daysDifference > 15) {
  //     throw new Error(
  //       "If there are no other parameters specified, date range must be less than 15 days"
  //     );
  //   }
  // }
  return { from: formatDate(startDate), to: formatDate(endDate) };
};
const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
