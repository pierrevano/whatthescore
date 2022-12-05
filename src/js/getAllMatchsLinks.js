const config = {
  hostnameDev: "http://localhost:3000",
  hostnameProd: "https://what-the-score.osc-fr1.scalingo.io",

  allMatchsSelector: "sports-events-event scoreboards-scoreboard .scoreboard_contestant",
  allMatchsLinksSelector: "sports-events-event a",

  allMatchsH3: "<h3>Next matchs:</h3>",
};

const { getBody } = require("./getBody");

/**
 * It's getting all the matchs values and links
 * @param dev - It's a boolean value that indicates if the app is running in development mode or not.
 * @param sportValue - The sport value.
 * @param tournamentValue - It's the tournament value.
 * @returns It's returning all the matchs values.
 */
const getAllMatchsLinks = async (dev, sportValue, tournamentValue) => {
  try {
    const $ = await getBody(sportValue, tournamentValue);

    const allMatchsSelector = config.allMatchsSelector;
    const allMatchsSelectorValue = $(allMatchsSelector);

    const allMatchsLinksSelector = config.allMatchsLinksSelector;
    const allMatchsLinksSelectorValue = $(allMatchsLinksSelector);

    /* It's getting all the matchs values. */
    const allMatchsArray = [];
    allMatchsSelectorValue.each((_index, element) => {
      const matchText = $(element).text().split("\n").join("").split(" ").join("");
      allMatchsArray.push(matchText);
    });

    /* It's getting the first and second matchs values. */
    const firstMatchs = allMatchsArray.filter((_index, element) => element % 2 === 0);
    const secondMatchs = allMatchsArray.filter((_index, element) => element % 2 === 1);

    const allMatchsValues = {
      firstMatchsValues: firstMatchs,
      secondMatchsValues: secondMatchs,
      allMatchsSelectorHrefValues: [],
    };
    console.log("allMatchsValues:");
    console.log(allMatchsValues);
    console.log("--------------------");

    const allMatchsSelectorHrefArray = [];
    allMatchsLinksSelectorValue.each((_index, element) => {
      const allMatchsSelectorHrefValue = $(element).attr("href").split("/");
      const allMatchsSelectorHrefValueParams = {
        sport: allMatchsSelectorHrefValue[1],
        tournament: allMatchsSelectorHrefValue[2],
        match: allMatchsSelectorHrefValue[3],
      };
      allMatchsSelectorHrefArray.push(allMatchsSelectorHrefValueParams);
    });
    console.log("allMatchsSelectorHrefArray:");
    console.log(allMatchsSelectorHrefArray);
    console.log("--------------------");

    allMatchsValues.allMatchsSelectorHrefValues = allMatchsSelectorHrefArray;

    let hostname;
    if (dev === "true") {
      hostname = config.hostnameDev;
    } else {
      hostname = config.hostnameProd;
    }

    const firstMatchsValues = allMatchsValues.firstMatchsValues;
    const secondMatchsValues = allMatchsValues.secondMatchsValues;
    const allMatchsSelectorHrefValues = allMatchsValues.allMatchsSelectorHrefValues;

    let allMatchs = config.allMatchsH3;
    for (let index = 0; index < firstMatchsValues.length; index++) {
      const firstMatchsValue = firstMatchsValues[index];
      const secondMatchsValue = secondMatchsValues[index];
      const allMatchsSelectorHrefValue = allMatchsSelectorHrefValues[index];

      if (dev === "true") {
        allMatchs += `
          <p>
            <a href="${hostname}?sport=${allMatchsSelectorHrefValue.sport}&tournament=${allMatchsSelectorHrefValue.tournament}&match=${allMatchsSelectorHrefValue.match}&dev=true">${firstMatchsValue} - ${secondMatchsValue}</a>
          </p>
        `;
      } else {
        allMatchs += `
          <p>
            <a href="${hostname}?sport=${allMatchsSelectorHrefValue.sport}&tournament=${allMatchsSelectorHrefValue.tournament}&match=${allMatchsSelectorHrefValue.match}">${firstMatchsValue} - ${secondMatchsValue}</a>
          </p>
        `;
      }
    }

    return allMatchs;
  } catch (error) {
    console.log(`getAllMatchsLinks: ${error}`);
  }
};

module.exports = {
  getAllMatchsLinks,
};
