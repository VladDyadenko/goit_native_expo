import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../Redux/posts/postsSelector";
import { getUser } from "../../Redux/auth/authSelectors";
import {
  addCommentByPostID,
  getAllCommentsByPostId,
  getAllPosts,
  getOwnPosts,
} from "../../Redux/posts/postsOperetions";
import KayboardBox from "../../components/KayboardBox";
import RoundUpIcon from "../../assets/icon/RoundUpIcon ";

const CommentsScreen = () => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const route = useRoute();
  const { postId, imgUri } = route.params;
  const comments = useSelector(getComments);

  const sortedComments = [...comments].sort((a, b) => {
    return b.dateSort - a.dateSort;
  });
  const { userId } = useSelector(getUser);

  useEffect(() => {
    dispatch(getAllCommentsByPostId(postId));
    return () => {
      dispatch(getAllPosts());
      dispatch(getOwnPosts());
    };
  }, [dispatch, postId]);

  const createPost = () => {
    dispatch(addCommentByPostID(postId, comment));
    setComment("");
  };

  return (
    <KayboardBox>
      <View style={styles.container}>
        <FlatList
          style={{ paddingHorizontal: 16 }}
          data={sortedComments}
          ListHeaderComponent={
            <View style={{ paddingVertical: 32 }}>
              <Image style={styles.image} source={{ uri: imgUri }} />
            </View>
          }
          renderItem={({ item }) => {
            const isOwner = item.authorId === userId;

            return (
              <View
                style={[
                  styles.containerItem,
                  { flexDirection: isOwner ? "row-reverse" : "row" },
                ]}
              >
                <Image
                  source={{ uri: item.userAvatar }}
                  style={[
                    styles.authorAvatar,
                    { [isOwner ? "marginLeft" : "marginRight"]: 16 },
                  ]}
                />
                <View
                  style={[
                    styles.commentWrapper,
                    {
                      [isOwner
                        ? "borderTopRightRadius"
                        : "borderTopLeftRadius"]: 0,
                    },
                  ]}
                >
                  <Text style={styles.commentAuthor}>{item.comment}</Text>
                  <Text
                    style={[
                      styles.commentDate,
                      { textAlign: isOwner ? "left" : "right" },
                    ]}
                  >
                    {item.date}
                  </Text>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
          ListEmptyComponent={
            <View
              style={{
                height: 50,
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>У вас ще не має коментарів</Text>
            </View>
          }
          ListFooterComponent={() => <View style={{ height: 30 }} />}
        />
        <View style={styles.containerFooter}>
          <View>
            <TextInput
              value={comment}
              onChangeText={(text) => setComment(text)}
              placeholder="Коментувати..."
              placeholderTextColor="#BDBDBD"
              style={styles.commentInput}
            />
            <TouchableOpacity
              style={styles.iconWrapper}
              onPress={createPost}
              activeOpacity={0.7}
            >
              <RoundUpIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KayboardBox>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: { width: "100%", height: 240, borderRadius: 8 },
  containerItem: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  authorAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  commentWrapper: {
    flex: 1,
    padding: 16,

    backgroundColor: " rgba(0, 0, 0, 0.03)",
    borderRadius: 16,
  },
  commentAuthor: {
    marginBottom: 8,

    fontFamily: "roboto400",
    fontSize: 13,
    lineHeight: 18,

    color: "#212121",
  },
  commentDate: {
    fontFamily: "roboto400",
    fontSize: 10,
    lineHeight: 12,

    color: "#BDBDBD",
  },

  containerFooter: {
    paddingHorizontal: 16,
    paddingBottom: 16,

    backgroundColor: "#FFFFFF",
  },
  commentInput: {
    position: "relative",
    fontFamily: "inter500",
    height: 50,
    padding: 16,
    paddingRight: 50,

    fontSize: 14,
    lineHeight: 19,

    backgroundColor: "#F6F6F6",
    color: "#212121",

    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
  },
  iconWrapper: {
    position: "absolute",
    right: 8,
    bottom: 8,

    width: 34,
    height: 34,
  },
});
