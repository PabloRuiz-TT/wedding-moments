import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Appbar, Text } from "react-native-paper";
import { Boda, BodaService } from "../../services/BodaService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";

const bodaService = BodaService.getInstance();

export const HomeInvitadoScreen = () => {
  const [code, setCode] = useState<string>("");
  const [boda, setBoda] = useState<Boda>({} as Boda);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const json = await AsyncStorage.getItem("code");

      const codeParse = JSON.parse(json!);

      if (codeParse) {
        setCode(codeParse);
      }
    })();
  }, []);

  useEffect(() => {
    async () => {
      const result = await bodaService.obtenerBodaPorCode(code);

      if (result) {
        setBoda(result);
      }
    };

    setLoading(false);
  }, [code]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Bienvenido" />
        <Appbar.Action icon="account-circle-outline" />
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text>{JSON.stringify(boda)}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
