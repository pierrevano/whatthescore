/* Importing the performance and express modules and creating an express app. */
const { performance } = require("perf_hooks");
const express = require("express");
const app = express();

/* Importing the functions from the files. */
const { getAllMatchsLinks } = require("./src/js/getAllMatchsLinks");
const { getBody } = require("./src/js/getBody");
const { getIndex } = require("./src/js/getIndex");
const { getLiveScore } = require("./src/js/getLiveScore");
const { getMatchCountries } = require("./src/js/getMatchCountries");
const { getMatchDateAndHour } = require("./src/js/getMatchDateAndHour");
const { getScoreGrid } = require("./src/js/getScoreGrid");

/**
 * It gets the values of the query parameters, gets the HTML body of the page, gets the score grid, the
 * match countries, the match date and hour, the live score, all the matchs links, and finally gets the
 * index
 * @param req - the request object
 * @param res - the response object.
 */
const createIndex = async (req, res) => {
  try {
    const t0 = performance.now();

    const dev = req.query.dev;

    /* Getting the values of the query parameters. */
    const sportValue = req.query.sport;
    const tournamentValue = req.query.tournament;
    const matchValue = req.query.match;
    const $ = await getBody(sportValue, tournamentValue, matchValue);

    let scoreGrid = await getScoreGrid($);
    console.log("scoreGrid:");
    console.log(scoreGrid);
    console.log("--------------------");

    const matchCountries = await getMatchCountries($);
    console.log("matchCountries:");
    console.log(matchCountries);
    console.log("--------------------");

    const matchDateAndHour = await getMatchDateAndHour($);
    console.log("matchDateAndHour:");
    console.log(matchDateAndHour);
    console.log("--------------------");

    if (typeof scoreGrid === "undefined") {
      const liveScore = await getLiveScore($);
      console.log("liveScore:");
      console.log(liveScore);
      console.log("--------------------");

      scoreGrid = liveScore;
    }

    const allMatchsLinks = await getAllMatchsLinks(dev, sportValue, tournamentValue);

    const index = await getIndex(allMatchsLinks, matchCountries, matchDateAndHour, scoreGrid);
    res.send(index);

    const t1 = performance.now();

    console.log(`HTML rendering took ${t1 - t0} milliseconds.`);
  } catch (error) {
    console.log(`createIndex: ${error}`);
  }
};

/* Telling the server to use the src folder as the static folder. */
app.use(express.static("src"));

/* Creating a route for the root of the website. */
app.get("/", (req, res) => {
  createIndex(req, res);
});

/* Creating a server that listens on port 3000. */
app.listen(process.env.PORT || 3000, () => {
  console.log("server running on http://localhost:3000/", "");
});
