/**
 * It takes a string, removes all line breaks and spaces, and returns a new string
 * @param string - The string to be cleaned.
 * @returns A promise that resolves to a string with no line breaks or spaces.
 */
const removeLineBreaksAndSpaces = async (string) => {
  try {
    const stringCleaned = string.split("\n").join("").split(" ").join("");
    return new Promise((resolve) => resolve(stringCleaned));
  } catch (error) {
    console.log(`removeLineBreaksAndSpaces: ${error}`);
  }
};

/**
 * It presses the PageDown key on the keyboard of the page object
 * @param page - the page object from puppeteer
 * @param maxNumberOfScroll - The number of times you want to scroll down the page.
 */
const scrollPage = async (page, maxNumberOfScroll) => {
  try {
    for (let index = 0; index < maxNumberOfScroll; index++) {
      await page.keyboard.press("PageDown");
    }
  } catch (error) {
    console.log(`scrollPage: ${error}`);
  }
};

module.exports = {
  removeLineBreaksAndSpaces,
  scrollPage,
};
