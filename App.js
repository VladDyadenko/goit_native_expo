import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { useFont } from "./assets/fonts/fontsExpoLoading";
import NavigationApp from "./NavigationApp";


export default function App() {
  const { fonts} = useFont();
  console.log(fonts)
 
  if (!fonts) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationApp />
      <StatusBar theme="auto" />
    </SafeAreaView>
  );
}
