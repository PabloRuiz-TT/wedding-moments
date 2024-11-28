import { ActivityIndicator, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { HomeEmpty } from "./HomeEmpty";
import { ScrollView, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BodaState, useBodaStore } from "../../../store/useBodaStore";

export const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [boda, setBoda] = useState<BodaState>({} as BodaState);
  const [greet, setGreet] = useState<string>("");

  const { obtenerBodaPorUsuario } = useBodaStore();

  useEffect(() => {
    (async () => {
      const hora = new Date().getHours();

      if (hora >= 0 && hora < 12) {
        setGreet("Buenos días");
      } else if (hora >= 12 && hora < 19) {
        setGreet("Buenas tardes");
      } else {
        setGreet("Buenas noches");
      }

      const userJson = await AsyncStorage.getItem("user");

      const { user } = JSON.parse(userJson || "{}");

      const data = await obtenerBodaPorUsuario(user.uid);

      setBoda(data);

      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (boda) {
    return <HomeEmpty />;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 12, backgroundColor: "white" }}>
      <View style={{ gap: 2 }}>
        <Text
          style={{
            fontSize: 42,
          }}
        >
          {greet}
        </Text>
        <Text
          style={{
            fontSize: 24,
          }}
        >
          Texto
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 48,
          gap: 16,
        }}
      ></View>
    </ScrollView>
  );
};
