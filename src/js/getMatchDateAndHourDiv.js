/**
 * It returns a string that contains the match date and hour
 * @param matchDate - The date of the match.
 * @param matchHour - The hour of the match.
 * @returns A string with the date and hour of the match.
 */
const getMatchDateAndHourDiv = async (matchDate, matchHour) => {
  try {
    if (matchDate === "Demain") {
      matchDate = "Tomorrow";
    } else if (matchDate === "Après-demain") {
      matchDate = "After tomorrow";
    }

    let matchDateAndHour;
    if (matchDate !== "" && matchHour !== "") {
      matchDateAndHour = `<i>Forecast</i><br />${matchDate} at <strong>${matchHour}</strong></p>`;
    } else if (matchDate === "" && matchHour !== "") {
      matchDateAndHour = `<i>Forecast</i><br />Today at <strong>${matchHour}</strong>`;
    } else {
      matchDateAndHour = "Live score!";
    }
    return matchDateAndHour;
  } catch (error) {
    console.log(`getMatchDateAndHourDiv: ${error}`);
  }
};

module.exports = {
  getMatchDateAndHourDiv,
};
