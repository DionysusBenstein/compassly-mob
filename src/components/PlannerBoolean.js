import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { global } from '../constants';

export default function PlannerBoolean({ setPresent, present, name }) {
  const styles = StyleSheet.create({
    text: {
      ...global.p5dark,
      color: '#FFFFFF',
    },
  });

  const handleSetValue = (value) => {
    setPresent((prevState) => ({ ...prevState, [name]: !present ? value : null }));
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 22,
        marginTop: 9,
      }}
    >
      <TouchableOpacity onPress={() => handleSetValue(true)}>
        <Text style={[styles.text, { opacity: present === true ? 1 : 0.5, marginRight: 38 }]}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSetValue(false)}>
        <Text style={[styles.text, { opacity: present === false ? 1 : 0.5 }]}>No</Text>
      </TouchableOpacity>
    </View>
  );
}
