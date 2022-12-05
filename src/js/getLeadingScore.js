/**
 * It takes two numbers as arguments, compares them, and returns a string of HTML
 * @param firstRes - The first team's score
 * @param secondRes - The second team's score
 * @returns A string of HTML
 */
const getLeadingScore = async (firstRes, secondRes) => {
  try {
    let scoreGrid;
    const leadingScore = Math.max(firstRes, secondRes);
    if (leadingScore == firstRes) {
      scoreGrid = `<span class="match-score-number match-score-number--leading">${firstRes}</span><span class="match-score-divider">:</span><span class="match-score-number">${secondRes}</span>`;
    } else if (leadingScore == secondRes) {
      scoreGrid = `<span class="match-score-number">${firstRes}</span><span class="match-score-divider">:</span><span class="match-score-number match-score-number--leading">${secondRes}</span>`;
    } else {
      scoreGrid = `<span class="match-score-number">${firstRes}</span><span class="match-score-divider">:</span><span class="match-score-number">${secondRes}</span>`;
    }
    return scoreGrid;
  } catch (error) {
    console.log(`getLeadingScore: ${error}`);
  }
};

module.exports = {
  getLeadingScore,
};
