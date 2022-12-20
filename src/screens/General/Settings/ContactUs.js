import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  ScrollView,
} from "react-native";
import withGeneralBackground from "../../../hoc/withGeneralBackground";
import { PlannerInput, CustomButton, SuccessModal } from "../../../components";
import { global } from "../../../constants";
import { Header } from "../../../components";
import withKeyboard from "../../../hoc/withKeyboard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import KeyboardListener from "react-native-keyboard-listener";
import contactUsSchema from "../../../validationSchemas/contacUsSchema";
import { Formik } from "formik";
import { post } from "../../../api/post";

function ContactUs({ navigation, themes, theme }) {
  const [keyboardIsShown, setKeyboardIsShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const scrollViewBottom = useBottomTabBarHeight();

  return (
    <SafeAreaView style={global.container}>
      <Header
        header="Contact us"
        backButtonEvent={() => {
          navigation.goBack();
        }}
        role="client"
      />
      <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }}>
        <KeyboardListener
          onDidShow={() => {
            Platform.OS === "android" && setKeyboardIsShown(true);
          }}
          onDidHide={() => {
            Platform.OS === "android" && setKeyboardIsShown(false);
          }}
          onWillShow={() => {
            setKeyboardIsShown(true);
          }}
          onWillHide={() => {
            setKeyboardIsShown(false);
          }}
        />
        <ScrollView
          style={{
            flex: 1,
            marginBottom: keyboardIsShown ? 0 : scrollViewBottom + 40,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{ ...global.h5White, textAlign: "center", marginTop: 20 }}
          >
            Do you need help?
          </Text>
          <Text
            style={{
              ...global.p5White,
              textAlign: "center",
              marginBottom: 41,
              marginTop: 10,
            }}
          >
            Compass support team will help you 24/7
          </Text>
          <Formik
            onSubmit={async (values, { resetForm }) => {
              console.log("asd");
              setLoading(true);
              const formdata = new FormData();
              formdata.append("email", values.email);
              formdata.append("message", values.message);
              const res = await post("/feedback", formdata);
              console.log("res", res);
              if (res) {
                setLoading(false);
                resetForm();
                setShowModal(true);
              } else {
                console.log("err => ", res.error);
              }
            }}
            initialValues={{ email: "", message: "" }}
            validationSchema={contactUsSchema}
            validateOnMount={true}
          >
            {({
              errors,
              values,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
            }) => {
              return (
                <>
                  <PlannerInput
                    placeholder="Enter your email address"
                    error={values.email && errors.email}
                    value={values.email}
                    onChangeText={handleChange("email")}
                    handleBlur={handleBlur("email")}
                  />
                  <PlannerInput
                    multiline
                    maxLength={2000}
                    inputMinHeight={200}
                    value={values.message}
                    onChangeText={handleChange("message")}
                    handleBlur={handleBlur("message")}
                    inputMaxHeight={200}
                    placeholder="Enter your message here"
                    style={{ marginTop: 10, marginBottom: 15 }}
                  />
                  <CustomButton
                    loading={loading}
                    onPress={handleSubmit}
                    disabled={!isValid || loading}
                    gradient={isValid ? "thunder" : "darkAshPurple"}
                    text="Send"
                  />
                </>
              );
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      {showModal && (
        <SuccessModal
          text="Thanks for your message!"
          showModal={showModal}
          theme={theme}
          toggleShowModal={() => setShowModal(false)}
        />
      )}
    </SafeAreaView>
  );
}

export default withKeyboard(withGeneralBackground(ContactUs));
