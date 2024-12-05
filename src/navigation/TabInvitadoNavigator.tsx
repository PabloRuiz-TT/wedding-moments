import React, { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { BodaService } from "../services/BodaService";
import { AlbumInvitadoScreen } from "./screens/AlbumInvitadoScreen";
import { HomeInvitadoScreen } from "./screens/HomeInvitadoScreen";

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
    home: () => <HomeInvitadoScreen />,
    itinerario: () => <ItinerarioInvitadoScreen />,
    album: () => <AlbumInvitadoScreen />,
  });

  return (
    <>
      <StatusBar hidden />
      <BottomNavigation
        shifting={true}
        navigationState={{ index, routes: TABS_ROUTES }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        getLabelText={({ route }) => route.title}
      />
    </>
  );
};

const bodaService = BodaService.getInstance();

const ItinerarioInvitadoScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Itinerario Invitado</Text>
    </SafeAreaView>
  );
};
