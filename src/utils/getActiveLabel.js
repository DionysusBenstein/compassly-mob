export default getActiveLabel = (index) => {
  let value = "24h";
  switch (index) {
    case 0:
      value = "24h";
      break;

    case 1:
      value = "7d";
      break;
    case 2:
      value = "14d";
      break;
    case 3:
      value = "1m";
      break;
    case 4:
      value = "3m";
      break;
    case 5:
      value = "6m";
      break;
    case 6:
      value = "all";
      break;

    default:
      value = "24h";
      break;
  }
  return value;
};
