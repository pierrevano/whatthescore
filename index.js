/* Importing the performance and express modules and creating an express app. */
const { performance } = require("perf_hooks");
const express = require("express");
const app = express();

const config = {
  hostnameDev: "http://localhost:3000",
  hostnameProd: "https://what-the-score.osc-fr1.scalingo.io",
};

/* Importing the functions from the files. */
const { getAllMatchsLinks } = require("./src/js/getAllMatchsLinks");
const { getBody } = require("./src/js/getBody");
const { getIndex } = require("./src/js/getIndex");
const { getIndexLoading } = require("./src/js/getIndexLoading");
const { getIndexNotSupported } = require("./src/js/getIndexNotSupported");
const { getIndexSearch } = require("./src/js/getIndexSearch");
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

    let index;
    if (sportValue && tournamentValue && matchValue) {
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

      index = await getIndex(allMatchsLinks, matchCountries, matchDateAndHour, scoreGrid);
    } else {
      index = await getIndexSearch();
    }

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

/* Creating a route for the search page. */
app.get("/search", async (req, res) => {
  const link = req.query.link;
  const linkArray = link.split("/");

  let index;
  const sportValue = linkArray[3];
  if (!sportValue.startsWith("football")) {
    index = await getIndexNotSupported();
  } else {
    const tournamentValue = linkArray[4];
    const matchValue = linkArray[5];
    const dev = linkArray[6];

    let hostname;
    if (dev === "dev") {
      hostname = config.hostnameDev;
    } else {
      hostname = config.hostnameProd;
    }

    index = await getIndexLoading(hostname, sportValue, tournamentValue, matchValue);
  }

  res.send(index);
});

/* Creating a server that listens on port 3000. */
app.listen(process.env.PORT || 3000, () => {
  console.log("server running on http://localhost:3000/", "");
});
