export const displayFloatNumber = (val) => {
  if (
    (typeof val === "number" && Number.isInteger(val)) ||
    typeof val === "string"
  ) {
    return val;
  } else {
    return val.toFixed(2);
    // if ((val * 100) % 10 === 0) {
    //   return val.toFixed(1);
    // } else if ((val * 1000) % 10 === 0) {
    //   return val.toFixed(2);
    // } else {
    //   return (parseInt(val * 100) + 1) / 100;
    // }
  }
};
