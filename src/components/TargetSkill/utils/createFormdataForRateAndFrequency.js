export const createFormdataForRateAndFrequency = (
  time,
  neutral,
  wrong,
  right,
  currentBehavior,
  allTime,
  allTimeBehavior,
  initialBehavior
) => {
  return JSON.stringify({
    behavior: {
      time,
      neutral: {
        value: neutral,
        rate: neutral / (time / 60),
        percentage: neutral / currentBehavior,
      },
      wrong: {
        value: wrong,
        rate: wrong / (time / 60),
        percentage: wrong / currentBehavior,
      },
      right: {
        value: right,
        rate: right / (time / 60),
        percentage: right / currentBehavior,
      },
    },
    allTimeBehavior: {
      time: allTime,
      neutral: {
        value: initialBehavior.allTimeBehavior.neutral.value + neutral,
        percentage:
          (initialBehavior.allTimeBehavior.neutral.value + neutral) /
          allTimeBehavior,
        rate:
          (initialBehavior.allTimeBehavior.neutral.value + neutral) /
          (allTime / 60),
      },
      right: {
        value: initialBehavior.allTimeBehavior.right.value + right,
        percentage:
          (initialBehavior.allTimeBehavior.right.value + right) /
          allTimeBehavior,
        rate:
          (initialBehavior.allTimeBehavior.right.value + right) /
          (allTime / 60),
      },
      wrong: {
        value: initialBehavior.allTimeBehavior.wrong.value + wrong,
        percentage:
          (initialBehavior.allTimeBehavior.wrong.value + wrong) /
          allTimeBehavior,
        rate:
          (initialBehavior.allTimeBehavior.wrong.value + wrong) /
          (allTime / 60),
      },
    },
  });
};
