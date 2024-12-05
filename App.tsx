import { NavigationContainer } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { PaperProvider, Text } from "react-native-paper";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { registerTranslation } from "react-native-paper-dates";
import { AuthenticationProvider } from "./src/providers/AuthProviders";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { HomeProvider } from "./src/providers/HomeProvider";
import { ItinerarioProvider } from "./src/providers/ItinerarioProvider";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "./src/utils/helpers/NotificacionUtil";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as SplashScreen from "expo-splash-screen";
import { LoadingScreen } from "./src/screens/loading/LoadingScreen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  registerTranslation("es", {
    save: "Aceptar",
    selectSingle: "Fecha",
    selectMultiple: "",
    selectRange: "",
    notAccordingToDateFormat: (inputFormat) =>
      `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later then ${date}`,
    mustBeLowerThan: (date) => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: "Day is not allowed",
    previous: "Anterior",
    next: "Siguiente",
    typeInDate: "Type in date",
    pickDateFromCalendar: "Pick date from calendar",
    close: "Cerrar",
    hour: "",
    minute: "",
  });

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<any>();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();

        setPermissionsGranted(status === "granted");

        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.warn("Error al preparar la app:", error);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token!))
      .catch((err) => console.log("Error al registrar notificaciones:", err));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notificación tocada:", response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  if (!appIsReady) {
    return <LoadingScreen />;
  }

  if (!permissionsGranted) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 20,
            marginTop: 20,
          }}
        >
          Necesitamos acceso a la cámara para usar esta aplicación. Por favor,
          otorga los permisos en la configuración de tu dispositivo.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}
    >
      <PaperProvider>
        <NavigationContainer>
          <AuthenticationProvider>
            <HomeProvider>
              <ItinerarioProvider>
                <GestureHandlerRootView style={styles.container}>
                  <BottomSheetModalProvider>
                    <RootNavigator />
                  </BottomSheetModalProvider>
                </GestureHandlerRootView>
              </ItinerarioProvider>
            </HomeProvider>
          </AuthenticationProvider>
        </NavigationContainer>
      </PaperProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  keyboardAvoidingView: {
    flex: 1,
  },
});
