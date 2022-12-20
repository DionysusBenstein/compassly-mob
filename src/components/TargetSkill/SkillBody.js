import React from 'react';
import { View, Text, Animated, StyleSheet, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { AreaChart } from 'react-native-svg-charts';
import GestureRecognizer from 'react-native-swipe-gestures';

import { useNavigation } from '@react-navigation/core';
import * as shape from 'd3-shape';

import { global, THEMES, SIZES } from '../../constants';
import darkTheme from '../../constants/darkTheme';
import { displayActionType, displaySubType } from '../../utils/displayActionType';

export default function SkillBody({ onSwipeLeft, onSwipeRight, pan, skill, client_id, client_name, graphData, percentage }) {
  const navigation = useNavigation();

  // config for swipe handler
  const config = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 100,
    gesureClickTreshold: 1000,
  };

  const navigateToGraph = () => {
    navigation.navigate('Chart', {
      client_name,
      skill_name: skill.title,
      skill_id: skill.id,
      skill_description: skill.description,
      client_id,
      action_type: skill.action_type,
      sub_type: skill.sub_type,
    });
  };

  const getPercentageColor = () => {
    if (
      (percentage.positive && percentage.value && parseInt(skill.action_type) > 2) ||
      (!percentage.positive && percentage.value && parseInt(skill.action_type) < 3)
    ) {
      return THEMES.positiveColor;
    } else {
      return THEMES.negativeColor;
    }
  };

  let showAreaChart = percentage.value !== null && graphData.length;

  return (
    <GestureRecognizer onSwipeRight={(state) => onSwipeRight(state)} onSwipeLeft={(state) => onSwipeLeft(state)} config={config}>
      <Animated.View
        style={[
          styles.skill,
          {
            transform: [
              {
                translateX: pan,
              },
            ],
          },
        ]}
      >
        {showAreaChart ? (
          <AreaChart
            style={styles.areaChart}
            data={graphData}
            contentInset={{ top: 30, bottom: 0 }}
            curve={shape.curveNatural}
            svg={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          ></AreaChart>
        ) : (
          percentage.value && (
            <View style={styles.loader}>
              <ActivityIndicator color={darkTheme.textColor} />
            </View>
          )
        )}

        <TouchableWithoutFeedback onPress={navigateToGraph}>
          <View style={styles.skillInfo}>
            <Text style={styles.skillInfoTitle}>{skill.title}</Text>
            <Text style={styles.skillTitle}>{skill.action_type === '5' ? displaySubType(skill.sub_type) : displayActionType(skill.action_type)}</Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.percentage}>
          <Text
            style={{
              color: getPercentageColor(),
              marginRight: 7,
            }}
          >
            {percentage.positive && '+'}
            {percentage.value === null && '-'}
            {percentage.value !== null && percentage.value}
          </Text>
        </View>
      </Animated.View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  skill: {
    marginLeft: 'auto',
    width: SIZES.width * 0.8,
    minHeight: 61,
    paddingVertical: 8,
    borderRadius: 12,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth: 0.5,
    backgroundColor: 'rgba(255,255,255, 0.05)',
    // borderColor: "rgba(255, 255, 255, 0.3)",
  },
  skillTitle: {
    ...global.p7dark,
    color: darkTheme.textColor,
    opacity: 0.6,
  },
  areaChart: {
    height: 61,
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: SIZES.width * 0.88,
  },
  loader: {
    height: 61,
    position: 'absolute',
    top: 10,
    right: 0,
    width: SIZES.width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 0.6 }],
  },
  skillInfo: { maxWidth: '70%', paddingLeft: 20 },
  skillInfoTitle: {
    ...global.p5dark,
    color: darkTheme.textColor,
    marginBottom: 5,
  },
  percentage: { flexDirection: 'row', alignItems: 'center' },
});
