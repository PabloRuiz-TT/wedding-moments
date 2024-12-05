import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

// Configuración de cómo se comportarán las notificaciones cuando la app está en primer plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Función para registrar el dispositivo y obtener el token
export async function registerForPushNotificationsAsync() {
  let token;

  // Verificamos si es un dispositivo físico (no un emulador)
  if (Device.isDevice) {
    // Verificamos los permisos actuales
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    // Si no tenemos permisos, los solicitamos
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Si no se concedieron los permisos, retornamos
    if (finalStatus !== "granted") {
      console.log("No se obtuvieron permisos para las notificaciones push");
      return null;
    }

    // Obtenemos el token de Expo
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId ?? "",
      })
    ).data;
  } else {
    console.log("Las notificaciones push requieren un dispositivo físico");
  }

  // Para Android, configuramos el canal de notificaciones
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
