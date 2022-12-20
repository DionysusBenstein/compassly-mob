import { StyleSheet } from 'react-native';

import { global, SIZES } from '../../../../constants';

export const styles = StyleSheet.create({
  lineChart: {
    marginVertical: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartWrap: {
    width: SIZES.width * 0.88,
    alignSelf: 'center',
    backgroundColor: 'rgba(37, 42, 61, 0.8)',
    borderRadius: 12,
    marginTop: 18,
    alignItems: 'center',
    paddingTop: 38,
    paddingBottom: 37,
    overflow: 'hidden',
    flex: 1,
  },
  title: {
    ...global.p5dark,
    color: '#FFFFFF',
    opacity: 0.6,
    marginBottom: 5,
    alignSelf: 'center',
    textAlign: 'center',
    maxWidth: '90%',
  },
  header: {
    ...global.h3dark,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerPercents: {
    ...global.p3dark,
    color: '#FFFFFF',
  },
  subHeader: {
    opacity: 0.6,
    ...global.p5dark,
    color: '#FFFFFF',
    marginBottom: 32,
  },
  axis: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  axisText: {
    top: -15,
    left: -11,
    position: 'absolute',
    ...global.p7dark,
    color: 'rgba(255,255,255, 0.3)',
    marginRight: 7,
    marginLeft: 10,
  },
  axisLine: {
    width: SIZES.width * 0.85,
    height: 0.5,
    backgroundColor: 'rgba(255,255,255, 0.3)',
  },
  timeList: {
    width: SIZES.width * 0.88,
    marginTop: 25,
    paddingHorizontal: 10,
  },
  timeButton: {
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderRadius: 3,
    width: 40,
  },
  activeTimeButton: {
    backgroundColor: '#444A63',
    borderRadius: 3,
  },
  timeButtonText: { color: '#FFFFFF', opacity: 0.6 },
  activeTimeButtonText: {
    opacity: 1,
    color: '#FFFFFF',
  },
  itemsList: {
    marginTop: 15,
    borderBottomColor: 'rgba(255,255,255, 0.5)',
    borderBottomWidth: 1,
    minHeight: 42,
  },
  itemContainer: {
    paddingTop: 17,
  },
  itemText: {
    ...global.p5dark,
    color: '#FFFFFF',
  },
  buttonWrap: {
    width: 65,
    height: 70,
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 42, 61, 0.35)',
    position: 'absolute',
    top: 190,
  },
  behaviorList: {
    width: 200,
    marginBottom: 28,
  },
  dateText: {
    ...global.p5dark,
    color: 'rgba(255,255,255, 0.15)',
    position: 'absolute',
    top: 13,
    right: 15,
  },
  description: {
    marginVertical: 10,
    flex: 1,
  },
  descriptionText: {
    fontSize: 15,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  descriptionButton: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
