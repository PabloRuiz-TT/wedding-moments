import { ActivityIndicator, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { HomeEmpty } from "./HomeEmpty";
import { Alert, ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Boda, BodaService } from "../../../services/BodaService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const bodaServicio = BodaService.getInstance();

export const HomeScreen = () => {
  const [user, setUser] = useState<any | null>(null);
  const [boda, setBoda] = useState<Boda | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user]);

  useEffect(() => {
    if (user) {
      (async () => {
        const boda = await bodaServicio.obtenerBodaPorUsuarioId(user.uid);
        setBoda(boda);
        setLoading(false);
      })();
    }
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!boda) {
    return <HomeEmpty />;
  }

  // return (
  //   <ScrollView style={{ flex: 1, padding: 12, backgroundColor: "white" }}>
  //     <View style={{ gap: 2 }}>
  //       <Text
  //         style={{
  //           fontSize: 42,
  //         }}
  //       >
  //         {greet}
  //       </Text>
  //       <Text
  //         style={{
  //           fontSize: 24,
  //         }}
  //       >
  //         Texto
  //       </Text>
  //     </View>

  //     <View
  //       style={{
  //         display: "flex",
  //         flexDirection: "row",
  //         marginTop: 48,
  //         gap: 16,
  //       }}
  //     ></View>
  //   </ScrollView>
  // );
};
