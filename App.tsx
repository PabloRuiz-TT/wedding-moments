import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
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
