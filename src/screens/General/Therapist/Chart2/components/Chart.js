import React, { memo, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, Text, Vibration, View } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import { SlideAreaChart } from '@connectedcars/react-native-slide-charts';
import jsonrepair from 'jsonrepair';
import _ from 'lodash';

import { post } from '../../../../../api/post';
import GraphChangeValue from '../../../../../components/Chart/GraphChangeValue';
import { SIZES } from '../../../../../constants';
import changeTimeFormat from '../../../../../utils/changeTimeFormat';
import { displaySubType } from '../../../../../utils/displayActionType';
import { displayFloatNumber } from '../../../../../utils/displayFloatNumber';
import getActiveLabel from '../../../../../utils/getActiveLabel';
import getBehaviorName from '../../../../../utils/getBehaviorName';
import getDateMonth from '../../../../../utils/getDateMonth';
import { getTime } from '../../../../../utils/getTime';
import { styles } from '../styles';

export const Chart = memo(({ routeParams, themes }) => {
  const { skill_name, action_type, skill_id, client_id, sub_type } = routeParams;
  const chartRef = useRef();

  const [data, setData] = useState([]);
  const [axis, setAxis] = useState({ max: 0 });
  const [behavior, setBehavior] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTime, setActiveTime] = useState(1);
  const [graphData, setGraphData] = useState(null);
  const [graphValues, setGraphValues] = useState({
    date: '',
    change: 'none',
    positive: false,
    header: '',
  });

  const [valueX, setValueX] = useState(0);

  useEffect(() => {
    Platform.OS === 'android' && data.length && Vibration.vibrate(20);
  }, [clicked]);

  const parseJson = (json) => {
    return JSON.parse(jsonrepair(json));
  };

  // set X value
  const updateXValue = React.useCallback((newX) => _.debounce(setValueX, 100)(parseInt(newX)), []);

  useEffect(() => {
    if (graphData) {
      if (parseInt(action_type) < 3) {
        changeLatencyGraphData();
      } else if (action_type === '3') {
        changeFrequencyGraphData();
      } else if (action_type === '4') {
        changeRateGraphData();
      } else if (action_type === '5') {
        changeIntervalsData();
      }
    }
  }, [valueX, graphData, clicked, behavior]);

  useEffect(() => {
    if ((action_type === '3' || action_type === '4') && graphData) {
      switch (behavior) {
        case 0:
          setData(
            graphData.map((el, i) => {
              return { x: i, y: el.right.value };
            })
          );
          break;
        case 1:
          setData(
            graphData.map((el, i) => {
              return { x: i, y: el.wrong.value };
            })
          );
          break;
        case 2:
          setData(
            graphData.map((el, i) => {
              return { x: i, y: el.neutral.value };
            })
          );
          break;
        default:
          break;
      }
    }
  }, [graphData, behavior]);

  // settingMaxVal
  useEffect(() => {
    if (data.length) {
      (action_type === '1' || action_type === '2') &&
        setAxis({
          max: getTime(Math.max(...data.map((el) => el.y)), 'locale'),
        });

      action_type === '3' &&
        setAxis({
          max: displayFloatNumber(Math.max(...data.map((el) => el.y)) * 100) + '%',
        });

      action_type === '4' &&
        setAxis({
          max: displayFloatNumber(Math.max(...data.map((el) => el.y))),
        });

      action_type === '5' &&
        setAxis({
          max: displayFloatNumber(Math.max(...data.map((el) => el.y)) * 100) + '%',
        });
    }
  }, [data]);

  // clearing state when changing interval
  useEffect(() => {
    setValueX(null);
    setGraphData(null);
    setGraphValues({
      date: '',
      change: 'none',
      positive: false,
      header: '',
    });
    getGraph();
  }, [activeTime]);

  // latency data manipulations
  const changeLatencyGraphData = () => {
    if (activeTime === 0) {
      let firstTimeData = graphData.original[0].time_data;
      let lastTimeData = graphData.original[graphData.original.length - 1].time_data;
      if (clicked && graphData.original[valueX]) {
        let { hour, time_data } = graphData.original[valueX];
        let change = (time_data / firstTimeData) * 100 - 100;
        setGraphValues({
          date: changeTimeFormat(hour),
          header: getTime(time_data, 'locale'),
          change,
          positive: change < 0,
        });
      } else if (!clicked) {
        let change = (lastTimeData / firstTimeData) * 100 - 100;
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: getTime(parseInt(graphData.center_time_data), 'locale'),
          change,
          positive: change < 0,
        });
      }
    } else if (activeTime !== 0) {
      if (clicked && graphData[valueX]) {
        let firstTimeData = graphData[0].center_time_data;
        let { date, center_time_data } = graphData[valueX];
        let change = (center_time_data / firstTimeData) * 100 - 100;
        setGraphValues({
          date: getDateMonth(date),
          header: getTime(parseInt(center_time_data), 'locale'),
          change,
          positive: change < 0,
        });
      } else if (!clicked && graphData[0]) {
        let firstTimeData = graphData[0].center_time_data;
        let lastTimeData = graphData[graphData.length - 1].center_time_data;
        let change = (lastTimeData / firstTimeData) * 100 - 100;
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: getTime(parseInt(lastTimeData), 'locale'),
          change,
          positive: change < 0,
        });
      }
    }
  };

  const changeFrequencyGraphData = () => {
    let beh = getBehaviorName(behavior);
    if (!activeTime) {
      let firstTimeData = graphData[0][beh].value;
      let lastTimeData = graphData[graphData.length - 1][beh].value;
      if (clicked && graphData[valueX]) {
        let { hour } = graphData[valueX];
        let currentVal = graphData[valueX][beh].value;
        let change = firstTimeData ? (currentVal / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: changeTimeFormat(hour),
          header: displayFloatNumber(currentVal * 100) + '%',
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      } else if (!clicked) {
        let change = firstTimeData ? (lastTimeData / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: displayFloatNumber(lastTimeData * 100) + '%',
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      }
    } else {
      let firstTimeData = graphData[0][beh].value;
      if (clicked && graphData[valueX]) {
        let date = graphData[valueX].date;
        let currentVal = graphData[valueX][beh].value;
        let change = firstTimeData ? (currentVal / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: getDateMonth(date),
          header: displayFloatNumber(currentVal * 100) + '%',
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      } else if (!clicked && graphData[0]) {
        let lastTimeData = graphData[graphData.length - 1][beh].value;
        let change = firstTimeData ? (lastTimeData / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: displayFloatNumber(lastTimeData * 100) + '%',
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      }
    }
  };

  const changeRateGraphData = () => {
    let beh = getBehaviorName(behavior);
    if (!activeTime) {
      let firstTimeData = graphData[0][beh].value;
      let lastTimeData = graphData[graphData.length - 1][beh].value;
      if (clicked && graphData[valueX]) {
        let { hour } = graphData[valueX];
        let currentVal = graphData[valueX][beh].value;
        let change = firstTimeData ? (currentVal / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: changeTimeFormat(hour),
          header: currentVal,
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      } else if (!clicked) {
        let change = firstTimeData ? (lastTimeData / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: lastTimeData,
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      }
    } else {
      let firstTimeData = graphData[0][beh].value;
      if (clicked && graphData[valueX]) {
        let date = graphData[valueX].date;
        let currentVal = graphData[valueX][beh].value;
        let change = firstTimeData ? (currentVal / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: getDateMonth(date),
          header: currentVal ? currentVal : 0,
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      } else if (!clicked && graphData[0]) {
        let lastTimeData = graphData[graphData.length - 1][beh].value;
        let change = firstTimeData ? (lastTimeData / firstTimeData) * 100 - 100 : 0;
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: lastTimeData ? lastTimeData : 0,
          change: displayFloatNumber(change),
          positive: change > 0,
        });
      }
    }
  };

  const changeIntervalsData = () => {
    if (activeTime === 0) {
      const positive = graphData.center_data_dcm.currents;
      const negative = graphData.center_data_dcm.negative.length - graphData.center_data_dcm.currents;
      if (clicked && graphData.original[valueX]) {
        let intervals = parseJson(graphData.original[valueX].stats_value).intervals;
        let { hour } = graphData.original[valueX];
        setGraphValues({
          date: changeTimeFormat(hour),
          header: `Successful: ${intervals.current ? 'Yes' : 'No'}`,
        });
      } else if (!clicked) {
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: displayFloatNumber((positive / (positive + negative)) * 100) + '%',
        });
      }
    } else if (activeTime !== 0) {
      // const lastValue = graphData[graphData.length - 1].value;
      const firstValue = graphData[0].value;
      if (clicked && graphData[valueX]) {
        let { date, value } = graphData[valueX];
        let change = firstValue ? (value / firstValue) * 100 - 100 : 0;
        setGraphValues({
          date: getDateMonth(date),
          header: displayFloatNumber(value * 100) + '%',
          change,
          positive: change > 0,
        });
      } else if (!clicked && graphData[0]) {
        const lastValue = graphData[graphData.length - 1].value;
        const firstValue = graphData[0].value;
        let change = firstValue ? (lastValue / firstValue) * 100 - 100 : 0;
        setGraphValues({
          date: new Date().toLocaleDateString(),
          header: displayFloatNumber(lastValue * 100) + '%',
          change,
          positive: change > 0,
        });
      }
    }
  };

  const setOneDayLatencyData = (data) => {
    let keys = Object.keys(data);
    setGraphData(data[keys[0]]);
    setData(
      data[keys[0]].original.map((el, i) => {
        return { x: i, y: parseInt(el.time_data) };
      })
    );
  };
  const setAllTimeLatencyData = (data) => {
    let keys = Object.keys(data);
    setData(
      keys.map((key, i) => {
        return { x: i, y: data[key].center_time_data };
      })
    );

    setGraphData(
      keys.map((key) => {
        return {
          date: key,
          change: typeof data[key].center_time.change === 'number' ? data[key].center_time.change : 0,
          positive: !data[key].center_time.positive,
          time_data: data[key].average_time,
          center_time_data: data[key].center_time_data,
        };
      })
    );
  };

  // frequency data manipulations
  const setOneDayFrequencyData = (data) => {
    let keys = Object.keys(data);
    setGraphData(
      data[keys[0]].original.map((el) => {
        let stats_value = parseJson(el.stats_value);
        let { right, wrong, neutral } = stats_value.behavior;
        return {
          time_data: el.time_data,
          right: {
            value: right.percentage,
          },
          wrong: {
            value: wrong.percentage,
          },
          neutral: {
            value: neutral.percentage,
          },
          hour: el.hour,
        };
      })
    );
  };
  const setAllTimeFrequencyData = (data) => {
    let keys = Object.keys(data);
    setGraphData(
      keys.map((key) => {
        const { right, neutral, wrong } = data[key].center_data_dcm;
        const all_time = data[key].average_time;
        const summ = right + neutral + wrong;
        return {
          date: key,
          all_time,
          summ,
          right: {
            value: right / summ,
          },
          neutral: {
            value: neutral / summ,
          },
          wrong: {
            value: wrong / summ,
          },
        };
      })
    );
  };

  // rate data manipulations
  const setOneDayRateData = (data) => {
    let keys = Object.keys(data);
    setGraphData(
      data[keys[0]].original.map((el) => {
        let stats_value = parseJson(el.stats_value);
        let { right, wrong, neutral } = stats_value.behavior;

        return {
          time_data: el.time_data,
          right: {
            value: right.rate,
            percentage: right.percentage,
          },
          wrong: {
            value: wrong.rate,
            percentage: wrong.percentage,
          },
          neutral: {
            value: neutral.rate,
            percentage: wrong.percentage,
          },
          hour: el.hour,
        };
      })
    );
  };
  const setAllTimeRateData = (data) => {
    let keys = Object.keys(data);
    setGraphData(
      keys.map((key) => {
        const { right, neutral, wrong } = data[key].center_data_dcm;
        let all_time = data[key].average_time;

        return {
          date: key,
          all_time,
          right: {
            value: right / (all_time / 60),
          },
          neutral: {
            value: neutral / (all_time / 60),
          },
          wrong: {
            value: wrong / (all_time / 60),
          },
        };
      })
    );
  };

  // intervals data manipulations
  const setOneDayIntervalsData = (data) => {
    let keys = Object.keys(data);
    setGraphData(data[keys[0]]);
    setData([
      ...data[keys[0]].original.map((el, i) => {
        let stats_value = parseJson(el.stats_value);
        let behaviorHappened = stats_value.intervals.current;
        return { x: i, y: behaviorHappened ? 1 : 0 };
      }),
    ]);
  };
  const setAllTimeIntervalsData = (data) => {
    let keys = Object.keys(data);
    setData([
      ...keys.map((key, i) => {
        let positive = data[key].center_data_dcm.currents;
        let negative = data[key].center_data_dcm.negative.length - positive;
        let yValue = positive / (positive + negative);
        return { x: i, y: yValue };
      }),
    ]);

    setGraphData([
      ...keys.map((key) => {
        let positive = data[key].center_data_dcm.currents;
        let negative = data[key].center_data_dcm.negative.length - data[key].center_data_dcm.currents;
        let yValue = positive / (positive + negative);
        return {
          date: key,
          value: yValue,
        };
      }),
    ]);
  };

  const getGraph = async () => {
    setLoading(true);
    let formdata = new FormData();
    formdata.append('skill_id', skill_id);
    formdata.append('client_id', client_id);
    formdata.append('filter', getActiveLabel(activeTime));

    const res = await post('get/graph', formdata);
    if (!res.error) {
      let data = res.result.result;
      if (res.result.result) {
        switch (action_type) {
          case '1':
          case '2':
            !activeTime ? setOneDayLatencyData(data) : setAllTimeLatencyData(data);
            break;
          case '3':
            !activeTime ? setOneDayFrequencyData(data) : setAllTimeFrequencyData(data);
            break;
          case '4':
            !activeTime ? setOneDayRateData(data) : setAllTimeRateData(data);
            break;
          case '5':
            !activeTime ? setOneDayIntervalsData(data) : setAllTimeIntervalsData(data);
            break;
          default:
            break;
        }
      } else {
        setData([]);
      }

      let interval = setInterval(() => {
        setLoading(false);
        clearInterval(interval);
      }, 1400);
    }
  };

  const displayHeaderText = () => {
    if (action_type === '4') {
      return 'Rate';
    } else if (action_type === '5') {
      return displaySubType(sub_type);
    } else {
      return skill_name;
    }
  };

  return (
    <View style={[styles.chartWrap]} ref={chartRef}>
      <Text style={styles.dateText}>{graphValues.date}</Text>
      <Text style={styles.title}>{displayHeaderText()}</Text>

      <Text style={styles.header}>
        {typeof graphValues.header === 'string' || Number.isInteger(graphValues.header) ? graphValues.header : graphValues.header.toFixed(1)}
      </Text>

      {graphValues.change !== undefined ? (
        <GraphChangeValue value={graphValues.change} change={graphValues.positive} themes={themes} action_type={action_type} />
      ) : (
        <View style={{ height: 20 }}></View>
      )}

      {(action_type === 3 || action_type === 4) && (
        <View style={styles.behaviorList}>
          <SegmentedControlTab
            borderRadius={3}
            tabStyle={styles.timeButton}
            activeTabStyle={styles.activeTimeButton}
            tabTextStyle={styles.timeButtonText}
            activeTabTextStyle={styles.activeTimeButtonText}
            values={['Correct', 'Incorrect', 'Neutral']}
            selectedIndex={behavior}
            onTabPress={setBehavior}
          />
        </View>
      )}

      <View
        style={{
          width: SIZES.width * 0.8,
          alignItems: 'center',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          {data.length ? (
            <View
              style={{
                height: 120,
                width: SIZES.width * 0.88,
                alignItems: 'center',
              }}
            >
              <View style={[styles.axis]}>
                <Text style={styles.axisText}>{axis.max}</Text>
                <View style={styles.axisLine} />
              </View>

              <SlideAreaChart
                callbackWithX={updateXValue}
                style={{
                  backgroundColor: 'transparent',
                }}
                handleClick={(value) => {
                  setClicked(value);
                }}
                fillColor="rgba(255,255,255, 0.1)"
                shouldCancelWhenOutside={false}
                width={SIZES.width * 0.88}
                height={116}
                throttleAndroid={true}
                chartLineWidth={1}
                cursorProps={{
                  cursorColor: '#FFFFFF',
                  cursorMarkerHeight: 15,
                  cursorMarkerWidth: 15,
                }}
                chartLineColor="#FFFFFF"
                data={data}
                paddingRight={0}
                paddingLeft={0}
              />

              <View style={[styles.axis]}>
                <View style={[styles.axisLine, { marginTop: 2 }]} />
              </View>
            </View>
          ) : (
            !loading && (
              <View style={{ height: 111, justifyContent: 'center' }}>
                <Text style={{ color: '#8F8F8F' }}>No data registered</Text>
              </View>
            )
          )}
          {loading && (
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator color="#FFFFFF" />
            </View>
          )}
        </View>
      </View>

      {!loading && (
        <View style={styles.timeList}>
          <SegmentedControlTab
            borderRadius={3}
            tabStyle={styles.timeButton}
            activeTabStyle={styles.activeTimeButton}
            tabTextStyle={styles.timeButtonText}
            tabsContainerStyle={{
              flexWrap: 'wrap',
              alignSelf: 'center',
            }}
            activeTabTextStyle={styles.activeTimeButtonText}
            values={['24 H', '7 D', '14 D', '1 M', '3 M', '6 M', 'ALL']}
            selectedIndex={activeTime}
            onTabPress={setActiveTime}
          />
        </View>
      )}
    </View>
  );
});
