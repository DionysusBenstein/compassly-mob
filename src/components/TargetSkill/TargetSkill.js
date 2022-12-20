import React, { useState, useRef, useEffect } from 'react';
import { View, Animated, Easing, Vibration } from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import { useSelector } from 'react-redux';

import { useIsFocused } from '@react-navigation/native';
import jsonrepair from 'jsonrepair';

import { post } from '../../api/post';
import { COLORS } from '../../constants';
import { useAppState } from '../../hooks/useAppState';
import ModalWrap from '../SessionModals/ModalWrap';
import SaveAttempt from '../SessionModals/SaveAttempt';
import SkillBody from './SkillBody';
import SkillButtons from './SkillButtons';
import { getStyles } from './getStyles';
import { initBeh, notifyTimerTime, initialTimerTime, clockTypes, initialModalState, skillTypes } from './targetSkillConstants';
import { subtypeText } from './targetSkillConstants';
import { createFormdataForRateAndFrequency } from './utils/createFormdataForRateAndFrequency';

function TargetSkill({
  themes,
  skill,
  opened,
  index,
  openSkill,
  client_id,
  setRunning,
  running,
  clearRunning,
  setError,
  clearError,
  client_name,
  isUserNew,
  subDomainOpened,
}) {
  // if swipe button is opened
  const [itemOpened, setItemOpened] = useState(opened);
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(0);
  // type of dcm
  const [type, setType] = useState(null);
  // timer toggler
  const [toggle, setToggle] = useState(false);
  // dcm data
  const [dcm, setDcm] = useState(null);

  const [showDcmModal, setShowDcmModal] = useState(false);
  const [modal, setModal] = useState(initialModalState);
  const [neutral, setNeutral] = useState(-1);
  const [right, setRight] = useState(-1);
  const [wrong, setWrong] = useState(-1);
  const [percentage, setPercentage] = useState({
    value: null,
    positive: false,
  });
  const [initialBehavior, setInitialBehavior] = useState(initBeh);
  const [intervals, setIntervals] = useState({
    positive: 0,
    negative: 0,
    current: false,
  });
  const [requestWasMade, setRequestWasMade] = useState(false);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      setWrong(0);
      setNeutral(0);
      setRight(0);
    }, 50);
  }, []);
  const parseJson = (json) => {
    return JSON.parse(jsonrepair(json));
  };

  const getGraph = async () => {
    let formdata = new FormData();
    formdata.append('skill_id', skill.id);
    formdata.append('client_id', client_id);
    formdata.append('filter', 'all');
    const res = await post('get/graph', formdata);
    if (!res.error) {
      let data = res.result.result;
      let keys = Object.keys(data);
      switch (skill.action_type) {
        case '1':
        case '2':
          setGraphData(
            keys.map((key) => {
              return data[key].average_time;
            })
          );
          break;
        case '3':
          setGraphData(
            keys.map((key) => {
              let stats_value = parseJson(data[key].original[data[key].original.length - 1].stats_value);
              let right = stats_value.allTimeBehavior.right.percentage;
              return right;
            })
          );
          break;
        case '4':
          setGraphData(
            keys.map((key) => {
              let stats_value = parseJson(data[key].original[data[key].original.length - 1].stats_value);
              let right = stats_value.allTimeBehavior.right.rate;
              return right;
            })
          );
          break;
        case '5':
          setGraphData(
            keys.map((key) => {
              let stats_value = parseJson(data[key].original[data[key].original.length - 1].stats_value);
              let { positive, negative } = stats_value.intervals;
              let yValue = positive / (positive + negative);
              return yValue;
            })
          );
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (percentage.value) {
      getGraph();
    }
  }, [percentage.value]);

  const add = (value) => {
    if (running.id === skill.id || !running.id) {
      value === 'wrong' && setWrong((prevState) => prevState + 1);
      value === 'neutral' && setNeutral((prevState) => prevState + 1);
      value === 'right' && setRight((prevState) => prevState + 1);
    } else {
      setError({
        message1: `Cannot start "${skill.title}", beacase "${running.title}" is currently running.`,
      });
    }
  };

  useEffect(() => {
    let summ = wrong + neutral + right;
    if (skill.action_type === skillTypes.TYPE_3) {
      if (summ > 0 && !toggle) {
        setToggle(true);
      } else if (toggle && summ === 0) {
        setToggle(false);
      }
    }
  }, [wrong, neutral, right]);

  const sub = (value) => {
    let beh = { wrong, neutral, right };
    if (beh[value] > 0) {
      value === 'wrong' && setWrong((prevState) => prevState - 1);
      value === 'neutral' && setNeutral((prevState) => prevState - 1);
      value === 'right' && setRight((prevState) => prevState - 1);
    }
  };

  const discardBehavior = () => {
    setNeutral(0);
    setWrong(0);
    setRight(0);
  };

  const getCurrentDcm = async () => {
    const formdata = new FormData();
    formdata.append('skill_id', skill.id);
    formdata.append('client_id', client_id);
    const res = await post('dcm/get', formdata);
    if (!res.error) {
      setDcm(res.result.data);
      setLoading(false);
      if (skill.action_type === '3' || skill.action_type === '4') {
        if (res.result.data.summ) {
          const { neutral, wrong, right } = res.result.data.summ;
          const summ = neutral + wrong + right;
          const time = res.result.data.all_time;

          setInitialBehavior((prevState) => {
            return {
              ...prevState,
              allTimeBehavior: {
                neutral: {
                  value: neutral,
                  percentage: neutral / summ,
                  rate: neutral / (time / 60),
                },
                wrong: {
                  value: wrong,
                  percentage: wrong / summ,
                  rate: wrong / (time / 60),
                },
                right: {
                  value: right,
                  percentage: right / summ,
                  rate: right / (time / 60),
                },
              },
            };
          });
        } else {
          setInitialBehavior(initBeh);
        }
      } else if (skill.action_type === '5' && res.result.data.dcm_current) {
        res.result.data.summ
          ? setIntervals({
              current: false,
              positive: res.result.data.summ.currents,
              negative: res.result.data.dcm_count - res.result.data.summ.currents,
            })
          : setIntervals({
              positive: 0,
              negative: 0,
              current: false,
            });
      }
    }
  };

  // action when pressing on i button
  const openInfo = async () => {
    setShowDcmModal(true);
    setLoading(true);
    getCurrentDcm();
  };

  const closeDcmModal = () => {
    setShowDcmModal(false);
  };

  useEffect(() => {
    if (subDomainOpened && !requestWasMade) {
      getSkillPercentage();
      setRequestWasMade(true);
    }
  }, [subDomainOpened]);

  useEffect(() => {
    if (skill.action_type !== skillTypes.TYPE_5) {
      setType(clockTypes.WATCH);
    } else {
      setType(clockTypes.TIMER);
      running.id !== skill.id && setTime(initialTimerTime);
    }
  }, [skill]);

  // timer & stop watch functionality
  useEffect(() => {
    toggle && getCurrentDcm();
    if (toggle && type === clockTypes.WATCH) {
      let timer = time;
      setRunning({
        id: skill.id,
        title: skill.title,
        type: type,
        time: timer,
      });
      BackgroundTimer.runBackgroundTimer(() => {
        timer++;
        setTime(timer);
      }, 1000);
    } else if (toggle && type === 'timer') {
      let timer = time;
      setRunning({
        id: skill.id,
        title: skill.title,
        time: timer,
        type: type,
      });
      BackgroundTimer.runBackgroundTimer(() => {
        timer--;
        setTime(timer);
      }, 1000);
    }
    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [toggle]);

  // every 5 minutes show stopwatch notification
  useEffect(() => {
    if (skill.action_type !== skillTypes.TYPE_3) {
      if (time !== 0 && type === clockTypes.WATCH && time % notifyTimerTime === 0) {
        setToggle(false);
        stopWatchDurationNotification();
      } else if (time === 0 && type === clockTypes.TIMER) {
        setShowDcmModal(false);
        timerEnd();
      }
    }
  }, [time]);

  const getSkillPercentage = async () => {
    const formdata = new FormData();
    formdata.append('skill_id', skill.id);
    formdata.append('client_id', client_id);
    try {
      const res = await post('skills/data', formdata);
      if (res.result.percent !== undefined) {
        setPercentage({
          value: fixedPercentage(res.result.percent),
          positive: res.result.positive,
        });
      }
    } catch (e) {
      console.log('skills/data TargetSkill -> ', e);
    }
  };

  const fixedPercentage = (value) => {
    if (value !== null) {
      return Number.isInteger(value) ? value + ' %' : value.toFixed(2) + ' %';
    } else return '-';
  };

  const saveAttempt = async (intervalsStats) => {
    discardBehavior();
    clearRunning();
    type === clockTypes.WATCH ? setTime(0) : setTime(initialTimerTime);
    const dcm_time = type === clockTypes.WATCH ? time : initialTimerTime;
    setModal({ ...modal, show: false });
    const formdata = new FormData();
    formdata.append('client_id', client_id);
    formdata.append('skill_id', skill.id);
    formdata.append('action_type', skill.action_type);
    formdata.append('time_data', dcm_time);

    const currentBehavior = neutral + wrong + right || 0;
    const allTime = initialBehavior.allTimeBehavior.time + dcm_time;
    const allTimeBehavior =
      initialBehavior.allTimeBehavior.neutral.value +
      neutral +
      initialBehavior.allTimeBehavior.right.value +
      right +
      initialBehavior.allTimeBehavior.wrong.value +
      wrong;
    (skill.action_type === '3' || skill.action_type === '4') &&
      formdata.append(
        'stats_value',
        createFormdataForRateAndFrequency(time, neutral, wrong, right, currentBehavior, allTime, allTimeBehavior, initialBehavior)
      );

    skill.action_type === '5' && formdata.append('stats_value', JSON.stringify({ intervals: { ...intervalsStats } }));
    const res = await post('dcm/add', formdata);
    if (!res.error) {
      getSkillPercentage();
      skill.action_type === skillTypes.TYPE_3 &&
        setError({
          message1: `${skill.title} attempt saved!`,
          color: COLORS.darkGreen,
        });
    } else {
      alert('error');
    }
  };

  const toggleClock = () => {
    if (!toggle && running.id && skill.id !== running.id) {
      setError({
        message1: `Cannot start "${skill.title}", beacase "${running.title}" is currently running.`,
      });
    } else if (toggle && skill.id === running.id) {
      setToggle(false);
      if (type === clockTypes.WATCH) {
        stopwWatchEnd();
      } else {
        timerCancel();
      }
    } else {
      setToggle(true);
    }
  };

  const textForIntervals = () => {
    if (skill.sub_type === '1') {
      return subtypeText.SUBTYPE_1;
    } else if (skill.sub_type === '2') {
      return subtypeText.SUBTYPE_2;
    } else if (skill.sub_type === '3') {
      return subtypeText.SUBTYPE_3;
    }
  };

  // when timer is 00:00
  const timerEnd = () => {
    setToggle(false);
    clearRunning();
    setModal({
      show: true,
      text: skill.action_type === '5' ? textForIntervals() : 'Do you want to save the attempt?',
      cancelText: 'Discard',
      confirmText: 'Yes',
      cancelColor: COLORS.red,
      confirmGradient: 'thunder',
      intervals: skill.action_type === '5',
      confirmAction: () => {
        discardBehavior();
        setModal({ show: false });
        saveAttempt({
          positive: intervals.positive + 1,
          negative: intervals.negative,
          current: true,
        });
      },
      cancelAction: () => {
        setTime(initialTimerTime);
        skill.action_type !== '5' && discardBehavior();
        setIntervals((prevState) => {
          return { ...prevState, negative: prevState.negative + 1 };
        });
        skill.action_type === '5' &&
          saveAttempt({
            positive: intervals.positive,
            negative: intervals.negative + 1,
            current: false,
          });
        setModal({ ...modal, show: false });
      },
      closeModal: () => {
        setModal({ ...modal, show: false });
        discardBehavior();
        setTime(initialTimerTime);
      },
    });
  };

  // when user cancels timer
  const timerCancel = () => {
    setModal({
      show: true,
      text: 'Do you want to cancel the timer?',
      cancelText: 'Continue',
      confirmText: 'Cancel',
      cancelColor: themes.textColor,
      confirmGradient: 'red',
      confirmAction: () => {
        setTime(initialTimerTime);
        setModal({ ...modal, show: false });
        discardBehavior();
        clearRunning();
      },
      cancelAction: () => {
        setToggle(true);
        setModal({ ...modal, show: false });
      },
      closeModal: () => {
        setToggle(true);
        setModal({ ...modal, show: false });
      },
    });
  };

  // when stop watch is 5/10/15/...
  const stopWatchDurationNotification = () => {
    Vibration.vibrate();
    setModal({
      text: `Timer has been active for ${time / 60} minutes already. Do you want to stop it?`,
      cancelText: 'Continue',
      cancelColor: themes.textColor,
      confirmGradient: 'red',
      confirmText: 'Stop timer',
      show: true,
      cancelAction: () => {
        setToggle(true);
        setModal({ ...modal, show: false });
      },
      confirmAction: () => {
        setTime(0);
        setModal({ ...modal, show: false });
        clearRunning();
      },
      closeModal: () => {
        setToggle(true);
        setModal({ ...modal, show: false });
      },
    });
  };

  // when user stops stopWatch
  const stopwWatchEnd = () => {
    discardBehavior();
    setModal({
      show: true,
      text: 'Do you want to save the attempt?',
      cancelText: 'Discard',
      confirmText: 'Yes',
      cancelColor: COLORS.red,
      confirmGradient: 'thunder',
      confirmAction: () => {
        saveAttempt();
      },
      cancelAction: () => {
        setTime(0);
        setModal({ ...modal, show: false });
      },
      closeModal: () => {
        setModal({ ...modal, show: false });
        setToggle(true);
      },
    });
    clearRunning();
    clearError();
  };

  // swipe functionality
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0)).current;

  const onSwipeRight = () => {
    setItemOpened(true);
    openSkill(index);
  };

  useEffect(() => {
    const showAnimaton = index === 0 && !itemOpened && isUserNew && subDomainOpened;
    if (showAnimaton) {
      Animated.sequence([
        Animated.timing(pan, {
          toValue: 50,
          duration: 1500,
          easing: Easing.sin,
          useNativeDriver: false,
        }),
        Animated.timing(pan, {
          toValue: 0,
          duration: 1500,
          easing: Easing.bounce,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [subDomainOpened]);

  const onSwipeLeft = () => {
    setItemOpened(false);
  };

  const appState = useAppState();
  // set new state when receive when another skill is opening
  useEffect(() => {
    setItemOpened(opened);
  }, [opened]);
  const activeDomain = useSelector((state) => state.dcm.activeDomain);
  const isFocused = useIsFocused();
  // save frequency when swipe left or leave page
  useEffect(() => {
    if (skill.action_type === skillTypes.TYPE_3) {
      let isValues = neutral + wrong + right > 0;
      if (isValues || (isValues && appState === 'background')) {
        saveAttempt();
      }
    }
  }, [itemOpened, isFocused, activeDomain, appState]);

  // animations for swipe button
  useEffect(() => {
    const animateValue = 225;
    if (itemOpened) {
      Animated.timing(pan, {
        toValue: animateValue,
        duration: 250,
        useNativeDriver: false,
      }).start();
      Animated.timing(scale, {
        toValue: 1,
        duration: 250,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(pan, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
      Animated.timing(scale, {
        toValue: 0,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }
  }, [itemOpened]);

  const styles = getStyles(themes);

  return (
    <>
      <View style={styles.mainWrap}>
        <SkillBody
          skill={skill}
          percentage={percentage}
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          client_id={client_id}
          client_name={client_name}
          graphData={graphData}
          pan={pan}
        />
        <SkillButtons
          scale={scale}
          skill={skill}
          add={add}
          wrong={wrong}
          neutral={neutral}
          right={right}
          time={time}
          toggle={toggle}
          toggleClock={toggleClock}
          openInfo={openInfo}
        />
      </View>
      {modal.show && (
        <SaveAttempt
          themes={themes}
          showModal={modal.show}
          closeModal={modal.closeModal}
          onCancel={modal.cancelAction}
          text={modal.text}
          confirmText={modal.confirmText}
          cancelText={modal.cancelText}
          onSubmit={modal.confirmAction}
          cancelColor={modal.cancelColor}
          confirmGradient={modal.confirmGradient}
          intervals={modal.intervals}
        />
      )}
      {showDcmModal && (
        <ModalWrap
          intervals={intervals}
          dcm={dcm}
          actionType={skill.action_type}
          loading={loading}
          showModal={showDcmModal}
          themes={themes}
          confirmButton={closeDcmModal}
          closeModal={() => setShowDcmModal(false)}
          add={add}
          sub={sub}
          running={skill.id === running.id}
          behavior={{ neutral, right, wrong }}
          rate={initialBehavior.allTimeBehavior}
        />
      )}
    </>
  );
}

export default TargetSkill;
