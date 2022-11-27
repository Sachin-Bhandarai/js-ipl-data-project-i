import fs from "fs";
import { matches } from "./data.js";
export function printPerSeasonWinByEachTeam() {
  const perYearWin = [];
  const seasons = new Set();
  matches.forEach((match) => {
    const { id, season } = match;
    seasons.add(season);
  });
  seasons.forEach((season) => {
    const teamAndWins = new Map();
    matches.forEach((match) => {
      const { winner } = match;
      if (match.season == season) {
        teamAndWins.set(winner, teamAndWins.get(winner) + 1 || 1);
      }
    });
    const key = season;
    const element = {};
    element[season] = Object.fromEntries(teamAndWins);
    perYearWin.push(element);
  });
  const perYearWinObject = Object.assign({}, perYearWin);
  fs.writeFile(
    "../public/output/perSeasonsWinByEachTeam.json",
    JSON.stringify(perYearWinObject),
    (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    }
  );
}