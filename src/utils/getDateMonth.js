const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUNE",
  "JULY",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default getDateMonth = (date) => {
  let dateArr = date.split(".");

  return dateArr[0] + " " + monthNames[parseInt(dateArr[1])];
};
