const fs = require("fs");
const MATCH_ID = 0;
const MATCH_SEASON = 1;
const MATCH_CITY = 2;
const MATCH_DATE = 3;
const MATCH_TEAM1 = 4;
const MATCH_TEAM2 = 5;
const MATCH_TOSS_WINNER = 6;
const MATCH_TOSS_DECISION = 7;
const MATCH_RESULT = 8;
const MATCH_WINNER = 10;
const MATCH_WIN_BY_RUNS = 11;
const MATCH_WIN_BY_WICKETS = 12;
const DELIVERY_MATCH_ID = 0;
const DELIVERY_INNING = 1;
const DELIVERY_BATTING_TEAM = 2;
const DELIVERY_BOWLING_TEAM = 3;
const DELIVERY_OVER = 4;
const DELIVERY_BALL = 5;
const DELIVERY_BATSMAN = 6;
const DELIVERY_NON_STRIKER = 7;
const DELIVERY_BOWLER = 8;
const DELIVERY_IS_SUPER_OVER = 9;
const DELIVERY_WIDE_RUNS = 10;
const DELIVERY_BYE_RUNS = 11;
const DELIVERY_LEG_BYE_RUNS = 12;
const DELIVERY_NO_BALL_RUNS = 13;
const DELIVERY_PENALTY_RUNS = 14;
const DELIVERY_BATSMAN_RUNS = 15;
const DELIVERY_EXTRA_RUNS = 16;
const DELIVERY_TOTAL_RUNS = 17;
const DELIVERY_PLAYER_DISMISSED = 18;
const DELIVERY_DISMISSAL_KIND = 19;
const DELIVERY_FIELDER = 20;

export const matches = [];
export const deliveries = [];
const readMatchData = () => {
  let matchData = fs
    .readFileSync("../data/matches.csv", { encoding: "utf8", flag: "r" })
    .toString();
  matchData = matchData.split("\n");
  matchData.shift();
  matchData.forEach((row) => {
    const match = {};
    const singlerow = row.split(",");
    match.id = singlerow[MATCH_ID];
    match.season = singlerow[MATCH_SEASON];
    match.city = singlerow[MATCH_CITY];
    match.team1 = singlerow[MATCH_TEAM1];
    match.team2 = singlerow[MATCH_TEAM2];
    match.winner = singlerow[MATCH_WINNER];
    match.result = singlerow[MATCH_RESULT];
    matches.push(match);
  });
  matches.pop();
};
const readDeliveryData = () => {
  let matchData = fs
    .readFileSync("../data/deliveries.csv", { encoding: "utf8", flag: "r" })
    .toString();
  matchData = matchData.split("\n");
  matchData.shift();
  matchData.forEach((row) => {
    const delivery = {};
    const singlerow = row.split(",");
    delivery.matchId = singlerow[DELIVERY_MATCH_ID];
    delivery.inning = singlerow[DELIVERY_INNING];
    delivery.battingTeam = singlerow[DELIVERY_BATTING_TEAM];
    delivery.bowlingTeam = singlerow[DELIVERY_BOWLING_TEAM];
    delivery.over = singlerow[DELIVERY_OVER];
    delivery.ball = singlerow[DELIVERY_BALL];
    delivery.bowler = singlerow[DELIVERY_BOWLER];
    delivery.wideRuns = singlerow[DELIVERY_WIDE_RUNS];
    delivery.byeRuns = singlerow[DELIVERY_BYE_RUNS];
    delivery.legByeRuns = singlerow[DELIVERY_LEG_BYE_RUNS];
    delivery.noBallRuns = singlerow[DELIVERY_NO_BALL_RUNS];
    delivery.penaltyRuns = singlerow[DELIVERY_PENALTY_RUNS];
    delivery.batsManRuns = singlerow[DELIVERY_BATSMAN_RUNS];
    delivery.extraRuns = singlerow[DELIVERY_EXTRA_RUNS];
    deliveries.push(delivery);
  });
  deliveries.pop();
};
