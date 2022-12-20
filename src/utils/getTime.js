export const getTime = (time, format = "default") => {
  var sec_num = time; // don't forget the second param
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10 && format === "default") {
    hours = "0" + hours;
  }
  if (minutes < 10 && format === "default") {
    minutes = "0" + minutes;
  }
  if (seconds < 10 && format === "default") {
    seconds = "0" + parseInt(seconds);
  }

  return format === "default"
    ? (hours !== "00" ? hours + "+ " : "") + minutes + ":" + seconds
    : `${
        (hours ? hours + "h " : "") + minutes + "m " + parseInt(seconds) + "s"
      }`;
};
