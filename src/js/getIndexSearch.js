const getIndexSearch = async () => {
  try {
    const index = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>What the score?</title>
          <link rel="stylesheet" href="css/style-search.css">
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body>
          <form method="GET" action="getInput" class="search-container">
            <input
              type="text"
              name="link"
              id="search-bar"
              placeholder="Please enter a Betclic.fr match link."
              title="Example: https://www.betclic.fr/football-s1/coupe-du-monde-2022-c1/angleterre-france-m3001627841"
              required pattern="https://.*"
            />
            <a href="#"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></a>
          </form>
        </body>
      </html>
    `;
    return index;
  } catch (error) {
    console.log(`getIndexSearch: ${error}`);
  }
};

module.exports = {
  getIndexSearch,
};
