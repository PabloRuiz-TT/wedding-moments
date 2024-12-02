import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { AnimatedFAB, Button, List, useTheme } from "react-native-paper";
import { MotiView } from "moti";
import { itineraryServices } from "../../../_mocks/services";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation.types";
import { LoadingScreen } from "../../loading/LoadingScreen";
import {
  Itinerario,
  ItinerarioService,
} from "../../../services/ItinerarioService";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { schedulePushNotification } from "../../../config/notification";
import * as Notifications from "expo-notifications";
const itinerarioService = ItinerarioService.getInstance();

export const ItinerarioScreen = ({
  style,
  isExtended,
  visible,
  onScroll,
}: any) => {
  const { colors } = useTheme();
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [itinerarios, setItinerarios] = useState<Itinerario[]>([]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      const data = await itinerarioService.obtenerItinerariosPorUsuario(userId);
      if (data?.length > 0) {
        setItinerarios(data);
      }
      setLoading(false);
    })();
  }, [userId]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ flex: 1, padding: 16 }} onScroll={onScroll}>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Itinerario</Text>

          <List.Section title="Actividades">
            {itinerarios.map((itinerario, index) => (
              <MotiView
                key={itinerario.titulo}
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: "spring",
                  delay: index * 100,
                }}
              >
                <List.Accordion
                  style={{ backgroundColor: "white" }}
                  title={itinerario.titulo}
                >
                  <List.Item
                    title={itinerario.description}
                    description={`Hora de inicio: ${itinerario.horaInicio}:${itinerario.minutoInicio} - Hora fin${itinerario.horaFin}:${itinerario.minutoFin}`}
                  />
                </List.Accordion>
              </MotiView>
            ))}
          </List.Section>

          <Button
            onPress={async () => {
              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: false,
                }),
              });
            }}
          >
            Notificacion
          </Button>
        </View>
      </ScrollView>

      <AnimatedFAB
        icon="plus"
        label="Agregar actividad"
        extended={isExtended}
        onPress={() => navigation.navigate("ItinerarioCrear")}
        visible={visible}
        animateFrom="right"
        iconMode="dynamic"
        style={[styles.fabStyle, style]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 36,
  },
  fabStyle: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
