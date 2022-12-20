import "react-native-gesture-handler";
import { registerRootComponent } from "expo";
import { name as appName } from "./app.json";

import App from "./App";
import {AppRegistry} from "react-native";

AppRegistry.registerComponent("main", () => App);
// registerRootComponent(App);

// if (Platform.OS === "web") {
//   const rootTag =
//     document.getElementById("root") || document.getElementById("main");
//   AppRegistry.runApplication("main", { rootTag });
// }
