import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';

import SkillDescription from './SkillDescription';

const SkillTabs = ({ skillsData }) => {
  const [activeSkill, setActiveSkill] = useState(0);

  const skillData = skillsData?.tabs?.filter((item) => item?.title !== '');

  const handleChangeTab = (value) => {
    setActiveSkill(value);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderRadius: 3 }}>
        {skillData.map((item, index) => (
          <Pressable onPress={() => handleChangeTab(index)} key={item.title} style={[styles.button, activeSkill === index ? styles.activeButton : null]}>
            <Text style={[styles.ButtonText, activeSkill === index ? styles.activeButtonText : null]}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
      <SkillDescription skillDescription={skillData[activeSkill]?.description} />
    </View>
  );
};

export default SkillTabs;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderWidth: 0,
    backgroundColor: 'transparent',
    borderRadius: 3,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeButton: {
    backgroundColor: '#444A63',
    borderRadius: 3,
  },
  ButtonText: { color: '#FFFFFF', opacity: 0.6 },
  activeButtonText: {
    opacity: 1,
    color: '#FFFFFF',
  },
});
