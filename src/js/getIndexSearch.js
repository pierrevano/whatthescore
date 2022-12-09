const config = {
  pattern: "https://(www.|m.)?betclic.fr.*",
  placeholder: "Please enter a Betclic.fr match link.",
  title: "Example: https://www.betclic.fr/football-s1/coupe-du-monde-2022-c1/angleterre-france-m3001627841",
};

/**
 * It returns the HTML code of the search page.
 * @returns A string.
 */
const getIndexSearch = async () => {
  try {
    const pattern = config.pattern;
    const placeholder = config.placeholder;
    const title = config.title;
    const index = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>What the score?</title>
          <link rel="stylesheet" href="css/style-search.css">
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </head>
        <body>
          <div class="menusearch">
            <form action="/search" class="searchform" method="get">
              <input
                autocomplete="off"
                autofocus
                class="searchfield"
                name="link"
                pattern="${pattern}"
                placeholder="${placeholder}"
                required title="${title}"
                type="text"
              />
              <a href="javascript:void(0);" onclick="document.querySelector('.searchform').submit();">
                <span class="search-icon"></span>
              </a>
            </form>
          </div>
          <div>
            <ul class="button-search"></ul>
          </div>
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
