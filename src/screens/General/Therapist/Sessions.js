import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import base64 from 'react-native-base64';
import { SvgXml } from 'react-native-svg';
import { connect, useDispatch, useSelector } from 'react-redux';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { get } from '../../../api/get';
import { post } from '../../../api/post';
import { ArrowDown } from '../../../assets/icons';
import { Header, DomainsList, NoDataMessage, Spinner } from '../../../components';
import TargetSkillsFlatList from '../../../components/TargetSkillsFlatList';
import { global, SIZES } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';
import authOperations from '../../../redux/auth/authOperations';
import dcmActions from '../../../redux/dcm/dcmActions';
import dcmOperations from '../../../redux/dcm/dcmOperations';

const filters = [
  { name: 'Most successful', url: '/rate/DESC' },
  { name: 'Less successful', url: '/rate/ASC' },
  { name: 'Name (A-Z)', url: '/title/ASC' },
  { name: 'Name (Z-A)', url: '/title/DESC' },
];

function Sessions({ theme, navigation, setIsUserNew, themes, setActiveDomain }) {
  const [domains, setDomains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [subDomains, setSubdomains] = useState([]);
  const [skillsCollapsed, setSkillsCollapsed] = useState(true);
  const [filter, setFilter] = useState(filters[0]);
  const [filterOpened, setFilterOpened] = useState(false);
  const [maladaptive, setMaladaptive] = useState(false);
  const [skills, setSkills] = useState([]);
  const [page, setPage] = useState(1);
  const [noMoreMaladaptive, setNoMoreMaladaptive] = useState(false);
  const [maladaptiveLoading, setMaladaptiveLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewBottom = useBottomTabBarHeight();

  const activeUser = useSelector((state) => state.dcm.activeUser);

  const { name, surname, client_id } = activeUser ? activeUser : { name: '', surname: '', client_id: '' };

  useEffect(() => {
    init();
    getDomains();
  }, [activeUser]);

  useEffect(() => {
    if (selectedDomain) {
      setLoading(true);

      setSkillsCollapsed(true);

      if (selectedDomain.maladaptive) {
        getMeladaptives();
        setMaladaptive(true);
      } else {
        getSubdomains();
        setMaladaptive(false);
      }
    }
  }, [selectedDomain, filter]);

  const getDomains = async () => {
    const formdata = new FormData();
    formdata.append('client_id', client_id);
    let res = await post('/domains', formdata);
    if (!res.error) {
      setDomains(res.result.data);
      !res.result.data.length && setLoading(false);
      setSelectedDomain(res.result.data[0]);
    } else {
      console.log('domains ==> error', res.error);
    }
  };

  const getMeladaptives = async () => {
    setMaladaptiveLoading(true);
    const formdata = new FormData();
    formdata.append('client_id', client_id);
    console.log(`/maladaptives?page=${page}`);
    let res = await post(`/maladaptives?page=${page}`, formdata);
    if (!res.error) {
      console.log('Meladaptives', res.result.counts);
      // setSkills(res.result.data);
      res.result.data.length < 20 && setNoMoreMaladaptive(true);
      skills.length + res.result.data.length >= res.result.counts && setNoMoreMaladaptive(true);

      setSkills((prev) => [...prev, ...res.result.data]);
    } else {
      console.log('meladaptive ==> error', res.error);
    }
    setLoading(false);
    setMaladaptiveLoading(false);
  };

  const getSubdomains = async () => {
    const formdata = new FormData();
    formdata.append('parrent_id', selectedDomain.domain_id);
    // console.log(`/subdomains${filter.url}`);
    const res = await post(`/subdomains${filter.url}`, formdata);
    if (!res.error) {
      // console.log("Subdomains", res.result.data);
      setSubdomains(res.result.data);
      setLoading(false);
    } else {
      console.log('error', res.error);
    }
  };

  const init = async () => {
    const res = await get('/init');
    if (!res.error) {
      console.log(res.result);
      setIsUserNew(!res.result.isDCM);
    }
  };

  const loadMore = () => {
    !noMoreMaladaptive && !loading && !maladaptiveLoading && setPage((prev) => prev + 1);
  };

  const refresh = async () => {
    setSkills([]);
    setNoMoreMaladaptive(false);
    setRefreshing(true);
    page !== 1 ? setPage(1) : await getMeladaptives();
    setRefreshing(false);
  };

  useEffect(() => {
    setMaladaptiveLoading(true);
    if (!noMoreMaladaptive && !loading && !maladaptiveLoading) {
      getMeladaptives();
    }
  }, [page]);

  domains.sort(function (x, y) {
    return x.title === 'Maladaptive behavior' ? -1 : y === 'Maladaptive behavior' ? 1 : 0;
  });

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getDomains().then(() => setRefreshing(false));
  }, []);

  return (
    <>
      <SafeAreaView style={[global.safeAreaContainer]}>
        <Header theme={theme} name={name + ' ' + surname} backButtonEvent={() => navigation.goBack()} role="client" />
        {domains.length ? (
          <ScrollView horizontal style={styles.picker} showsHorizontalScrollIndicator={false}>
            {domains.map((el) => {
              return (
                <TouchableOpacity
                  key={el.domain_id}
                  onPress={() => {
                    setSelectedDomain(el);
                    setActiveDomain(el.domain_id);
                  }}
                  style={[
                    styles.pickerElement,
                    {
                      backgroundColor: selectedDomain && selectedDomain.domain_id === el.domain_id ? 'rgba(0,0,0, 0.3)' : 'rgba(53, 59, 79, 0.5)',
                    },
                  ]}
                >
                  {el.icon
                    ? !el.icon.includes('undefined') && (
                        <SvgXml style={{ marginRight: 10 }} xml={base64.decode(el.icon.replace('data:image/svg+xml;base64,', ''))} />
                      )
                    : null}
                  <Text style={styles.pickerText}>{el.title}</Text>
                </TouchableOpacity>
              );
            })}
            <View style={{ width: 50 }}></View>
          </ScrollView>
        ) : null}
        {loading && <Spinner color={themes.textColor} />}
        {!loading && !domains.length && <NoDataMessage text="No domains yet" themes={themes} />}
        {selectedDomain && !loading && !maladaptive && (
          <View style={{ marginTop: 20 }}>
            <View style={styles.filter}>
              <Text
                style={{
                  ...global.p5dark,
                  color: themes.textColor,
                  marginRight: 5,
                }}
              >
                Show:
              </Text>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setFilterOpened((prevState) => !prevState);
                }}
              >
                <Text
                  style={{
                    ...global.p5dark,
                    color: themes.textColor,
                    marginRight: 5,
                  }}
                >
                  {filter.name}
                </Text>
                <View style={{ marginTop: 3 }}>
                  <SvgXml xml={ArrowDown} stroke={themes.textColor} />
                </View>
              </TouchableOpacity>
              {filterOpened && (
                <View style={styles.filterModal}>
                  {filters.map((el) => {
                    return (
                      el.name !== filter.name && (
                        <TouchableOpacity
                          key={el.name}
                          onPress={() => {
                            setFilter(el);
                            setFilterOpened(false);
                          }}
                          style={{ marginBottom: 5, padding: 5, zIndex: 100 }}
                        >
                          <Text>{el.name}</Text>
                        </TouchableOpacity>
                      )
                    );
                  })}
                </View>
              )}
            </View>
            <TouchableOpacity style={{ zIndex: -1 }} onPress={() => setSkillsCollapsed((prevState) => !prevState)}>
              <Text
                style={[
                  global.p5dark,
                  styles.expandButton,
                  {
                    color: themes.darkerTextColor,
                  },
                ]}
              >
                {skillsCollapsed ? 'see all' : 'hide all'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!loading && (
          <>
            {maladaptive ? (
              <View
                style={{
                  flex: 1,
                  zIndex: -1,
                  marginTop: 10,
                  marginBottom: Platform.OS === 'android' ? scrollViewBottom + 40 : scrollViewBottom + 5,
                }}
              >
                <TargetSkillsFlatList
                  targetSkills={skills}
                  themes={themes}
                  client_id={client_id}
                  client_name={name + ' ' + surname}
                  navigation={navigation}
                  subDomainOpened={maladaptive}
                  loading={refreshing}
                  refresh={refresh}
                  loadMore={loadMore}
                  style={{
                    marginTop: 10,
                    marginBottom: Platform.OS === 'android' ? scrollViewBottom + 40 : scrollViewBottom + 5,
                  }}
                />
              </View>
            ) : (
              <ScrollView
                style={{
                  flex: 1,
                  zIndex: -1,
                  marginTop: 10,
                  marginBottom: Platform.OS === 'android' ? scrollViewBottom + 40 : scrollViewBottom + 5,
                }}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              >
                <DomainsList
                  domains={subDomains}
                  themes={themes}
                  client_id={client_id}
                  client_name={name + ' ' + surname}
                  skillsCollapsed={skillsCollapsed}
                  navigation={navigation}
                />
              </ScrollView>
            )}
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 19,
    marginBottom: 10,
  },
  domain: {
    width: '100%',
    height: 64,
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 12,
    paddingLeft: 23,
    paddingRight: 30,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 6,
      height: 20,
    },
    shadowOpacity: 0.018,
    shadowRadius: 50,
  },
  domainText: {
    maxWidth: SIZES.width * 0.55,
  },
  pickerElement: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 23,
    marginRight: 14,
    zIndex: 1000,
    borderRadius: 5,
    flexDirection: 'row',
  },
  pickerText: {
    ...global.p5White,
  },
  picker: {
    zIndex: 1000,
    // height: 90,
    marginTop: 26,
    maxHeight: 50,
    marginLeft: -SIZES.width * 0.06,
    paddingLeft: SIZES.width * 0.06,

    marginRight: -SIZES.width * 0.06,
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 10,
  },
  filterModal: {
    position: 'absolute',
    backgroundColor: 'white',
    top: '103%',
    borderRadius: 5,
    zIndex: 1000,
    width: 150,
    left: 20,
  },
  expandButton: {
    zIndex: 0,
    marginBottom: 0,
    marginLeft: 23,
  },
  filterOption: {},
});

export default connect(null, {
  clearRunning: dcmOperations.clearRunning,
  setIsUserNew: authOperations.setIsUserNew,
  setActiveDomain: dcmActions.setActiveDomain,
})(withGeneralBackground(Sessions));
