export default function changeTimeFormat(hour) {
  return toTwelweHour(hour) + " - " + toTwelweHour(hour + 1);
}

export const toTwelweHour = (hour, minute = null) => {
  let hr = parseInt(hour);
  let mt = minute !== null ? parseInt(minute) : null;
  if (hr > 12) {
    return (
      displayTimeString(hour - 12) +
      `${mt !== null ? ":" + displayTimeString(mt) : ""} PM`
    );
  } else {
    return (
      displayTimeString(hour) +
      `${mt !== null ? ":" + displayTimeString(mt) : ""} AM`
    );
  }
};

export const splitTime = (time) => {
  let timeArr = time.split(":");
  return toTwelweHour(timeArr[0], timeArr[1]);
};

const displayTimeString = (time) => {
  if (parseInt(time) < 10) {
    return "0" + parseInt(time);
  } else {
    return parseInt(time);
  }
};
