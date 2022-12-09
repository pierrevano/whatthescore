const config = {
  loadingMessage: "Betclic.fr data is currently loading",
};

/**
 * It returns an HTML page with a loading animation
 * @param hostname - the hostname of the website
 * @param sportValue - the sport you want to display
 * @param tournamentValue - the tournament's name
 * @param matchValue - the match id
 * @returns The index.html file is being returned.
 */
const getIndexLoading = async (hostname, sportValue, tournamentValue, matchValue) => {
  try {
    const loadingMessage = config.loadingMessage;
    const index = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>What the score?</title>
          <link rel="stylesheet" href="css/style-loading.css">
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
          <meta http-equiv="refresh" content="0;URL=${hostname}?sport=${sportValue}&tournament=${tournamentValue}&match=${matchValue}">
        </head>
        <body>
          <div class="loader">
            ${loadingMessage}<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span>
          </div>
        </body>
      </html>
    `;
    return index;
  } catch (error) {
    console.log(`getIndexLoading: ${error}`);
  }
};

module.exports = {
  getIndexLoading,
};
