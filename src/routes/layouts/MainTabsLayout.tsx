import { useState } from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";

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
    home: () => <Text>Hola</Text>,
    itinerario: () => <Text>Hola</Text>,
    regalos: () => <Text>Hola</Text>,
    photos: () => <Text>Hola</Text>,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: "#fff" }}
    />
  );
};
