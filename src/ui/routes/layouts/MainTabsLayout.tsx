import { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import HomeScreen from "../../screens/ui/main/home/HomeScreen";
import PagePrimary from "../../screens/ui/main/home/PagePrimary"
import { ItinerarioScreen } from "../../screens/ui/main/itinerario/ItinerarioScreen";
import { RegalosScreen } from "../../screens/ui/main/regalos/RegalosScreen";
import { AlbumScreen } from "../../screens/ui/main/album/AlbumScreen";

export const MainTabsLayout = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState<BaseRoute[]>([
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
      key: "photos",
      title: "Album",
      focusedIcon: "image",
      unfocusedIcon: "image-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: () => <HomeScreen />,
    itinerario: () => <ItinerarioScreen />,
    regalos: () => <RegalosScreen />,
    photos: () => <AlbumScreen />,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};
