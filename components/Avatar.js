import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import AddIconAvatar from "../assets/icon/AddIconAvatar";
import DeleteIconAvatar from "../assets/icon/DeleteIconAvatar";

const Avatar = () => {
  return (
    <View style={styles.containerAvatar}>
      <Image
        style={styles.img}
        source={require("../assets/Image/avatar_img.png")}
      />
      <TouchableOpacity style={styles.btnAvatar}>
        <AddIconAvatar />
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;
const styles = StyleSheet.create({
  containerAvatar: {
    position: "relative",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  btnAvatar: {
    position: "absolute",
    right: -12,
    bottom: 14,
    width: 25,
    height: 25,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
});
