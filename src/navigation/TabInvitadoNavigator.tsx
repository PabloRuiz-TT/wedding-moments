import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { HomeScreen } from "../screens/main/home/HomeScreen";
import { ItinerarioScreen } from "../screens/main/itinerario/ItinerarioScreen";
import { RegalosScreen } from "../screens/main/regalos/RegalosScreen";
import { AlbumScreen } from "../screens/main/album/AlbumScreen";
import { StatusBar } from "expo-status-bar";

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
    key: "album",
    title: "Álbum",
    focusedIcon: "image",
    unfocusedIcon: "image-outline",
  },
] as const;

export const TabInvitadoNavigator = () => {
  const [index, setIndex] = useState(0);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <Text>Home Invitado</Text>,
    itinerario: () => <Text>Itinerario Invitado</Text>,
    album: () => <Text>Album Invitado</Text>,
  });

  return (
    <>
      <StatusBar hidden />
      <BottomNavigation
        navigationState={{ index, routes: TABS_ROUTES }}
        keyboardHidesNavigationBar
        onIndexChange={setIndex}
        renderScene={renderScene}
        getLabelText={({ route }) => route.title}
      />
    </>
  );
};
