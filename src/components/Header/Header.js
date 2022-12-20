import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';

import { useNavigation, useRoute } from '@react-navigation/native';

import api_url from '../../api/api_url';
import { ArrowLeft, materials } from '../../assets/icons';
import HeaderDoctor from '../../assets/icons/General/HeaderDoctor';
import HeaderUser from '../../assets/icons/General/HeaderUser';
import { global, SIZES } from '../../constants';
import getInitials from '../../utils/getInitials';

export default function Header({ theme, backButtonEvent = null, name = '', role, header = null }) {
  const styles = StyleSheet.create({
    header: {
      zIndex: 100,
      width: SIZES.width * 0.88,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: !role && Platform.OS === 'android' ? 0 : 20,
      height: header && name ? 120 : 50,
      marginBottom: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: header && name ? 'flex-start' : 'center',
    },
    headerText: {
      ...global.p5dark,
      color: theme === 'light' ? '#353B4F' : '#FFFFFF',
      marginBottom: header && name ? 25 : 0,
      width: 200,
      alignSelf: 'center',
      textAlign: 'center',
    },
    backButton: {
      width: 20,
      left: 3,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    },
    bar: {
      height: '100%',
      width: backButtonEvent ? SIZES.width * 0.78 : '100%',
      borderRadius: 12,
      overflow: 'hidden',
    },
    imageBg: {
      width: role === 'client' ? 61 : 57,
      height: 61,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    barInfo: {
      flexDirection: 'row',
    },
    name: {
      marginLeft: 23,
      marginRight: 13,
    },
    role: {
      opacity: 0.8,
    },
    defaultIcon: {
      position: 'absolute',
      right: 20,
      bottom: 21,
    },
  });

  const navigation = useNavigation();
  const route = useRoute();

  const currentUser = useSelector((state) => state.auth.currentUser);
  const headerName = role === 'client' ? name : currentUser.name + ' ' + currentUser.surname;
  const avatar = currentUser.avatar ? `${api_url}/users/${currentUser.avatar}` : null;

  // getInitials();
  return (
    <View style={styles.header}>
      {backButtonEvent && (
        <TouchableOpacity style={styles.backButton} onPress={backButtonEvent} hitSlop={global.hitslop}>
          <ArrowLeft color={theme === 'light' ? '#353B4F' : '#FFFFFF'} />
        </TouchableOpacity>
      )}

      <View style={{ justifyContent: 'center' }}>
        {header ? <Text style={styles.headerText}>{header}</Text> : null}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // position: "absolute",
            alignSelf: 'center',
          }}
        >
          {name ? !role ? <HeaderDoctor image={avatar} /> : <HeaderUser /> : null}

          {role === 'client' || (!avatar && !role) ? (
            <Text
              style={[
                global.p5White,
                {
                  alignSelf: 'center',
                  textAlign: 'center',
                  position: 'absolute',
                },
              ]}
            >
              {getInitials(headerName).trimEnd().trimStart()}
            </Text>
          ) : null}

          {role === 'client' && name && name !== 'Select Client' && route.name !== 'Downloads' ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Planner');
              }}
              style={{ position: 'absolute', bottom: -5, right: -5 }}
            >
              <SvgXml xml={materials} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}
