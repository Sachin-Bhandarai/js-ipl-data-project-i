import fs from "fs";
import { matches } from "./data.js";
import { deliveries } from "./data.js";
export function printExtraRunsConcededPerTeamIn2016() {
  const idAndSeason = new Map();
  const teamAndExtraRuns = new Map();
  matches.forEach((match) => {
    const { id, season } = match;
    if (season == "2016" && !idAndSeason.get(id)) {
      idAndSeason.set(id, season);
    }
  });
  deliveries.forEach((delivery) => {
    let { matchId, bowlingTeam, extraRuns } = delivery;
    extraRuns = parseInt(extraRuns);
    if (typeof idAndSeason.get(matchId) !== "undefined") {
      teamAndExtraRuns.set(
        bowlingTeam,
        teamAndExtraRuns.get(bowlingTeam) + extraRuns || extraRuns
      );
    }
  });
  const teamAndExtraRunsObject = Object.fromEntries(teamAndExtraRuns);
  fs.writeFile(
    "../public/output/extraRunsPerTeamIn2016.json",
    JSON.stringify(teamAndExtraRunsObject),
    (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    }
  );
  //   console.log(JSON.stringify(teamAndExtraRunsObject));
}
