const config = {
  notSupportedMessage: "New sports will soon be added. Currently we only support football matchs.",
};

/**
 * It returns a string of HTML code that will be displayed in the browser when the user tries to access
 * a page that is not supported by the app
 * @returns A string of HTML code.
 */
const getIndexNotSupported = async () => {
  try {
    const notSupportedMessage = config.notSupportedMessage;
    const index = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>What the score?</title>
          <link rel="stylesheet" href="css/style-loading.css">
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </head>
        <body>
          <div class="loader">
            ${notSupportedMessage}
          </div>
        </body>
      </html>
    `;
    return index;
  } catch (error) {
    console.log(`getIndexNotSupported: ${error}`);
  }
};

module.exports = {
  getIndexNotSupported,
};
