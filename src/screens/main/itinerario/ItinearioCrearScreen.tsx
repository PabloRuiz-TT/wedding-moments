import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { RootStackParamList } from "../../../types/navigation.types";
import {
  Itinerario,
  ItinerarioService,
} from "../../../services/ItinerarioService";
import { LogService } from "../../../services/LogService";
import { ImageBackground } from "expo-image";
import { Appbar, Text, TextInput, useTheme } from "react-native-paper";
import { Alert, Keyboard, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitComponent } from "../../auth/components/SubmitComponent";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TimePickerModal } from "react-native-paper-dates";

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

  const onSubmit = () => {
    setIsSubmitting(true);
    setEnableSubmit(false);

    itineraryService
      .crearItinerario(itirary, userId)
      .then(() => {
        Alert.alert("Itinerario creado", "El itinerario ha sido creado.", [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ]);
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

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        padding: Platform.OS === "android" ? 0 : 24,
      }}
    >
      {Platform.OS === "android" ? (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Crear Itinerario" />
        </Appbar.Header>
      ) : (
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: 300,
            }}
          >
            Crear Itinerario
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: 300,
            }}
          >
            Crea un itinerario para tu evento y comparte con tus invitados los
            detalles de tu boda.
          </Text>
        </View>
      )}

      <View style={{ marginTop: 24, gap: 12 }}>
        <TextInput
          placeholder="Nombre de la actividad"
          value={itirary.titulo}
          onChangeText={(text) => setItinerary({ ...itirary, titulo: text })}
          left={<TextInput.Icon icon="pencil-box-multiple-outline" />}
          style={{ backgroundColor: colors.surface }}
        />

        <TextInput
          placeholder="Descripción"
          value={itirary.description}
          onChangeText={(text) =>
            setItinerary({ ...itirary, description: text })
          }
          left={<TextInput.Icon icon="text-box-outline" />}
          style={{ backgroundColor: colors.surface, marginTop: 8 }}
        />

        <TextInput
          value={
            itirary.hora && itirary.minuto
              ? `${itirary.hora}:${itirary.minuto}`
              : ""
          }
          placeholder="Hora de la actividad"
          left={<TextInput.Icon icon="clock-outline" />}
          style={{ backgroundColor: colors.surface, marginTop: 8 }}
          onFocus={() => {
            setShowTimePicker(true);
            Keyboard.dismiss();
          }}
        />

        <TimePickerModal
          visible={showTimePicker}
          onDismiss={() => setShowTimePicker(false)}
          onConfirm={(time) => {
            const { hours, minutes } = time;

            setItinerary({
              ...itirary,
              hora: hours,
              minuto: minutes,
            });

            setShowTimePicker(false);
          }}
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
  );
};
