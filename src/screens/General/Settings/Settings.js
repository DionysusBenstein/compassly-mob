import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, StyleSheet, ScrollView } from 'react-native';
import base64 from 'react-native-base64';
import ReactNativeBiometrics from 'react-native-biometrics';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { biometrics } from '../../../api/asyncStorage/biometricAuth';
import { deleteApi } from '../../../api/deleteApi';
import { post } from '../../../api/post';
import { ArrowRight } from '../../../assets/icons';
import { Header } from '../../../components';
import ProfileInfo from '../../../components/Settings/ProfileInfo';
import { global } from '../../../constants';
import withGeneralBackground from '../../../hoc/withGeneralBackground';
import { useBiometricsIsEnabled } from '../../../hooks/useBiometricsIsEnabled';
import authOperations from '../../../redux/auth/authOperations';

const menuButtons = [
  { name: 'Personal settings', route: 'PersonalSettings' },
  // { name: "FAQ", route: "FAQ" },
  { name: 'Support', route: 'Support' },
  { name: 'Company resources', route: 'CompanyResources' },
];

function Settings({ theme, themes, navigation }) {
  const [isEnabled, setIsEnabled] = useState(theme === 'light');
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [showBiometricSwitch, setShowBiometricSwitch] = useState(false);

  const toggleBiometrics = () => {
    !biometricsEnabled ? createKey() : sendPrompt();
    setBiometricsEnabled((prev) => !prev);
  };

  const { enabled } = useBiometricsIsEnabled();

  useEffect(() => {
    enabled !== null && setShowBiometricSwitch(true);
    if (enabled === true) {
      setBiometricsEnabled(true);
    } else if (!enabled || enabled === 'can be enabled') {
      setBiometricsEnabled(false);
    }
  }, [enabled]);

  const sendPrompt = () => {
    ReactNativeBiometrics.createSignature({
      promptMessage: 'Confirm fingerprint',
      payload: '',
    })
      .then((resultObject) => {
        const { success, signature } = resultObject;
        const id = base64.encode(signature);
        if (success) {
          if (biometricsEnabled) {
            setBiometricsEnabled(false);
            disableBiometrics(id);
          } else {
            setBiometricsEnabled(true);
            enableBiometrics(id);
          }
        } else {
          setBiometricsEnabled((prev) => !prev);
          console.log('user cancelled biometric prompt');
        }
      })
      .catch((e) => {
        setBiometricsEnabled((prev) => !prev);
        console.log('biometrics failed', e);
      });
  };

  const disableBiometrics = async (id) => {
    const res = await deleteApi(`/biometrics/${id}`);
    console.log('deletebio res==>', res);
    biometrics.remove();
  };

  const enableBiometrics = async (id) => {
    biometrics.enable();
    console.log(id);
    const res = await post(`/biometrics/${id}`);
    console.log('enable res', res);
  };

  const createKey = () => {
    ReactNativeBiometrics.createKeys('Confirm fingerprint')
      .then((resultObject) => {
        const { publicKey } = resultObject;
        sendPrompt();
        console.log(publicKey);
      })
      .catch((e) => console.log('create key error', e));
  };

  const deleteKey = () => {
    ReactNativeBiometrics.deleteKeys().then((resultObject) => {
      const { keysDeleted } = resultObject;

      if (keysDeleted) {
      } else {
        console.log('Unsuccessful deletion because there were no keys to delete');
      }
    });
  };

  const styles = StyleSheet.create({
    menu: {
      marginTop: 25,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 23,
      paddingRight: 33,
      paddingVertical: 23,
      borderBottomColor: themes.listBorderColor,
      borderBottomWidth: 1,
    },
    menuItemText: {
      ...global.p5dark,
      color: themes.textColor,
    },
    colorChangeItem: {
      paddingVertical: 23,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 23,
      paddingRight: 19,
    },
  });

  return (
    <SafeAreaView style={[global.container]}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ height: '100%', marginBottom: 110, marginTop: -10 }}>
        <Header header="Settings" role="client" />

        <View style={{ marginTop: 24 }}>
          <ProfileInfo name="Simone Doe" themes={themes} />
        </View>

        <View style={styles.menu}>
          {menuButtons.map((el) => {
            return (
              <TouchableOpacity style={styles.menuItem} key={el.route} onPress={() => navigation.navigate(`${el.route}`)}>
                <Text style={styles.menuItemText}>{el.name}</Text>
                <ArrowRight color={themes.textColor} />
              </TouchableOpacity>
            );
          })}
          {showBiometricSwitch && (
            <View style={styles.colorChangeItem}>
              <Text style={styles.menuItemText}>Enable biometric authentification</Text>
              <Switch
                // disabled
                trackColor={{ false: '1F25A0', true: '#865DDD' }}
                thumbColor={biometricsEnabled ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#1F25A0"
                onValueChange={toggleBiometrics}
                value={biometricsEnabled}
              />
            </View>
          )}
        </View>
        {/* <TouchableOpacity onPress={() => biometrics.remove()}>
          <Text>remove</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default connect(null, {
  addTheme: authOperations.getTheme,
})(withGeneralBackground(Settings));
