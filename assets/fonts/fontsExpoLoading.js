import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";

export const useFont = () => {
  const [fonts, setFonts] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          roboto400: require("./Roboto-Regular.ttf"),
          roboto500: require("./Roboto-Medium.ttf"),
          roboto700: require("./Roboto-Bold.ttf"),
          inter500: require("./Inter-Medium.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setFonts(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fonts) {
      await SplashScreen.hideAsync();
    }
  }, [fonts]);

  return { fonts, onLayoutRootView };
};
