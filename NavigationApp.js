import Login from "./screens/Auth/LoginScreen";
import Register from "./screens/Auth/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const AuthStack = createStackNavigator();

const NavigationApp = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
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
    </NavigationContainer>
  );
};

export default NavigationApp;
