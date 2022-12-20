import React from 'react';
import { View, Text, StyleSheet, PermissionsAndroid, Linking, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';

import RNFetchBlob from 'rn-fetch-blob';

import api_url from '../api/api_url';
import { gradientBorder2, download } from '../assets/icons';
import { linkButton } from '../assets/icons/Planner';
import { global } from '../constants';
import cutText from '../utils/cutText';

const textLimit = 15;

export default function MaterialsList({ materials, themes, clientName, clientId }) {
  const styles = StyleSheet.create({
    client: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 23,
      paddingRight: 18,
      paddingVertical: 23,
      borderBottomColor: themes.listBorderColor,
      borderBottomWidth: 1,
      flexWrap: 'wrap',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 15,
      borderRadius: 5,
      overflow: 'hidden',
    },
    icon: { position: 'absolute' },
  });

  const checkPermission = async (fileUrl) => {
    if (Platform.OS === 'ios') {
      downloadFile(fileUrl);
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Storage Permission Required',
          message: 'Application needs access to your storage to download File',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile(fileUrl);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = (fileUrl) => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = `${api_url}/materials/${encodeURI(fileUrl)}`;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const { config, fs } = RNFetchBlob;
    let RootDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    let androidOptions = {
      fileCache: true,
      addAndroidDownloads: {
        path: RootDir + `/${clientName}_` + Math.floor(date.getTime() + date.getSeconds() / 2) + file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };

    const iosOptions = Platform.select({
      ios: {
        notification: true,
        fileCache: true,
        title: clientName,
        path: RootDir + '/file_' + Math.floor(date.getTime() + date.getSeconds() / 2) + file_ext,
      },
    });
    config(Platform.OS === 'ios' ? iosOptions : androidOptions)
      .fetch('GET', FILE_URL)
      .progress((received, total) => {
        console.log('progress', received / total);
      })
      .then((res) => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.fs.writeFile(iosOptions.path, res.data, 'base64');
          RNFetchBlob.ios.previewDocument(iosOptions.path);
        }
        console.log('res -> ', JSON.stringify(res));
      });
  };

  const getFileExtention = (fileUrl) => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const handleOpenLink = (material) => {
    if (material.format === 'link') {
      Linking.openURL(material.link);
    } else {
      checkPermission(material.title);
    }
  };

  const openLinkIcon = (material) => (
    <>
      {material.format !== 'link' && (
        <View style={styles.button}>
          <SvgXml xml={gradientBorder2} />
          <SvgXml style={styles.icon} xml={download} fill={themes.textColor} />
        </View>
      )}

      {material.format === 'link' && (
        <View style={styles.button}>
          <SvgXml xml={linkButton} />
        </View>
      )}
    </>
  );

  return (
    <View>
      {materials.map((material) => {
        return (
          <Pressable
            onPress={() => handleOpenLink(material)}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
              },
              styles.client,
            ]}
            key={material.id}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', flexBasis: '80%', justifyContent: 'space-between' }}>
              <Text style={[global.p5dark, styles.clientText, { color: themes.textColor, maxWidth: '57%' }]}>{cutText(material.title, textLimit)}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[global.p5dark, styles.clientText, { color: themes.textColor, marginRight: 10 }]}>
                  {new Date(material.create_date).toLocaleDateString('en-US')}
                </Text>
              </View>
            </View>
            {openLinkIcon(material)}
          </Pressable>
        );
      })}
    </View>
  );
}
