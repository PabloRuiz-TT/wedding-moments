import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { Appbar, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../types/navigation.types";
import {
  Itinerario,
  ItinerarioService,
} from "../../../services/ItinerarioService";
import { View } from "moti";
import { TimePickerModal } from "react-native-paper-dates";
import { SubmitComponent } from "../../auth/components/SubmitComponent";
import { LogService } from "../../../services/LogService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const itineraryService = ItinerarioService.getInstance();
const logService = LogService.getInstance();

export const ItinearioCrearScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [itinerario, setItinerario] = useState<Itinerario>({} as Itinerario);
  const [showTimeInicio, setShowTimeInicio] = useState<boolean>(false);
  const [showTimeFin, setShowTimeFin] = useState<boolean>(false);
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const onConfirm = useCallback(
    ({ hours, minutes }: any) => {
      setShowTimeInicio(false);
      setItinerario({
        ...itinerario,
        horaInicio: hours,
        minutoInicio: minutes,
      });
    },
    [showTimeInicio]
  );

  const onConfirm2 = useCallback(
    ({ hours, minutes }: any) => {
      setShowTimeFin(false);
      setItinerario({
        ...itinerario,
        horaFin: hours,
        minutoFin: minutes,
      });
    },
    [showTimeInicio]
  );

  const onSubmit = async () => {
    setIsSubmitting(true);
    setEnableSubmit(false);
    try {
      await itineraryService.crearItinerario(itinerario, userId);

      navigation.goBack();
    } catch (error: any) {
      logService.addLog(
        `Ha ocurrido un error al crear el itinerario: ${error}`
      );
      Alert.alert("Error", "Ocurrió un error al crear el itinerario");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (
      itinerario.titulo &&
      itinerario.description &&
      itinerario.horaInicio &&
      itinerario.minutoInicio &&
      itinerario.horaFin &&
      itinerario.minutoFin
    ) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [itinerario]);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  return (
    <>
      {Platform.OS === "android" ? (
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Crear itinerario" />
        </Appbar.Header>
      ) : (
        <Text style={{ fontSize: 36, margin: 12 }}>Nuevo Itinerario</Text>
      )}

      <SafeAreaView style={{ flex: 1, paddingHorizontal: 16 }}>
        <View style={{ gap: 12 }}>
          <TextInput
            value={itinerario.titulo}
            label={"Título"}
            onChangeText={(text) =>
              setItinerario({ ...itinerario, titulo: text })
            }
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="pencil-outline" />}
          />

          <TextInput
            value={itinerario.description}
            label={"Descripción"}
            onChangeText={(text) =>
              setItinerario({ ...itinerario, description: text })
            }
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="note-outline" />}
          />

          <View>
            <TextInput
              value={`${itinerario.horaInicio ?? 12}:${
                itinerario.minutoInicio ?? 0
              }`}
              onPressIn={() => setShowTimeInicio(true)}
              style={{ backgroundColor: "white" }}
              left={<TextInput.Icon icon="clock-fast" />}
            />
            <TimePickerModal
              visible={showTimeInicio}
              hours={itinerario ? itinerario.horaInicio : 0}
              minutes={itinerario ? itinerario.minutoInicio : 0}
              onDismiss={() => {
                setShowTimeInicio(false);
              }}
              onConfirm={onConfirm}
              animationType="fade"
              defaultInputType="picker"
            />
          </View>

          <View>
            <TextInput
              value={`${itinerario.horaFin ?? 12}:${itinerario.minutoFin ?? 0}`}
              onPressIn={() => setShowTimeFin(true)}
              style={{ backgroundColor: "white" }}
              left={<TextInput.Icon icon="clock-check-outline" />}
            />
            <TimePickerModal
              visible={showTimeFin}
              hours={itinerario ? itinerario.horaFin : 0}
              minutes={itinerario ? itinerario.minutoFin : 0}
              onDismiss={() => {
                setShowTimeFin(false);
              }}
              onConfirm={onConfirm2}
              animationType="fade"
              defaultInputType="picker"
            />
          </View>

          <SubmitComponent
            onPress={onSubmit}
            loading={isSubmitting}
            submitEnabled={!enableSubmit}
            mainText="Crear itinerario"
            secondaryText="Creando itinerario..."
          />
        </View>
      </SafeAreaView>
    </>
  );
};
