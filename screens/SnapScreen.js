import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Svg, { Polygon, Line } from "react-native-svg";
import { Camera } from "expo-camera";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { setImage } from "../reducers/clothes";
import { CLOUDINARY_URL } from "@env";
//import { LOCAL_BACKEND_URL } from "@env";

export default function SnapScreen({ navigation }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.auto);

  const dispatch = useDispatch();

  let cameraRef = useRef(null);

  const takePicture = async () => {
    const photo = await cameraRef.takePictureAsync({ quality: 0.5, flash });
    console.log(photo);

    const formData = new FormData();

    formData.append("file", {
      uri: photo.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    formData.append('upload_preset', 'DressMeUp');

    fetch(`${CLOUDINARY_URL}`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("dataPict", data);
        dispatch(setImage(data.secure_url));
        navigation.navigate("CreateClotheF");
      });
  };

  return (
    <Camera type={type} ref={(ref) => (cameraRef = ref)} style={styles.camera} flashMode={flash}>
      <View style={styles.cameraContainer}>
        <TouchableOpacity
          onPress={() =>
            setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
          }
          style={styles.button}>
          <FontAwesome name="rotate-right" size={30} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            setFlash(
              flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.on
                : flash === Camera.Constants.FlashMode.on
                ? Camera.Constants.FlashMode.auto
                : Camera.Constants.FlashMode.off
            )
          }
          style={styles.button}>
          <Svg viewBox="0 0 24 24" width="30" height="30">
            {flash === Camera.Constants.FlashMode.auto && (
              <>
                <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white" />
              </>
            )}
            {flash === Camera.Constants.FlashMode.on && (
              <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="yellow" />
            )}
            {flash === Camera.Constants.FlashMode.off && (
              <Svg viewBox="0 0 24 24">
                <Polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white" />
                <Line
                  x1="5"
                  y1="5"
                  x2="19"
                  y2="19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </Svg>
            )}
          </Svg>
        </TouchableOpacity>
      </View>

      {flash === Camera.Constants.FlashMode.auto && <Text style={styles.flashText}>Auto</Text>}

      <View style={styles.snapContainer}>
        <TouchableOpacity onPress={() => takePicture()}>
          <FontAwesome name="circle-thin" size={100} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  cameraContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  flashContainer: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
  },
  snapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
  flashText: {
    textAlign: "right",
    paddingRight: 30,
    color: "white",
  },
});
