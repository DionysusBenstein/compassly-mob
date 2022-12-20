import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

import { SIZES, FONTS, COLORS } from '../../constants';

const SUCCESS_COLOR = 'rgba(255,255,255, 0.8)';
const ORIGINAL_COLOR = 'rgba(255,255,255, 0.2)';

export default function PlannerInput(props) {
  const [focused, setFocused] = useState(false);

  const multilineMaxHeight = props.inputMaxHeight ? props.inputMaxHeight : 200;
  const multilineMinHeight = props.inputMinHeight ? props.inputMinHeight : 85;

  const styles = StyleSheet.create({
    input: {
      backgroundColor: 'transparent',
      borderRadius: 12,
      width: '100%',
      justifyContent: 'center',
      fontSize: SIZES.t5,
      fontFamily: FONTS.sfRegular,
      borderWidth: 1,
      overflow: 'hidden',
      borderStyle: 'solid',
      paddingHorizontal: 28,
      paddingVertical: 16,
      minHeight: props.multiline ? multilineMinHeight : 51,
      maxHeight: props.multiline ? multilineMaxHeight : 51,
      borderColor: focused ? (props.error ? COLORS.red : SUCCESS_COLOR) : ORIGINAL_COLOR,
    },
  });

  const handleBlur = () => {
    props.onBlur && props.onBlur();
    setFocused(false);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <View style={[styles.input, props.style]}>
      <TextInput
        maxLength={250}
        style={[{ color: props.error ? COLORS.red : '#FFFFFF' }]}
        placeholderTextColor="rgba(255, 255, 255, 0.6)"
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
    </View>
  );
}
