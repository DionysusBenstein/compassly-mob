import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
import InternetConnectionAlert from "react-native-internet-connection-alert";

import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";

import StackNavigation from "./src/navigation/StackNavigation";
import SplashScreen from "react-native-splash-screen";

export default function App({ addTheme }) {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [connection, setConnection] = useState(false);
  console.log(addTheme);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <InternetConnectionAlert
          onChange={(connectionState) => {
            setConnection((prevState) => !prevState);
          }}
          title="Your connection is unstable"
          message="Please, make sure you have access to
          the internet and try to reconnect"
        >
          <StackNavigation isConnected={connection} />
        </InternetConnectionAlert>
      </PersistGate>
    </Provider>
  );
}
