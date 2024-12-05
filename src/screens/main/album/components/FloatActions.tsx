import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View } from "moti";
import { IconButton, Surface } from "react-native-paper";
import { RootStackParamList, ROUTES } from "../../../../types/navigation.types";
import { useEffect, useRef } from "react";
import {
  Camera,
  CameraType,
  CameraCapturedPicture,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

export const FloatActions = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [permission, requestPermission] = useCameraPermissions();

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Surface
          elevation={1}
          style={{
            maxWidth: 150,
            width: 150,
            borderRadius: 150,
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <IconButton
              icon="camera"
              containerColor="black"
              iconColor="white"
              onPress={() => navigation.navigate(ROUTES.ROOT.CAMARA_SCREEN)}
            />
            <IconButton icon="video" containerColor="black" iconColor="white" />
          </View>
        </Surface>
      </View>
    </>
  );
};
