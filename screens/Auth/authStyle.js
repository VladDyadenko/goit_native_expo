import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: "#fff",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  input: {
    fontFamily: "roboto400",
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: "100%",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
  },
  containerAvatar: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    position: "relative",
    backgroundColor: "#fff",
    paddingTop: 92,
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
  },
  title: {
    fontFamily: "roboto500",
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  btn: {
    width: "100%",
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    height: 51,
    borderRadius: 100,
    marginTop: 28,
    marginBottom: 16,
  },
  btnText: {
    fontFamily: "roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#fff",
  },
  text: {
    fontFamily: "roboto400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
  btnInputText: {
    fontFamily: "roboto400",
    fontSize: 16,
    lineHeight: 19,
    color: "#1B4371",
  },
});

export default styles;
