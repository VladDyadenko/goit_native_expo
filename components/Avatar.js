import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import uploadPhotoToServer, {
  firebaseStore,
} from "../firebase/uploadPotoToServer";
import AddIconAvatar from "../assets/icon/AddIconAvatar";
import DeleteIconAvatar from "../assets/icon/DeleteIconAvatar";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../Redux/auth/authSelectors";
import { authUpdateAvatar } from "../Redux/auth/authOperetions";

const Avatar = ({ avatarImg, setAvatarImg }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const addImage = async () => {
    if (avatarImg) {
      dispatch(authUpdateAvatar(""));
      setAvatarImg("");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const photoUrl = await uploadPhotoToServer(
        result.assets[0].uri,
        firebaseStore.avatar
      );
      setAvatarImg(photoUrl);
      if (user.currentUser) {
        dispatch(authUpdateAvatar(photoUrl));
      }
    }
  };

  return (
    <View style={styles.containerAvatar}>
      {avatarImg && <Image style={styles.img} source={{ uri: avatarImg }} />}
      <TouchableOpacity style={styles.btnAvatar} onPress={addImage}>
        {!avatarImg ? <AddIconAvatar /> : <DeleteIconAvatar />}
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
