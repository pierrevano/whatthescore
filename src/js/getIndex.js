/**
 * It returns a string that contains the HTML code of the index page
 * @param allMatchsLinks - This is the list of all the matches that are currently being played.
 * @param matchCountries - an object with the first and second country's name and flag.
 * @param matchDateAndHour - This is the date and hour of the match.
 * @param scoreGrid - This is the score grid that is displayed on the page.
 * @returns A string with the html code.
 */
const getIndex = async (allMatchsLinks, matchCountries, matchDateAndHour, scoreGrid) => {
  try {
    const index = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>What the score?</title>
          <link rel="stylesheet" href="css/style.css">
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <div class="container">
            <div class="match">
              <div class="match-content">
                <div class="column">
                  <div class="team team--home">
                    <div class="team-logo">
                      ${matchCountries.secondCountry}
                    </div>
                    <h2 class="team-name">${matchCountries.secondCountryName}</h2>
                  </div>
                </div>
                <div class="column">
                  <div class="match-details">
                    <div class="match-date">${matchDateAndHour.matchDateAndHourValue}</div>
                    <div class="match-score">${scoreGrid.scoreGridValue}</div>
                    <div class="match-time-lapsed">${scoreGrid.timeLapsed}</div>
                  </div>
                </div>
                <div class="column">
                  <div class="team team--away">
                    <div class="team-logo">
                      ${matchCountries.firstCountry}
                    </div>
                    <h2 class="team-name">${matchCountries.firstCountryName}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div class="containerLinks">${allMatchsLinks}</div>
          </div>
        </body>
      </html>
    `;
    return index;
  } catch (error) {
    console.log(`getIndex: ${error}`);
  }
};

module.exports = {
  getIndex,
};
