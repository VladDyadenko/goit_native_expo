import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useFont } from "../assets/fonts/fontsExpoLoading";
import styles from "../screens/Auth/authStyle";

const KayboardBox = ({ children, keyboardHide }) => {
  const { fonts, onLayoutRootView } = useFont();

  if (!fonts) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        style={{ flex: 1, maxHeight: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default KayboardBox;
