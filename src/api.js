import axios from "axios";

const instance = axios.create({
  baseURL: "https://allsportsapi.com/api/football/",
});

instance.interceptors.request.use((config) => {
  config.params["APIkey"] = "91cbd935641f7cac61718db466ad1874b7b30cecc93ab84e8ab0200d95a66463";
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
  const player = response.data.result.pop();

  player.team_logo = getLogoUrl(player.team_key, player.team_name);
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

    topScorer.team_logo = getLogoUrl(topScorer.team_key, topScorer.team_name);
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

export const getLiveScores = async (leagueId) => {
  const params = { met: "Livescore" };
  if (leagueId) {
    params.leagueId = leagueId;
  }
  
  const response = await instance.get("", { params });
  const data = response.data.result;
  
  data.forEach(element => {
    element.home_team_logo = getLogoUrl(element.home_team_key,element.event_home_team);
    element.away_team_logo = getLogoUrl(element.away_team_key,element.event_away_team );
  });

  return data;
}

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

export const getTeamComparison = async (firstTeamId, secondTeamId) => {
  const params = { met: "H2H" };
  params.firstTeamId = firstTeamId;
  params.secondTeamId = secondTeamId;

  const response = await instance.get("", { params });
  const data = response.data.result;

  const matches = data.H2H.map((item) => {
    item.home_team_logo = getLogoUrl(item.home_team_key, item.event_home_team);
    item.away_team_logo = getLogoUrl(item.away_team_key, item.event_away_team);
    return item;
  });

  const homeTeamName =
    data.firstTeamResults[0].home_team_key === firstTeamId
      ? data.firstTeamResults[0].event_home_team
      : data.firstTeamResults[0].event_away_team;
  const awayTeamName =
    data.secondTeamResults[0].home_team_key === secondTeamId
      ? data.secondTeamResults[0].event_home_team
      : data.secondTeamResults[0].event_away_team;

  const home_team = {
    name: homeTeamName,
    logo: getLogoUrl(firstTeamId, homeTeamName),
  };
  const away_team = {
    name: awayTeamName,
    logo: getLogoUrl(secondTeamId, awayTeamName),
  };
  const result = {
    matches,
    home_team,
    away_team,
  };
  return result;
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

 const getLogoUrl = (teamKey, teamName) => {
  const logoName = teamName.replace(/\s+/g, "-").toLowerCase();
  return `https://allsportsapi.com/logo/${teamKey}_${logoName}`;
};
