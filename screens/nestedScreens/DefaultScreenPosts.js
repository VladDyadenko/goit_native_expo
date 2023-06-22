import { Text, View, StyleSheet, FlatList } from "react-native";
import { Image, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getUser } from "../../Redux/auth/authSelectors";
import { getPosts } from "../../Redux/posts/postsSelector";
import KayboardBox from "../../components/KayboardBox";
import { PostCard } from "../../components/PostCard";

const PostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useSelector(getUser);
  const posts = useSelector(getPosts);


  return (
    <KayboardBox>
      <View style={styles.container}>
        <View style={{ alignItems: "flex-start", width: "100%" }}>
          <View style={[styles.userCard, { marginBottom: 32 }]}>
            <Image source={{ uri: user.userAvatar }} style={styles.image} />
            <View>
              <Text style={styles.userCardName}>{user.nickname}</Text>
              <Text style={styles.userCardEmail}>{user.userEmail}</Text>
            </View>
          </View>
        </View>
        <View>
          <View>
            <PostCard />
          </View>
        </View>

        <Button title="go to map" onPress={() => navigation.navigate("Map")} />
        <Button
          title="go to Comments"
          onPress={() => navigation.navigate("Comments")}
        />
      </View>
    </KayboardBox>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userCardName: {
    fontFamily: "roboto700",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userCardEmail: {
    fontFamily: "roboto400",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
});
