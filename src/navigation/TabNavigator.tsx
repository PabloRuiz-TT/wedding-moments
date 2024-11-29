import React, { useEffect, useState } from "react";
import { BottomNavigation } from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { HomeScreen } from "../screens/main/home/HomeScreen";
import { ItinerarioScreen } from "../screens/main/itinerario/ItinerarioScreen";
import { RegalosScreen } from "../screens/main/regalos/RegalosScreen";
import { AlbumScreen } from "../screens/main/album/AlbumScreen";
import { Alert } from "react-native";
import { Camera, PermissionStatus } from "expo-camera";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList, ROUTES } from "../types/navigation.types";
import { useNavigation } from "@react-navigation/native";

export const TABS_ROUTES: BaseRoute[] = [
  {
    key: "home",
    title: "Inicio",
    focusedIcon: "home",
    unfocusedIcon: "home-outline",
  },
  {
    key: "itinerario",
    title: "Itinerario",
    focusedIcon: "map",
    unfocusedIcon: "map-outline",
  },
  {
    key: "regalos",
    title: "Regalos",
    focusedIcon: "gift",
    unfocusedIcon: "gift-outline",
  },
  {
    key: "album",
    title: "Álbum",
    focusedIcon: "image",
    unfocusedIcon: "image-outline",
  },
] as const;

export const TabNavigator = () => {
  const [index, setIndex] = useState(0);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen />,
    itinerario: () => <ItinerarioScreen />,
    regalos: () => <RegalosScreen />,
    album: () => <AlbumScreen />,
  });

  const checkCameraPermissions = async () => {
    try {
      const { status, granted } = await Camera.getCameraPermissionsAsync();

      if (!granted || status !== PermissionStatus.GRANTED) {
        navigation.navigate(ROUTES.ROOT.CAMARA_PERMISO);
      }
    } catch (error) {
      console.error("Error al verificar permisos de cámara:", error);
    }
  };

  useEffect(() => {
    checkCameraPermissions();
  }, []);

  return (
    <BottomNavigation
      navigationState={{ index, routes: TABS_ROUTES }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      getLabelText={({ route }) => route.title}
    />
  );
};
