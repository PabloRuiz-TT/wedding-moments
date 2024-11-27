import { ActivityIndicator, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { PersonaService } from "../../../services/persona";
import { StatusBar } from "expo-status-bar";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useHome } from "../../../contexts/home/HomeContext";
import { Evento } from "../../../services/evento";
import { HomeEmpty } from "./HomeEmpty";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const personaService = PersonaService.getInstance();

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [evento, setEvento] = useState<Evento | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const { obtenerBodaByAdministrador }: any = useHome();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const user: any = JSON.parse(
          (await AsyncStorage.getItem("user")) || "{}"
        );

        const userEvento = await obtenerBodaByAdministrador(user.UsuarioID);

        if (userEvento) {
          setEvento(userEvento);
        }
      } catch (error) {
        console.log("Error", error);
      }
    })();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator animating={true} />
      </View>
    );
  }

  return (
    <>
      <StatusBar hidden />

      {!evento ? (
        <HomeEmpty />
      ) : (
        <Text>Evento encontrados {JSON.stringify(evento)}</Text>
      )}
    </>
  );
};
