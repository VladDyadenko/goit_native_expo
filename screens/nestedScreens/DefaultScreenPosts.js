import { Text, View, StyleSheet } from "react-native";
import { Image, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/auth/authSelectors";
import { getPosts } from "../../Redux/posts/postsSelector";
import KayboardBox from "../../components/KayboardBox";
import { PostCard } from "../../components/PostCard";
import { useEffect } from "react";
import { getAllPosts, getOwnPosts } from "../../Redux/posts/postsOperetions";
import { ScrollView } from "react-native-gesture-handler";

const DefaultScreenPosts = () => {
  const navigation = useNavigation();
  const user = useSelector(getUser);
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  }, [dispatch]);

  return (
    <KayboardBox>
      <ScrollView style={{ flex: 1 }}>
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

          <View style={{ flex: 1, width: "100%" }}>
            {posts?.map((post) => (
              <View key={post.id} style={{ marginBottom: 32, width: "100%" }}>
                <PostCard
                  title={post.title}
                  likeCount={post.likeCount}
                  imgUri={post.imgUri}
                  location={post.location}
                  locationData={post.locationData}
                  comments={post.comments}
                  countComments={post.countComments}
                  post={post}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </KayboardBox>
  );
};

export default DefaultScreenPosts;

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
