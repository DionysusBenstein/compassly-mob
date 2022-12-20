import React from 'react';
import { Linking, Pressable, Text, View, StyleSheet, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { linkButton } from '../../assets/icons/Planner';
import { COLORS } from '../../constants';

export const ResourcesLink = ({ name, link }) => {
  const handleClickLink = () => Linking.openURL(link);

  return (
    <Animated.View style={styles.container}>
      <Pressable onPress={handleClickLink} style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.button]}>
        <View style={styles.content}>
          <Text style={{ color: COLORS.white }}>{name}</Text>
        </View>

        <SvgXml xml={linkButton} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: 'rgba(255,255,255, 0.2)',
    borderBottomWidth: 1,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
    paddingHorizontal: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 30,
  },
});
