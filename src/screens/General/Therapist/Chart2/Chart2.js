import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {View, ScrollView, ActivityIndicator, RefreshControl, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { post } from '../../../../api/post';
import { Header } from '../../../../components';
import { global } from '../../../../constants';
import withGeneralBackGround from '../../../../hoc/withGeneralBackground';
import SkillTabs from '../SkillTabs';
import { Chart } from './components';
import { styles } from './styles';
import {setIsTabsVisible} from "./chartSlice";
import {useDispatch} from "react-redux";

const {height} = Dimensions.get('window');

function Chart2({ route, navigation, theme, themes }) {
  const { client_name, skill_id, client_id } = route.params;

  const scrollViewBottom = useBottomTabBarHeight();

  const [skillData, setSkillData] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    getSkillData();
  }, []);

  const getSkillData = async () => {
    const formdata = new FormData();
    formdata.append('skill_id', skill_id);
    formdata.append('client_id', client_id);
    try {
      const res = await post('skills/data', formdata);
      setSkillData(res?.result);
      setLoading(false);
    } catch (e) {
      console.log('skills/data TargetSkill -> ', e);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getSkillData().then(() => setRefreshing(false));
  }, []);

  const [context, setContext] = useState(0)
  const [showTabs, setShowTabs] = useState(true)
  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(setIsTabsVisible(showTabs))
  }, [showTabs])
  const onScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.y
    const offsetDelay = height * 0.03
    if(offset < (context + offsetDelay)) {
      setShowTabs(true)
    } else if (offset > (context - offsetDelay)) {
      setShowTabs(false)
    } else {
      setShowTabs(true)
    }
  }
  const onScrollBeginDrag = (e) => {
    setContext(e.nativeEvent.contentOffset.y);
  }
  return (
    <SafeAreaView style={[global.container]}>
      <Header theme={theme} name={client_name} backButtonEvent={() => navigation.goBack()} role="client"></Header>

      <ScrollView
          onScroll={onScroll}
          onScrollBeginDrag={onScrollBeginDrag}
          scrollEventThrottle={5}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={loading ? { justifyContent: 'center', alignItems: 'center' } : null}
      >
        {loading && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator color="#FFFFFF" />
          </View>
        )}
        {!loading && (
          <>
            <Chart routeParams={route?.params} themes={themes} />
            <View style={styles.description}>{!!skillData?.tabs?.length && <SkillTabs skillsData={skillData} />}</View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default withGeneralBackGround(Chart2);
