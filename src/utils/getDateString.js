export const getDateString = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return `${day}.${month}.${year}`;
};
