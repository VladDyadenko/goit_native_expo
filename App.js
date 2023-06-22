import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import "react-native-gesture-handler";
import { useFont } from "./assets/fonts/fontsExpoLoading";
import NavigationApp from "./components/NavigationApp";
import { Provider } from "react-redux";
import { persistor, store } from "./Redux/store";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";
import { Text } from "react-native";

export default function App() {
  const { fonts } = useFont();

  if (!fonts) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate  loading={<Text>Loading...</Text>}  persistor={persistor}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationApp />
          <StatusBar theme="auto" />
        </SafeAreaView>
        <Toast />
      </PersistGate>
    </Provider>
  );
}
