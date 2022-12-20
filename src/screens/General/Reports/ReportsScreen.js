import React from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { ArrowRight } from '../../../assets/icons';
import { Header } from '../../../components';
import { global, SIZES } from '../../../constants';
import WithGeneralBackground from '../../../hoc/withGeneralBackground';

const reportsData = [
  { route: 'History', name: 'Session history' },
  { route: 'DailyPlannersHistory', name: 'Daily planners history' },
];

const ReportsScreen = ({ activeUser, navigation, themes }) => {
  const goToHistoryScreen = (route) => {
    navigation.navigate(route);
  };

  const styles = StyleSheet.create({
    domain: {
      zIndex: 100,
      width: '100%',
      height: 64,
      marginBottom: 10,
      alignItems: 'center',
      flexDirection: 'row',
      borderRadius: 12,
      paddingLeft: 23,
      paddingRight: 30,
      justifyContent: 'space-between',
      backgroundColor: themes.subdomainBackgroundColor,
      shadowColor: '#000',
      shadowOffset: {
        width: 6,
        height: 20,
      },
      shadowOpacity: 0.018,
      shadowRadius: 50,
    },

    domainText: {
      maxWidth: SIZES.width * 0.7,
      color: themes.textColor,
    },
    header: { alignSelf: 'center', marginBottom: 30, marginTop: 25 },
  });

  return (
    <SafeAreaView style={global.container}>
      <Header name={!!activeUser ? activeUser : ' '} role="client" />
      <Text style={[styles.domainText, styles.header]}>Reports</Text>
      {reportsData.map((item, index) => (
        <TouchableOpacity style={styles.domain} onPress={() => goToHistoryScreen(item.route)} key={item.route + index}>
          <Text style={[global.p5dark, styles.domainText]}>{item.name}</Text>
          <ArrowRight color={themes.textColor} />
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default WithGeneralBackground(ReportsScreen);
