import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
} from "react-native";

import Avatar from "../../components/Avatar";
import KayboardBox from "../../components/KayboardBox";
import styles from "./authStyle";

const initialState = {
  nickname: "",
  email: "",
  password: "",
};

export default function Register({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setisShowKeyboard] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const keyboardHaide = () => {
    setisShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KayboardBox keyboardHaide={keyboardHaide}>
      <View style={{ ...styles.form, paddingBottom: isShowKeyboard ? 32 : 78 }}>
        <View style={styles.containerAvatar}>
          <Avatar />
        </View>
        <Text style={styles.title}>Реєстрація</Text>
        <TextInput
          style={{ ...styles.input, marginBottom: 16 }}
          keyboardType="email-address"
          placeholder="Логін"
          onFocus={() => {
            setisShowKeyboard(true);
          }}
          value={state.nickname}
          onChangeText={(val) =>
            setState((prevState) => ({ ...prevState, nickname: val }))
          }
        />
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
            <TouchableOpacity onPress={keyboardHaide} style={styles.btn}>
              <Text style={styles.btnText}>Зареєструватися</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.text}>
                Вже є акаунт?<Text style={styles.text}>Увійти</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </KayboardBox>
  );
}
