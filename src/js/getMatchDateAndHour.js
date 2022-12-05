const { removeLineBreaksAndSpaces } = require("./utils");
const { getMatchDateAndHourDiv } = require("./getMatchDateAndHourDiv");

const config = {
  matchDateSelector: ".scoreboard_date",
  matchHourSelector: ".scoreboard_hour",
};

/**
 * It gets the match date and hour from the page and returns them in a div
 * @param $ - The cheerio object.
 * @returns An object with a property called matchDateAndHourValue.
 */
const getMatchDateAndHour = async ($) => {
  try {
    /* Getting the match date and hour from the page. */
    const matchDateSelector = config.matchDateSelector;
    const matchDate = await removeLineBreaksAndSpaces($(matchDateSelector).text());

    const matchHourSelector = config.matchHourSelector;
    const matchHour = await removeLineBreaksAndSpaces($(matchHourSelector).text());

    const matchDateAndHour = await getMatchDateAndHourDiv(matchDate, matchHour);

    const resObj = {
      matchDateAndHourValue: matchDateAndHour,
    };
    console.log("resObj:");
    console.log(resObj);
    console.log("--------------------");

    return resObj;
  } catch (error) {
    console.log(`getMatchDateAndHour: ${error}`);
  }
};

module.exports = {
  getMatchDateAndHour,
};
