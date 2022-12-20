import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Gradient from './Gradient/Gradient';

export default function EmotionsList({ icons = [], setIcon, value, name }) {
  const handleSetIcon = (iconName) => {
    if (name === 'feelingBehavior') {
      if (value.every((icon) => icon !== iconName)) {
        setIcon((prevState) => ({
          ...prevState,
          [name]: [...prevState.feelingBehavior, iconName],
        }));
      } else {
        setIcon((prevState) => ({
          ...prevState,
          [name]: prevState.feelingBehavior.filter((icon) => icon !== iconName),
        }));
      }
    } else {
      if (value !== iconName) {
        setIcon((prevState) => ({
          ...prevState,
          [name]: iconName,
        }));
      } else {
        setIcon((prevState) => ({
          ...prevState,
          [name]: '',
        }));
      }
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: name === 'feelingBehavior' ? 'space-between' : 'center',
        marginRight: -25,
        paddingHorizontal: 23,
        marginTop: 14,
        flexWrap: 'wrap',
      }}
    >
      {icons.map((el, index) => {
        return (
          <View key={el.name + index} style={{ marginBottom: 15, alignItems: 'center', justifyContent: 'center', width: '20%' }}>
            <TouchableOpacity
              style={{
                width: 36,
                height: 36,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 18,
                overflow: 'hidden',
                marginBottom: 5,
              }}
              onPress={() => handleSetIcon(el.name)}
            >
              {name !== 'feelingBehavior' && <Gradient style={el.name === value ? 'violet' : 'transparentWhite2'} />}
              {name === 'feelingBehavior' && <Gradient style={value.some((icon) => el.name === icon) ? 'violet' : 'transparentWhite2'} />}

              <SvgXml xml={el.icon} />
            </TouchableOpacity>
            {name === 'feelingBehavior' && <Text style={{ color: '#ffffff', fontSize: 10, textAlign: 'center' }}>{el.name}</Text>}
          </View>
        );
      })}
    </View>
  );
}
