import fs from "fs";
import { matches } from "./data.js";
import { deliveries } from "./data.js";
export function printTop10EconomicalBowlersIn2015() {
  const idAndSeason = new Map();
  const bowlerAndRuns = new Map();
  const bowlerAndBalls = new Map();
  matches.forEach((match) => {
    const { id, season } = match;
    if (season == "2015" && !idAndSeason.get(id)) {
      idAndSeason.set(id, season);
    }
  });
  deliveries.forEach((delivery) => {
    let { matchId, bowler, batsManRuns, wideRuns, noBallRuns } = delivery;
    batsManRuns = parseInt(batsManRuns);
    wideRuns = parseInt(wideRuns);
    noBallRuns = parseInt(noBallRuns);
    let ballsToAdd = 0;
    if (wideRuns + noBallRuns == 0) {
      ballsToAdd = 1;
    }
    if (typeof idAndSeason.get(matchId) !== "undefined") {
      const runsToAdd = wideRuns + batsManRuns + noBallRuns;
      bowlerAndRuns.set(
        bowler,
        bowlerAndRuns.get(bowler) + runsToAdd || runsToAdd
      );
      bowlerAndBalls.set(
        bowler,
        bowlerAndBalls.get(bowler) + ballsToAdd || ballsToAdd
      );
    }
  });
  let leastEconomy = 1000;
  let economicBowlerName = null;
  let economy = 0;
  const top10BowlersAndRuns = new Map();
  bowlerAndRuns.forEach((values, bowler) => {
    const balls = bowlerAndBalls.get(bowler);
    const runs = parseInt(bowlerAndRuns.get(bowler));
    economy = (runs * 6.0) / balls;
    if (economy < leastEconomy) {
      economicBowlerName = bowler;
      leastEconomy = economy;
    }
    top10BowlersAndRuns.set(bowler, economy);
  });
  //const mapSort1 = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));

  const top10BowlerInSortedOrder = new Map([...top10BowlersAndRuns.entries()].sort((a, b) => a[1] - b[1]));
  let top10Bowlers = Array.from(top10BowlerInSortedOrder).slice(0, 10);
  top10Bowlers = Object.assign({}, top10Bowlers);
  fs.writeFile(
    "../public/output/top10BowlersIn2015.json",
    JSON.stringify(top10Bowlers),
    (err) => {
      if (err) {
        console.log("Error writing file", err);
      } else {
        console.log("Successfully wrote file");
      }
    }
  );

  
}
