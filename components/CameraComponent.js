import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Constants from "expo-constants";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "./Button";
import * as Location from "expo-location";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function CameraComponent({
  onDataPictureTaken,
  resetPhoto,
  setResetPhoto,
}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (resetPhoto) {
      setImage(null);
      setResetPhoto(false);
    }
  }, [resetPhoto]);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        let location = await Location.getCurrentPositionAsync({});
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setImage(data.uri);
        onDataPictureTaken(data, coords);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera
          style={styles.camera}
          type={type}
          ref={cameraRef}
          flashMode={flash}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 30,
            }}
          >
            <Button
              title=""
              icon="retweet"
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <Button
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
              icon="flash"
              color={flash === Camera.Constants.FlashMode.off ? "gray" : "#fff"}
            />
          </View>
          <View style={styles.boxCamera}>
            <View style={styles.btnCamera}>
              <TouchableOpacity onPress={takePicture}>
                <SimpleLineIcons name="camera" size={20} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          </View>
        </Camera>
      ) : (
        <View style={styles.imgContainer}>
          <Image source={{ uri: image }} style={styles.camera} />
          {image && (
            <View style={{ position: "absolute", top: 10, left: 10 }}>
              <Button
                title="Re-take"
                onPress={() => setImage(null)}
                icon="retweet"
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  controls: {
    flex: 0.5,
  },
  boxCamera: {
    position: "relative",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCamera: {
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "#E9730F",
    marginLeft: 10,
  },
  camera: {
    position: "relative",
    height: 240,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  imgContainer: {
    position: "relative",
  },
});
