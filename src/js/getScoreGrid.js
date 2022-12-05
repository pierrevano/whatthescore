const { getLeadingScore } = require("./getLeadingScore");
const { removeLineBreaksAndSpaces } = require("./utils");

const config = {
  maximumSelectorNumberToGet: 17,
};

/**
 * It gets the score grid of the match
 * @param $ - the cheerio object
 * @returns An object with the score grid value and the time lapsed.
 */
const getScoreGrid = async ($) => {
  try {
    let number = config.maximumSelectorNumberToGet;
    let scoreGridRawText = $(`sports-markets-single-market:nth-of-type(${number})`).text();

    let scoreGridTextCleaned = await removeLineBreaksAndSpaces(scoreGridRawText);
    console.log("scoreGridTextCleaned:");
    console.log(scoreGridTextCleaned);
    console.log("--------------------");

    /* Checking if the string `scoreGridTextCleaned` contains the string `Scoreexact` followed by a number. */
    let scoreGridTextCleanedFound = /Scoreexact[0-9]/.test(scoreGridTextCleaned);
    while (!scoreGridTextCleanedFound) {
      /* Getting the score grid of the match. */
      let scoreGridRawText = $(`sports-markets-single-market:nth-of-type(${number})`).text();

      /* Removing the line breaks and spaces from the string `scoreGridRawText`. */
      scoreGridTextCleaned = await removeLineBreaksAndSpaces(scoreGridRawText);
      console.log("scoreGridTextCleaned:");
      console.log(scoreGridTextCleaned);
      console.log("--------------------");

      /* Checking if the string `scoreGridTextCleaned` contains the string `Scoreexact` followed by a number. */
      scoreGridTextCleanedFound = /Scoreexact[0-9]/.test(scoreGridTextCleaned);
      console.log("scoreGridTextCleanedFound:");
      console.log(scoreGridTextCleanedFound);
      console.log("--------------------");

      number--;

      if (number < 0) {
        break;
      }
    }

    const scoreGridText = scoreGridTextCleaned
      .replace("Scoreexact", "")
      .replace(/[0-9]-[0-9]|[0-9],[0-9][0-9]/gi, "$&;")
      .replace(/[0-9];[0-9][0-9]/gi, "$&;");
    console.log("scoreGridText:");
    console.log(scoreGridText);
    console.log("--------------------");

    /* Splitting the string into an array of strings. */
    const scoreGridTextArray = scoreGridText.split(";");
    console.log("scoreGridTextArray:");
    console.log(scoreGridTextArray);
    console.log("--------------------");

    /* Getting the odds of the score grid. */
    const scores = scoreGridTextArray
      .filter((_a, i) => i % 2 === 1)
      .map((x) => x.replace(",", "."))
      .map((x) => parseFloat(x));
    console.log("scores:");
    console.log(scores);
    console.log("--------------------");

    /* Getting the minimum value of the array of odds. */
    const minScoreRaw = Math.min(...scores)
      .toFixed(2)
      .toString();
    console.log("minScoreRaw:");
    console.log(minScoreRaw);
    console.log("--------------------");

    /* Getting the index of the minimum score in the array of scores. */
    const minScore = minScoreRaw.replace(".", ",");
    const indexMinScore = scoreGridTextArray.indexOf(minScore);
    console.log("scoreGridTextArray[indexMinScore - 1]:");
    console.log(scoreGridTextArray[indexMinScore - 1]);
    console.log("--------------------");

    /* Getting the score of the match. */
    const firstRes = scoreGridTextArray[indexMinScore - 1][0];
    const secondRes = scoreGridTextArray[indexMinScore - 1][2];
    const scoreGrid = await getLeadingScore(firstRes, secondRes);

    const resObj = {
      scoreGridValue: scoreGrid,
      timeLapsed: "",
    };
    console.log("resObj:");
    console.log(resObj);
    console.log("--------------------");

    return resObj;
  } catch (error) {
    console.log(`getScoreGrid: ${error}`);
  }
};

module.exports = {
  getScoreGrid,
};
