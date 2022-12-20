import React, {memo} from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

function SkillDescription({ skillDescription }) {
  const { width } = useWindowDimensions();

  const regex = /<p><br><\/p>/g;
  const formattedSource = skillDescription?.replace(regex, '');

  const source = {
    html: `${formattedSource}`,
  };

  const tag = {
    p: {
      color: 'white',
    },
  };
  return (
    <View>
      <RenderHtml contentWidth={width} source={source} tagsStyles={tag} />
    </View>
  );
}

export default memo(SkillDescription);
