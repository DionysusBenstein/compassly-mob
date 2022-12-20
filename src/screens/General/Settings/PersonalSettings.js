import React, { useState, useEffect } from "react";
import { SafeAreaView, Platform, TouchableOpacity, Text } from "react-native";
import { Header, Blur } from "../../../components";
import withGeneralBackground from "../../../hoc/withGeneralBackground";
import ProfileInfo from "../../../components/Settings/ProfileInfo";
import { connect, useSelector } from "react-redux";
import authOperations from "../../../redux/auth/authOperations";
import dcmOperations from "../../../redux/dcm/dcmOperations";
import { global, COLORS, SIZES } from "../../../constants";
import { CommonActions } from "@react-navigation/native";
import SaveAttempt from "../../../components/SessionModals/SaveAttempt";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import OpenCameraModal from "../../../components/OpenCameraModal";
import { post } from "../../../api/post";
import { getToken } from "../../../api/asyncStorage/token";

function PersonalSettings({
  navigation,
  themes,
  clearError,
  clearToken,
  clearRunning,
  clearActiveUser,
  getCurrentUser,
  theme,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cameraModalIsOpen, setCameraModalIsOpen] = useState(false);
  const [choosenImage, setChoosenImage] = useState(null);

  useEffect(() => {
    if (choosenImage) {
      setCameraModalIsOpen(false);
      loadImage();
    }
  }, [choosenImage]);

  const logOut = async () => {
    await clearToken();
    clearError();
    clearRunning();
    clearActiveUser();
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      })
    );
  };

  const openLibrary = () => {
    launchImageLibrary(
      { mediaType: "photo", quality: 0.5, maxWidth: 400, maxHeight: 400 },
      ({ assets }) => {
        setChoosenImage(assets);
      }
    );
  };

  const openCamera = () => {
    launchCamera(
      { mediaType: "photo", quality: 0.5, maxWidth: 400, maxHeight: 400 },
      ({ assets }) => {
        setChoosenImage(assets);
      }
    );
  };

  const userId = useSelector((state) => state.auth.currentUser.id);

  const loadImage = async () => {
    const formdata = new FormData();
    formdata.append("file", {
      name: choosenImage[0].fileName + new Date().toDateString(),
      type: choosenImage[0].type,
      uri: choosenImage[0].uri,
    });
    const res = await post(`/avatar/${userId}`, formdata);
    if (res.result) {
      console.log("res", res.result);
      const token = await getToken();
      getCurrentUser(token);
    } else {
      console.log("avatar error", res.error);
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          backButtonEvent={() => navigation.goBack()}
          header="Personal Settings"
          role="client"
        />

        <ProfileInfo
          name="Simone Doe"
          themes={themes}
          style={{ marginTop: 28 }}
          buttonEvent={() => {
            setCameraModalIsOpen(true);
          }}
          photo={choosenImage}
        />

        <TouchableOpacity
          onPress={() => {
            setModalIsOpen(true);
          }}
          style={{
            width: SIZES.width * 0.88,
            alignSelf: "center",
            height: 51,
            position: "relative",
            overflow: "hidden",
            borderRadius: 12,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "rgba(192, 188, 232, 0.59)",
            marginTop: 35,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {Platform.OS === "ios" && <Blur theme={theme} />}
          <Text style={{ ...global.p5dark, color: "#F86B6B" }}>Log Out</Text>
        </TouchableOpacity>
        {cameraModalIsOpen && (
          <OpenCameraModal
            openCamera={openCamera}
            openGallery={openLibrary}
            showModal={cameraModalIsOpen}
            themes={themes}
            closeModal={() => setCameraModalIsOpen(false)}
          />
        )}
      </SafeAreaView>

      {modalIsOpen && (
        <SaveAttempt
          showModal={modalIsOpen}
          closeModal={() => setModalIsOpen(false)}
          text="Are you sure you want to log out?"
          themes={themes}
          cancelColor={COLORS.red}
          confirmGradient="thunder"
          confirmText="Log out"
          cancelText="Discard"
          onSubmit={logOut}
          onCancel={() => setModalIsOpen(false)}
        />
      )}
    </>
  );
}

export default connect(null, {
  clearToken: authOperations.unsetToken,
  clearError: authOperations.clearError,
  clearRunning: dcmOperations.clearRunning,
  clearActiveUser: dcmOperations.clearActiveUser,
  getCurrentUser: authOperations.getCurrentUser,
})(withGeneralBackground(PersonalSettings));
