import { NavigationProp, Route, RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { BottomNavigation, Icon, Text } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { HomeScreen } from "../screens/ui/main/home/HomeScreen";
import { ItinerarioScreen } from "../screens/ui/main/itinerario/ItinerarioScreen";
import { RegalosScreen } from "../screens/ui/main/regalos/RegalosScreen";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { AlbumScreen } from "../screens/ui/main/album/AlbumScreen";
import { TabsParamList } from "../types/navigation.types";

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

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen />,
    itinerario: () => <ItinerarioScreen />,
    regalos: () => <RegalosScreen />,
    album: () => <AlbumScreen />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes: TABS_ROUTES }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      getLabelText={({ route }) => route.title}
    />
  );
};

type ScreenProps = {
  navigation: NavigationProp<TabsParamList>;
  route: RouteProp<TabsParamList, keyof TabsParamList>;
};
