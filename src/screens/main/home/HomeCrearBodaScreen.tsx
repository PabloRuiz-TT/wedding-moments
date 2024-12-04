import React, { useEffect, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
import { Appbar, HelperText, Text, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation.types";
import { SubmitComponent } from "../../auth/components/SubmitComponent";
import { DatePickerModal } from "react-native-paper-dates";
import { Boda, BodaService } from "../../../services/BodaService";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LogService } from "../../../services/LogService";

const bodaService = BodaService.getInstance();
const logService = LogService.getInstance();

export const HomeCrearBodaScreen = () => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  type DatePickerResponse = {
    date: Date;
    type: "dismissed" | "confirmed";
  };

  const [boda, setBoda] = useState<Boda>({
    titulo: "",
    mensaje: "",
    fechaBoda: "",
    novio: "",
    novia: "",
  });

  const onConfirm = ({ date }: DatePickerResponse) => {
    setBoda({ ...boda, fechaBoda: date.toLocaleDateString() });
    setTimeout(() => {
      setShowDatePicker(false);
    }, 0);
  };

  const onDismiss = () => {
    setTimeout(() => {
      setShowDatePicker(false);
    }, 0);
  };

  const onSubmit = async () => {
    setIsSubmitting(true);

    await bodaService
      .crearBoda(boda, userId)
      .then(() => {
        navigation.goBack();

        setTimeout(() => {
          navigation.navigate("HomeMapScreen");
        }, 200);
      })
      .catch((error) => {
        logService.addLog(`Error al crear boda: ${error}`);
        console.log(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    if (
      boda.titulo &&
      boda.mensaje &&
      boda.novio &&
      boda.novia &&
      boda.fechaBoda
    ) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [boda]);

  return (
    <>
      {Platform.OS === "android" ? (
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="" />
        </Appbar.Header>
      ) : null}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, padding: 20 }}
      >
        <Text
          style={{
            fontSize: 42,
            fontFamily: "Quicksand_400Regular",
          }}
        >
          Nueva Boda
        </Text>

        <View style={{ marginTop: 20, gap: 8 }}>
          <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextInput
              value={boda?.titulo}
              onChangeText={(text) => setBoda({ ...boda, titulo: text })}
              label="Titulo"
              mode="flat"
              inputMode="text"
              style={{ backgroundColor: "white" }}
              right={<TextInput.Icon icon="pencil-box-outline" />}
            />
            <HelperText type="info" padding="none">
              Este es el título que verán tus invitados
            </HelperText>
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextInput
              value={boda?.mensaje}
              onChangeText={(text) => setBoda({ ...boda, mensaje: text })}
              label="Mensaje"
              mode="flat"
              inputMode="text"
              multiline
              numberOfLines={4}
              style={{ backgroundColor: "white", paddingTop: 10 }}
              right={<TextInput.Icon icon="message-text-outline" />}
            />

            <HelperText type="info" padding="none">
              Este es el mensaje que verán tus invitados
            </HelperText>
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextInput
              value={boda?.novio}
              onChangeText={(text) => setBoda({ ...boda, novio: text })}
              label="Novio"
              mode="flat"
              inputMode="text"
              style={{ backgroundColor: "white" }}
              right={<TextInput.Icon icon="account-outline" />}
            />

            <HelperText type="info" padding="none">
              Nombre del novio que aparecerá en la invitación
            </HelperText>
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextInput
              value={boda?.novia}
              onChangeText={(text) => setBoda({ ...boda, novia: text })}
              label="Novia"
              mode="flat"
              inputMode="text"
              style={{ backgroundColor: "white" }}
              right={<TextInput.Icon icon="account-outline" />}
            />

            <HelperText type="info" padding="none">
              Nombre de la novia que aparecerá en la invitación
            </HelperText>
          </View>

          <View style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <TextInput
              inputMode="text"
              style={{ backgroundColor: "white" }}
              label="Fecha de la boda"
              right={
                <TextInput.Icon
                  icon="calendar-outline"
                  onPress={() => setShowDatePicker(true)}
                />
              }
              value={boda?.fechaBoda}
              editable={false}
              onPressIn={() => setShowDatePicker(true)}
            />
            <DatePickerModal
              locale="es"
              mode="single"
              presentationStyle="pageSheet"
              visible={showDatePicker}
              onDismiss={onDismiss}
              date={new Date()}
              onConfirm={(date) => onConfirm(date as DatePickerResponse)}
              allowEditing={false}
              inputEnabled={false}
              label="Fecha de nacimiento"
            />
          </View>

          <SubmitComponent
            onPress={onSubmit}
            loading={isSubmitting}
            submitEnabled={!enableSubmit}
            mainText="Crear Boda"
            secondaryText="Preparando tu boda..."
          />
        </View>
      </ScrollView>
    </>
  );
};
