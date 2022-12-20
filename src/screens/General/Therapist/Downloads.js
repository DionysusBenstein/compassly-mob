import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Platform, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';

import { get } from '../../../api/get';
import { Header, MaterialsList, Spinner, NoDataMessage } from '../../../components';
import { global } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';

function Downloads({ theme, navigation, route, themes }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const activeUser = useSelector((state) => state.dcm.activeUser);

  const getMaterials = async () => {
    let res = await get(`/materials/${activeUser.client_id}`);
    if (!res.error) {
      setLoading(false);
      setMaterials(res.result.data);
    } else {
      console.log('rerror', res.error);
    }
  };
  useEffect(() => {
    if (activeUser) {
      getMaterials();
    }
  }, [activeUser]);

  const { name, surname } = activeUser;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMaterials().then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={[global.safeAreaContainer]}>
      {loading && <Spinner color={themes.textColor} />}
      {!materials.length && !loading && !refreshing && <NoDataMessage text="No materials in the list" themes={themes} />}
      <Header
        theme={theme}
        name={name + ' ' + surname}
        role={'client'}
        backButtonEvent={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.header}>
        <Text style={[global.p5dark, { color: themes.textColor, textAlign: 'center' }]}>Materials</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <MaterialsList clientName={name + surname} clientId={activeUser.client_id} materials={materials} themes={themes} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  text: {
    marginTop: 50,
    textAlign: 'center',
  },
});

export default withGeneralBackground(Downloads);
