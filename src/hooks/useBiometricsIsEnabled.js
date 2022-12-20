import ReactNativeBiometrics from "react-native-biometrics";
import { biometrics } from "../api/asyncStorage/biometricAuth";
import { useEffect, useState } from "react";

export const useBiometricsIsEnabled = () => {
  const [keyExist, setKeyExist] = useState(null);
  const [enabledFromLocalStorage, setEnabledFromLocalStorage] = useState(null);
  const [biometryType, setBiometryType] = useState("");

  useEffect(() => {
    checkBiometrics();
  }, []);

  useEffect(() => {}, [enabledFromLocalStorage]);

  const checkBiometrics = () => {
    ReactNativeBiometrics.isSensorAvailable()
      .then((resultObject) => {
        const { available, biometryType } = resultObject;
        setBiometryType(biometryType);
        const touchIdAvailable =
          available && biometryType === ReactNativeBiometrics.TouchID;
        const faceIdAvailable =
          available && biometryType === ReactNativeBiometrics.FaceID;
        const biometricsAvailable =
          available && biometryType === ReactNativeBiometrics.Biometrics;

        if (touchIdAvailable || faceIdAvailable || biometricsAvailable) {
          checkKeyExist();
          checkIsEnabled();
        } else {
        }
      })
      .catch((err) => console.log(err));
  };

  const checkKeyExist = () => {
    ReactNativeBiometrics.biometricKeysExist().then((resultObject) => {
      const { keysExist } = resultObject;

      if (keysExist) {
        setKeyExist(true);
      } else {
        createKey();
        setKeyExist(false);
      }
    });
  };

  const checkIsEnabled = async () => {
    const isEnabled = await biometrics.isEnabled();
    if (isEnabled === "true") {
      setEnabledFromLocalStorage(true);
    } else if (!isEnabled) {
      setEnabledFromLocalStorage("can be enabled");
    } else if (isEnabled === "false") {
      setEnabledFromLocalStorage(false);
    }
  };

  const createKey = async () => {
    await ReactNativeBiometrics.createKeys("Confirm fingerprint").then(
      (resultObject) => {
        const { publicKey } = resultObject;
        console.log(resultObject);
      }
    );
  };

  return { enabled: enabledFromLocalStorage, type: biometryType };
};
