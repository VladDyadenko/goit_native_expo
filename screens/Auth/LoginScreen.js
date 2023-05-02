import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";
import { useDispatch } from "react-redux";
import { authLogin } from "../../Redux/auth/authOperetions";

import KayboardBox from "../../components/KayboardBox";
import styles from "./authStyle";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (state.email === "" || state.password === "") {
      Toast.show({
        type: "error",
        text1: "Form error:",
        text2: "Email, Password повинні бути заповнені.",
      });
      return;
    }
    dispatch(authLogin(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setisShowKeyboard(false);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KayboardBox keyboardHide={keyboardHide}>
      <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 32 : 78 }}>
        <Text style={styles.title}>Увійти</Text>

        <TextInput
          style={{ ...styles.input, marginBottom: 16 }}
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholder="Адреса електронної пошти"
          onFocus={() => {
            setisShowKeyboard(true);
          }}
          value={state.email}
          onChangeText={(val) =>
            setState((prevState) => ({ ...prevState, email: val }))
          }
        />

        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            style={{
              ...styles.input,
              marginBottom: isShowKeyboard ? 0 : 43,
            }}
            secureTextEntry={!isPasswordVisible}
            placeholder="Пароль"
            onFocus={() => {
              setisShowKeyboard(true);
            }}
            value={state.password}
            onChangeText={(val) =>
              setState((prevState) => ({ ...prevState, password: val }))
            }
          />

          <View style={{ position: "absolute", top: 0, right: 0 }}>
            <TouchableOpacity
              style={{
                ...styles.btnInput,
                marginVertical: 16,
                marginRight: 16,
              }}
              onPress={togglePasswordVisibility}
            >
              <Text style={styles.btnInputText}>
                {isPasswordVisible ? "Приховати" : "Показати"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {!isShowKeyboard && (
          <>
            <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
              <Text style={styles.btnText}>Увійти</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.text}>
                Немає акаунта?<Text style={styles.text}>Зареєструватися</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KayboardBox>
  );
}
