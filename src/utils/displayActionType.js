export const displayActionType = (index) => {
  let type = "No such type";
  switch (parseInt(index)) {
    case 1:
      type = "Latency";
      break;
    case 2:
      type = "Duration";
      break;
    case 3:
      type = "Frequency";
      break;
    case 4:
      type = "Rate";
      break;
    case 5:
      type = "Intervals";
      break;

    default:
      break;
  }

  return type;
};

export const displaySubType = (sub_type) => {
  if (sub_type === "1") {
    return "Partial interval";
  } else if (sub_type === "2") {
    return "Whole Interval";
  } else if (sub_type === "3") {
    return "Momentary Interval";
  }
};
