import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Appbar, Text, Menu, Divider } from "react-native-paper";
import { Boda, BodaService } from "../../services/BodaService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const bodaService = BodaService.getInstance();

export const HomeInvitadoScreen = () => {
  const [code, setCode] = useState<string>("");
  const [boda, setBoda] = useState<Boda>({} as Boda);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      await AsyncStorage.removeItem("code");
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

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
    const fetchBoda = async () => {
      const result = await bodaService.obtenerBodaPorCode(code);
      if (result) {
        setBoda(result);
      }
    };

    if (code) {
      fetchBoda();
    }
    setLoading(false);
  }, [code]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Bienvenido" />
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="account-circle-outline" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={handleLogout}
            title="Cerrar sesión"
            leadingIcon="logout"
          />
        </Menu>
      </Appbar.Header>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <Text>{JSON.stringify(boda)}</Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
