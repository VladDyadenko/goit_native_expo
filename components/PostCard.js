import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import ThumbsUpIcon from "../assets/icon/ThumbsUpIcon ";
import MessageCircleIcon from "../assets/icon/MessageCircleIcon ";
import MapPinIcon from "../assets/icon/MapPinIcon ";

export const PostCard = ({
  likeCount,
  title,
  location,
  locationData,
  imgUri,
  comments,
  post,
}) => {
  const { countComments } = post;

  const navigation = useNavigation();
  const onPressCommentsIcon = () => {
    navigation.navigate("Comments", { imgUri, comments, postId: post?.id });
  };
  return (
    <View style={style.container}>
      <Image style={style.image} source={{ uri: imgUri }} />
      <Text style={style.title}>{title}</Text>
      <View style={style.dataWrapper}>
        <View style={style.sentenceWrapper}>
          <TouchableOpacity
            style={[style.sentence, { marginRight: 24 }]}
            onPress={onPressCommentsIcon}
          >
            <MessageCircleIcon has={!!countComments} />
            <Text style={[style.sentenceText, style.sentenceTextInactive]}>
              {countComments}
            </Text>
          </TouchableOpacity>
          <View style={[style.sentence]}>
            <ThumbsUpIcon />
            <Text style={[style.sentenceText, style.sentenceTextInactive]}>
              {likeCount}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={style.sentence}
          onPress={() => navigation.navigate("Map", { location, locationData })}
        >
          <MapPinIcon />
          <Text style={style.sentenceText}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  title: {
    marginBottom: 8,
    fontFamily: "roboto500",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  dataWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sentenceWrapper: {
    flexDirection: "row",
  },
  sentence: {
    flexDirection: "row",
    alignItems: "center",
  },
  sentenceText: {
    marginLeft: 4,
    fontFamily: "roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
  },
  sentenceTextInactive: {
    color: "#BDBDBD",
  },
});
