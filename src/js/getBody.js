const cheerio = require("cheerio");
const puppeteer = require("puppeteer");

const config = {
  baseUrl: "https://www.betclic.fr",

  iAgreeSelector: "#popin_tc_privacy_button_2",

  maximumSelectorToCheckForTournament: "sports-events-event",

  maximumSelectorToCheckForMatch: "sports-markets-single-market",
  maximumSelectorToCheckForMatchLength: 15,

  numberOfScroll: 6,
};

const { scrollPage } = require("./utils");

/**
 * It opens a browser, goes to the URL, clicks on the "I agree" button, scrolls down the page, and
 * waits for the maximum selector to check
 * @param sportValue - The sport type.
 * @param tournamentValue - The name of the tournament.
 * @param matchValue - The match value is the match number. For example, if you want to get the odds
 * for the first match, you can pass 1 as the match value.
 * @returns The body of the website.
 */
const getBody = async (sportValue, tournamentValue, matchValue) => {
  try {
    const baseUrl = config.baseUrl;
    const sportType = sportValue;
    const tournamentName = tournamentValue;
    const match = matchValue;

    let URL;
    if (typeof match === "undefined") {
      URL = `${baseUrl}/${sportType}/${tournamentName}`;
    } else {
      URL = `${baseUrl}/${sportType}/${tournamentName}/${match}`;
    }
    console.log("URL:");
    console.log(URL);
    console.log("--------------------");

    /* Opening a browser and going to the URL. */
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
    });
    const page = await browser.newPage();
    await page.goto(URL, {
      waitUntil: "networkidle0",
    });

    /* Clicking on the "I agree" button on the website. */
    const iAgreeSelector = config.iAgreeSelector;
    await page.waitForSelector(iAgreeSelector);
    await page.click(iAgreeSelector);

    /* Scrolling down the page and waiting for the maximum selector to check. */
    const numberOfScroll = config.numberOfScroll;
    await scrollPage(page, numberOfScroll);

    let maximumSelectorToCheck;
    if (typeof match === "undefined") {
      maximumSelectorToCheck = config.maximumSelectorToCheckForTournament;
    } else {
      const maximumSelectorToCheckForMatch = config.maximumSelectorToCheckForMatch;
      const maximumSelectorToCheckLength = config.maximumSelectorToCheckForMatchLength;
      maximumSelectorToCheck = `${maximumSelectorToCheckForMatch}:nth-of-type(${maximumSelectorToCheckLength})`;
    }

    await page.waitForSelector(maximumSelectorToCheck);

    const html = await page.content();
    const body = cheerio.load(html);

    await browser.close();

    return body;
  } catch (error) {
    console.log(`getBody: ${error}`);
  }
};

module.exports = {
  getBody,
};
