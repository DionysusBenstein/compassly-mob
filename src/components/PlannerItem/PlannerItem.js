import React from 'react';
import { Linking, Text, View, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';

import api_url from '../../api/api_url';
import { download } from '../../assets/icons/Planner';
import { COLORS } from '../../constants';

export const PlannerItem = ({ clientId, name, surname, date }) => {
  const handleDownloadPdf = () => Linking.openURL(`${api_url}/pdf/${clientId}`);

  return (
    <Animated.View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: COLORS.white }}>
          Planner by {name} {surname}
        </Text>

        <Text style={{ color: COLORS.white }}>{new Date(date).toLocaleDateString('en-US')}</Text>
      </View>

      <TouchableOpacity onPress={handleDownloadPdf}>
        <SvgXml xml={download} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 12,
    borderBottomColor: 'rgba(255,255,255, 0.2)',
    borderBottomWidth: 1,
  },

  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
});
