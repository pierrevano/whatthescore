const { getLeadingScore } = require("./getLeadingScore");
const { removeLineBreaksAndSpaces } = require("./utils");

const config = {
  liveScoreSelector: "sports-match-page sports-events-event scoreboards-scoreboard-global-scores",
  timeLapsedSelector: "sports-match-header scoreboards-timer",
};

/**
 * It gets the live score of the match, the time lapsed of the match and the leading score of the match
 * @param $ - the cheerio object.
 * @returns An object with two properties: scoreGridValue and timeLapsed.
 */
const getLiveScore = async ($) => {
  try {
    /* Getting the live score of the match. */
    const liveScoreSelector = config.liveScoreSelector;
    const liveScoreText = await removeLineBreaksAndSpaces($(liveScoreSelector).text());
    console.log("liveScoreText:");
    console.log(liveScoreText);
    console.log("--------------------");

    /* Getting the time lapsed of the match. */
    let timeLapsedText, timeLapsedTextSecondPart;

    const timeLapsedSelector = config.timeLapsedSelector;
    const timeLapsedTextRaw = await removeLineBreaksAndSpaces($(timeLapsedSelector).text());

    const timeLapsedTextFirstPartRaw = timeLapsedTextRaw.split("•")[0];
    const timeLapsedTextSecondPartRaw = timeLapsedTextRaw.split("•")[1];

    if (timeLapsedTextSecondPartRaw.includes("1èremi-temps")) {
      timeLapsedTextSecondPart = "First half-time";
    } else if (timeLapsedTextSecondPartRaw.includes("2èmemi-temps")) {
      timeLapsedTextSecondPart = "Second half-time";
    }

    timeLapsedText = `${timeLapsedTextFirstPartRaw} - ${timeLapsedTextSecondPart}`;
    console.log("timeLapsedText:");
    console.log(timeLapsedText);
    console.log("--------------------");

    /* Getting the first and second result of the match. */
    const firstRes = liveScoreText[0];
    const secondRes = liveScoreText[1];
    const scoreGrid = await getLeadingScore(firstRes, secondRes);

    const resObj = {
      scoreGridValue: scoreGrid,
      timeLapsed: timeLapsedText,
    };

    return resObj;
  } catch (error) {
    console.log(`getLiveScore: ${error}`);
  }
};

module.exports = {
  getLiveScore,
};
