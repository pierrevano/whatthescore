const { removeLineBreaksAndSpaces } = require("./utils");

const config = {
  firstCountrySrcSelector: "scoreboards-scoreboard-global img:nth-child(1)",
  secondCountrySrcSelector: "scoreboards-scoreboard-global img:nth-child(2)",

  firstCountryNameAltNotFoundSelector: "scoreboards-scoreboard-global .scoreboard_contestantLabel:eq(0)",
  secondCountryNameAltNotFoundSelector: "scoreboards-scoreboard-global .scoreboard_contestantLabel:eq(1)",
};

/**
 * It gets the country flags and country names of the two teams playing in a match
 * @param $ - The cheerio object.
 * @returns An object with the following properties:
 * - firstCountry
 * - secondCountry
 * - firstCountryName
 * - secondCountryName
 */
const getMatchCountries = async ($) => {
  try {
    /* Checking if the image is available or not. If it is not available, it will return a div with a
    class of sportIconBg. */
    let firstCountry;
    const firstCountrySrcSelector = config.firstCountrySrcSelector;
    const firstCountrySrc = $(firstCountrySrcSelector).attr("src");
    if (typeof firstCountrySrc === "undefined") {
      firstCountry = `<div class="sportIconBg"></div>`;
    } else {
      firstCountry = `<img src="${firstCountrySrc}" />`;
    }

    let secondCountry;
    const secondCountrySrcSelector = config.secondCountrySrcSelector;
    const secondCountrySrc = $(secondCountrySrcSelector).attr("src");
    if (typeof secondCountrySrc === "undefined") {
      secondCountry = `<div class="sportIconBg"></div>`;
    } else {
      secondCountry = `<img src="${secondCountrySrc}" />`;
    }

    /* Checking if the alt attribute is available or not. If it is not available, it will get the text
    from the div with a class of scoreboard_contestantLabel. */
    let firstCountryNameAlt = $(firstCountrySrcSelector).attr("alt");
    if (typeof firstCountryNameAlt === "undefined") {
      const firstCountryNameAltNotFoundSelector = config.firstCountryNameAltNotFoundSelector;
      firstCountryNameAlt = await removeLineBreaksAndSpaces($(firstCountryNameAltNotFoundSelector).text());
    }

    let secondCountryNameAlt = $(secondCountrySrcSelector).attr("alt");
    if (typeof secondCountryNameAlt === "undefined") {
      const secondCountryNameAltNotFoundSelector = config.secondCountryNameAltNotFoundSelector;
      secondCountryNameAlt = await removeLineBreaksAndSpaces($(secondCountryNameAltNotFoundSelector).text());
    }

    const resObj = {
      firstCountry: firstCountry,
      secondCountry: secondCountry,

      firstCountryName: firstCountryNameAlt,
      secondCountryName: secondCountryNameAlt,
    };
    console.log("resObj:");
    console.log(resObj);
    console.log("--------------------");

    return resObj;
  } catch (error) {
    console.log(`getMatchCountries: ${error}`);
  }
};

module.exports = {
  getMatchCountries,
};
