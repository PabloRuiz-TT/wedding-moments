import React, { useEffect, useState } from "react";
import {
  Appbar,
  Avatar,
  BottomNavigation,
  Text,
  useTheme,
} from "react-native-paper";
import { BaseRoute } from "react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigation";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Boda, BodaService } from "../services/BodaService";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation.types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import { Image } from "expo-image";
import { AlbumInvitadoScreen } from "./screens/AlbumInvitadoScreen";

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

const HomeInvitadoScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Home Invitado</Text>
    </SafeAreaView>
  );
};

const ItinerarioInvitadoScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>Itinerario Invitado</Text>
    </SafeAreaView>
  );
};
