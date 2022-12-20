import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import { get } from '../../../api/get';
import { Header, NoDataMessage, ResourcesLink, Spinner } from '../../../components';
import { global } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';

const CompanyResources = ({ navigation, themes }) => {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getResources = async () => {
    let res = await get(`/company-resources`);

    if (!res.error) {
      setLoading(false);
      setResources(res.result.data);
    }
  };

  useEffect(() => {
    getResources();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getResources().then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => <ResourcesLink name={item.title} link={item.link} />;

  return (
    <>
      <SafeAreaView style={[global.safeAreaContainer]}>
        {loading && <Spinner color={themes.textColor} />}
        {!resources.length && !loading && <NoDataMessage text="No resources in the list" themes={themes} />}

        <Header backButtonEvent={() => navigation.goBack()} header="Company resources" role="client" />
        <FlatList
          data={resources}
          renderItem={renderItem}
          keyExtractor={(item) => item.create_date + item.created_time + item.id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </SafeAreaView>
    </>
  );
};

export default withGeneralBackground(CompanyResources);
