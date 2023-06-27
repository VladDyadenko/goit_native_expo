import React, { useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/auth/authSelectors";
import { useState } from "react";
import KayboardBox from "../../components/KayboardBox";
import Avatar from "../../components/Avatar";
import { authLogOut } from "../../Redux/auth/authOperetions";
import LogOutIcon from "../../assets/icon/LogoutIcon";
import { PostCard } from "../../components/PostCard";
import { getAllPosts, getOwnPosts } from "../../Redux/posts/postsOperetions";
import { getUserPosts } from "../../Redux/posts/postsSelector";

const Empty = ({ height, ...another }) => (
  <View style={{ backgroundColor: "#ffffff", height }} {...another} />
);

const ProfileScreen = () => {
  const user = useSelector(getUser);
  const [avatarImg, setAvatarImg] = useState(user.userAvatar);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  }, [dispatch]);

  const posts = useSelector(getUserPosts)
    .slice()
    .sort((a, b) => {
      return b.createdAT - a.createdAT;
    });

  return (
    <KayboardBox>
      <ImageBackground
        source={require("../../assets/Image/PhotoBG.png")}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <FlatList
              style={{ flex: 1, width: "100%" }}
              data={posts}
              ListHeaderComponent={
                <View style={styles.inner}>
                  <View style={styles.avatarWrapper}>
                    <View style={styles.avatar}>
                      <Avatar
                        avatarImg={avatarImg}
                        setAvatarImg={setAvatarImg}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => dispatch(authLogOut())}
                    style={styles.exitBtn}
                  >
                    <LogOutIcon />
                  </TouchableOpacity>

                  <Text style={[styles.titleNick]}>{user.nickname}</Text>
                </View>
              }
              ItemSeparatorComponent={() => <Empty height={32} />}
              renderItem={({ item }) => (
                <View style={styles.cardView}>
                  <PostCard
                    title={item.title}
                    likeCount={item.likeCount}
                    imgUri={item.imgUri}
                    location={item.location}
                    locationData={item.locationData}
                    comments={item.comments}
                    countComments={item.countComments}
                    post={item}
                  />
                </View>
              )}
              ListEmptyComponent={
                <View
                  style={{
                    width: "100%",
                    height: 100,
                    backgroundColor: "#ffffff",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>У вас ще не має постів</Text>
                </View>
              }
              ListFooterComponent={<Empty height={43} />}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </KayboardBox>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: { flex: 1, width: "100%" },
  cardView: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    width: "100%",
  },
  backgroundImage: {
    flex: 1,

    backgroundColor: "#fff",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  inner: {
    position: "relative",
    flex: 1,
    width: "100%",
    marginTop: 147,
    paddingTop: 92,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: { position: "absolute" },
  exitBtn: {
    position: "absolute",
    right: 0,
    top: 6,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  titleNick: {
    paddingBottom: 32,
    fontFamily: "roboto400",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    color: "#212121",
  },
});
