const initBeh = {
  allTimeBehavior: {
    time: 0,
    neutral: {
      value: 0,
      rate: 0,
      percentage: 0,
    },
    wrong: {
      value: 0,
      rate: 0,
      percentage: 0,
    },
    right: {
      value: 0,
      rate: 0,
      percentage: 0,
    },
  },
  behavior: {
    time: 0,
    neutral: {
      value: 0,
      rate: 0,
      percentage: 0,
    },
    wrong: {
      value: 0,
      rate: 0,
      percentage: 0,
    },
    right: {
      value: 0,
      rate: 0,
      percentage: 0,
    },
  },
};

const initialModalState = {
  text: "",
  confirmText: "",
  confirmGradient: "",
  cancelText: "",
  cancelColor: "",
  confirmAction: () => {},
  cancelAction: () => {},
  closeModal: () => {},
  show: false,
};

const clockTypes = {
  WATCH: "watch",
  TIMER: "timer",
};

const skillTypes = {
  TYPE_1: "1", // latency
  TYPE_2: "2", // durantion
  TYPE_3: "3", // frequency
  TYPE_4: "4", // rate
  TYPE_5: "5", // intervals
};

const initialTimerTime = 300;
const notifyTimerTime = 300;

const subtypeText = {
  SUBTYPE_1: "Did the behavior happen?",
  SUBTYPE_2: "Did the behavior last the whole interval",
  SUBTYPE_3:
    "Did the behavior happened at the moment you obderved the individual?",
};

export {
  initBeh,
  notifyTimerTime,
  initialTimerTime,
  subtypeText,
  skillTypes,
  clockTypes,
  initialModalState,
};
