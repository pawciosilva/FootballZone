import axios from "axios";

const instance = axios.create({
  baseURL: "https://allsportsapi.com/api/football/",
});

instance.interceptors.request.use((config) => {
  config.params["APIkey"] = "fd79d9ecc12193219db435b6f6e057a611f87a3633dafe7111ab10e2ab010d32";
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

export const getLiveScores = ({ countryId, leagueId, matchId } = {}) => {
  const params = { met: "Livescore" };
  if (countryId) {
    params.countryId = countryId;
  }
  if (leagueId) {
    params.leagueId = leagueId;
  }
  if (matchId) {
    params.matchId = matchId;
  }
  return instance.get("", { params });
};

export const getFixtures = ({
  startDate,
  endDate = new Date(),
  countryId,
  leagueId,
  matchId,
  teamId,
}) => {
  const params = { met: "Fixtures" };
  if (matchId) {
    params.matchId = matchId;
    return instance.get("", { params });
  }
  const isOtherParams = countryId && leagueId && teamId;
  const { from, to } = getDateParams(startDate, endDate, isOtherParams);

  params.from = from;
  params.to = to;

  if (countryId) {
    params.countryId = countryId;
  }
  if (leagueId) {
    params.leagueId = leagueId;
  }
  if (teamId) {
    params.teamId = teamId;
  }

  return instance.get("", { params });
};

export const getTeamComparison = (firstTeamId, secondTeamId) => {
  const params = { met: "H2H" };
  params.firstTeamId = firstTeamId;
  params.secondTeamId = secondTeamId;
  return instance.get("", { params });
};

const getDateParams = (startDate, endDate, isOtherParams) => {
  if (!startDate) {
    throw new Error("StartDate must be specified");
  }
  if (startDate > endDate) {
    throw new Error("StartDate cannot occur later than endDate");
  }
  if (!isOtherParams) {
    const difference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.round(difference / (1000 * 3600 * 24));
    if (daysDifference > 15) {
      throw new Error(
        "If there are no other parameters specified, date range must be less than 15 days"
      );
    }
  }
  return { from: formatDate(startDate), to: formatDate(endDate) };
};
const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
