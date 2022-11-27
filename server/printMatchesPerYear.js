import { matches } from "./data.js";
import fs from "fs";
export function printMatchesPerYear() {
  const matchesAndYear = new Map();
  matches.forEach((match) => {
    const { id, season } = match;
    matchesAndYear.set(season, matchesAndYear.get(season) + 1 || 1);
  });
  const matchesAndYearObject = JSON.stringify(
    Object.fromEntries(matchesAndYear)
  );
  fs.writeFile("../public/output/matchesPerYear.json", matchesAndYearObject, (err) => {
    if (err) {
      console.log("Error writing file", err);
    } else {
      console.log("Successfully wrote file");
    }
  });
}
