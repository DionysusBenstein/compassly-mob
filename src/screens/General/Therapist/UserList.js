import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";
import withGeneralBackground from "../../../hoc/withGeneralBackground";
import { COLORS, global } from "../../../constants";
import {
  Header,
  ClientsList,
  Spinner,
  NoDataMessage,
} from "../../../components";
import { tabProfile } from "../../../assets/icons";
import { SvgXml } from "react-native-svg";
import { get } from "../../../api/get";
import { connect } from "react-redux";
import dcmOperations from "../../../redux/dcm/dcmOperations";

function UserList({ theme, navigation, themes, setActiveUser }) {
  const [clients, setClients] = useState([]);
  const [clientsAmount, setClientsAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const getClients = async () => {
    let res = await get("/clients");
    if (!res.error) {
      setLoading(false);
      setClients(res.result.data);
      setClientsAmount(res.result.counts);
      console.log("userList ==> res", res);
    }
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getClients().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getClients();
  }, []);

  return (
    <SafeAreaView style={[global.safeAreaContainer]}>
      {loading && <Spinner color={themes.textColor} />}
      {clientsAmount === 0 && !loading && (
        <NoDataMessage text="No clients in the list" themes={themes} />
      )}
      <Header theme={theme} name="Basilius Lina" />
      <View style={styles.header}>
        <SvgXml
          xml={tabProfile}
          fill={theme === "dark" ? "#D1D3D7" : COLORS.darkAshPurple}
          width={16}
          height={16}
        />
        <Text
          style={
            (global.p5dark,
            {
              color: themes.textColor,
              marginLeft: 10,
            })
          }
        >
          Client list
        </Text>
      </View>
      <ScrollView
        style={{ marginBottom: 110 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
          />
        }
      >
        <ClientsList
          clients={clients}
          themes={themes}
          navigation={navigation}
          setActiveUser={(user) => {
            setActiveUser(user);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    marginBottom: 15,
  },
  text: {
    marginTop: 50,
    textAlign: "center",
  },
});

export default connect(null, { setActiveUser: dcmOperations.setActiveUser })(
  withGeneralBackground(UserList)
);
