import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import LogoutIcon from "../../assets/icon/LogoutIcon";
import { authLogOut } from "../../Redux/auth/authOperetions";

const NestedScreen = createStackNavigator();

const PostsScreen = () => {
  const dispatch = useDispatch();

  const handelOutLogin = () => {
    dispatch(authLogOut());
  };

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          title: "Публікації",
          headerStyle: {},
          headerTitleStyle: {
            fontFamily: "roboto500",
            fontSize: 17,
            lineHeight: 22,
            textAlign: "center",
            color: "#212121",
          },
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={handelOutLogin}
            >
              <LogoutIcon />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};

export default PostsScreen;
