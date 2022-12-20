import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { post } from '../../../api/post';
import { Header, NoDataMessage, Spinner } from '../../../components';
import TargetSkillsList from '../../../components/TargetSkillsList';
import { global } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';

function SeeAll({ theme, navigation, route, themes }) {
  const [loading, setLoading] = useState(true);
  const [targetSkills, setTargetSkills] = useState([]);
  // const [closedList, setClosedList] = useState({});

  const { client_id, domain_id, name, surname } = route.params;
  const scrollViewBottom = useBottomTabBarHeight();

  const getSkills = async () => {
    const formdata = new FormData();
    formdata.append('client_id', client_id);
    formdata.append('domain_id', domain_id);
    const res = await post('all/skills', formdata);
    if (!res.error) {
      console.log('see all result ==>', res.result.data);
      setTargetSkills(res.result.data.slice(0, 20));
      setLoading(false);
    } else {
      console.log('error', res.error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getSkills();
  }, []);

  return (
    <>
      <SafeAreaView style={[global.safeAreaContainer]}>
        <Header theme={theme} name={name + ' ' + surname} backButtonEvent={() => navigation.goBack()} role="Client" />

        {loading && <Spinner color={themes.textColor} />}
        {!loading && !targetSkills.length && <NoDataMessage text="No domains yet" themes={themes} />}

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={[
              global.p5dark,
              {
                color: themes.darkerTextColor,
                marginTop: 15,
                marginBottom: 0,
                marginLeft: 23,
              },
            ]}
          >
            hide all
          </Text>
        </TouchableOpacity>

        {!loading && (
          <ScrollView
            style={{
              marginBottom: Platform.OS === 'android' ? scrollViewBottom + 38 : scrollViewBottom + 5,
              paddingTop: 20,
            }}
            showsVerticalScrollIndicator={false}
          >
            <TargetSkillsList
              themes={themes}
              targetSkills={targetSkills}
              // closedList={closedList}
              // setClosedList={setClosedList}
              client_id={client_id}
              client_name={name + ' ' + surname}
            />
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

export default withGeneralBackground(SeeAll);
