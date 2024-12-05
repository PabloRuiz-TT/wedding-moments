import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../../types/navigation.types";
import {
  Itinerario,
  ItinerarioService,
} from "../../../services/ItinerarioService";
import { LogService } from "../../../services/LogService";
import { Appbar, Text, TextInput, useTheme } from "react-native-paper";
import {
  Alert,
  Keyboard,
  Platform,
  ScrollView,
  View,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitComponent } from "../../auth/components/SubmitComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TimePickerModal } from "react-native-paper-dates";
import * as Notifications from "expo-notifications";

const itineraryService = ItinerarioService.getInstance();
const logService = LogService.getInstance();

export const ItinearioCrearScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { colors } = useTheme();
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [itirary, setItinerary] = useState<Itinerario>({} as Itinerario);
  const [userId, setUserId] = useState<string>("");
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    if (itirary.titulo && itirary.description) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [itirary]);

  const enviarNotificacion = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Actividad nueva",
        body: "Hemos notificado a tus invitados sobre la nueva actividad.",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  };

  const onSubmit = () => {
    setIsSubmitting(true);
    setEnableSubmit(false);

    itineraryService
      .crearItinerario(itirary, userId)
      .then(() => {
        logService.addLog("Itinerario creado correctamente.");
        enviarNotificacion();
        navigation.goBack();
      })
      .catch((error) => {
        logService.addLog(`Ha ocurrido un error: ${error}`);
        Alert.alert("Error", "Ocurrió un error al crear el itinerario.");
      })
      .finally(() => {
        setIsSubmitting(false);
        setEnableSubmit(true);
      });
  };

  const getFormattedTime = () => {
    if (itirary.hora === undefined || itirary.minuto === undefined) return "";
    return `${String(itirary.hora).padStart(2, "0")}:${String(
      itirary.minuto
    ).padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={[styles.scrollView, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        {Platform.OS === "android" ? (
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Crear Itinerario" />
          </Appbar.Header>
        ) : (
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Crear Itinerario</Text>
            <Text style={styles.subtitle}>
              Crea un itinerario para tu evento y comparte con tus invitados los
              detalles de tu boda.
            </Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <TextInput
            placeholder="Nombre de la actividad"
            value={itirary.titulo}
            onChangeText={(text) => setItinerary({ ...itirary, titulo: text })}
            left={<TextInput.Icon icon="pencil-box-multiple-outline" />}
            style={[styles.input, { backgroundColor: colors.surface }]}
          />

          <TextInput
            placeholder="Descripción"
            value={itirary.description}
            onChangeText={(text) =>
              setItinerary({ ...itirary, description: text })
            }
            left={<TextInput.Icon icon="text-box-outline" />}
            style={[styles.input, { backgroundColor: colors.surface }]}
          />

          <TextInput
            value={getFormattedTime()}
            placeholder="Hora de la actividad"
            left={
              <TextInput.Icon
                icon="clock-outline"
                onPress={() => {
                  Keyboard.dismiss();
                  setShowTimePicker(true);
                }}
              />
            }
            style={[styles.input, { backgroundColor: colors.surface }]}
            editable={false}
          />

          <SubmitComponent
            onPress={onSubmit}
            loading={isSubmitting}
            submitEnabled={!enableSubmit}
            mainText="Crear Itinerario"
            secondaryText="Creando itinerario..."
          />
        </View>
      </ScrollView>

      {showTimePicker && (
        <TimePickerModal
          visible={showTimePicker}
          onDismiss={() => setShowTimePicker(false)}
          onConfirm={({ hours, minutes }) => {
            setItinerary({
              ...itirary,
              hora: hours,
              minuto: minutes,
            });
            setShowTimePicker(false);
          }}
          use24HourClock
          animationType="fade"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Platform.OS === "android" ? 0 : 24,
  },
  headerContainer: {
    gap: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "300",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
  },
  formContainer: {
    marginTop: 24,
    gap: 12,
  },
  input: {
    marginVertical: 4,
  },
});
