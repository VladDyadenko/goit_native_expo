import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import GridIcon from "../../assets/icon/GridIcon";
import NewPostIcon from "../../assets/icon/NewPostIcon";
import { SimpleLineIcons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Home = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <GridIcon name="grid" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <NewPostIcon name="new_posts" size={size} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <SimpleLineIcons name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
