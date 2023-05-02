import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Auth/LoginScreen";
import Register from "../screens/Auth/RegistrationScreen";
import Home from "../screens/Main/Home";
import { useSelector } from "react-redux";
import  {getUser}  from "../Redux/auth/authSelectors";

const AuthStack = createStackNavigator();

const NavigationApp = () => {
  const user = useSelector(getUser);

  return (
    <NavigationContainer>
      {!user.currentUser && (
        <AuthStack.Navigator initialRouteName="Login">
          <AuthStack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          ></AuthStack.Screen>
          <AuthStack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          ></AuthStack.Screen>
        </AuthStack.Navigator>
      )}
      {user.currentUser && <Home />}
    </NavigationContainer>
  );
};

export default NavigationApp;
