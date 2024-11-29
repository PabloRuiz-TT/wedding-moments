import { CameraMode, CameraType, CameraView, FlashMode } from "expo-camera";
import React, { useRef, useState } from "react";
import { Appbar } from "react-native-paper";

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import { ImageBackground } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation.types";

export const CameraScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [facing, setFacing] = useState<CameraType>("back");
  const [mode, setMode] = useState<CameraMode>("picture");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [image, setImage] = useState<any | null>(null);
  const cameraRef = useRef<any>(null);

  const handleCapture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
      } catch (error) {}
    }
  };

  const uploadPicture = async () => {
    // let formData = new FormData();
    // const fileUri = image.uri;
    // const fileName = fileUri.split("/").pop();
    // const match = /\.(\w+)$/.exec(fileName);
    // const type = match ? `image/${match[1]}` : "image";
    // const fileObject: any = {
    //   uri: fileUri,
    //   name: fileName,
    //   type: type,
    // };
    // formData.append("file", fileObject);
    // const response = await fetch("http://172.20.10.4:7025/api/upload-images", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: formData,
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      {!image ? (
        <CameraView
          style={styles.cameraView}
          mode={mode}
          facing={facing}
          flash={flash}
          ref={cameraRef}
        >
          <Appbar.Header
            style={{ backgroundColor: "transparent" }}
            statusBarHeight={10}
          >
            <Appbar.Action
              icon="close"
              iconColor="white"
              size={28}
              onPress={() => navigation.goBack()}
            />

            <Appbar.Content
              title="Tomar foto"
              color="white"
              titleStyle={{ fontSize: 18, fontWeight: "bold" }}
            />

            <Appbar.Action
              icon="cached"
              iconColor="white"
              size={28}
              onPress={() => {
                setFacing(facing === "back" ? "front" : "back");
              }}
            />

            <Appbar.Action
              icon={flash === "on" ? "flash" : "flash-off"}
              iconColor="white"
              size={28}
              onPress={() => setFlash(flash === "on" ? "off" : "on")}
            />
          </Appbar.Header>

          <View style={styles.captureButtonContainer}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={handleCapture}
            />
          </View>
        </CameraView>
      ) : (
        <ImageBackground
          source={{ uri: image }}
          style={{ flex: 1 }}
          contentFit="cover"
        >
          <Appbar.Header
            style={{ backgroundColor: "transparent" }}
            statusBarHeight={10}
          >
            <Appbar.Action
              icon="reload"
              iconColor="white"
              size={28}
              onPress={() => setImage(null)}
            />

            <Appbar.Content
              title="Foto capturada"
              color="white"
              titleStyle={{ fontSize: 18, fontWeight: "bold" }}
            />

            <Appbar.Action
              icon="check"
              iconColor="white"
              size={28}
              onPress={uploadPicture}
            />
          </Appbar.Header>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  cameraView: {
    flex: 1,
  },
  captureButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: Platform.select({
      ios: 80,
      android: 40,
    }),
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    borderWidth: 5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
});
