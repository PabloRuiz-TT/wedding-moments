import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaView } from "react-native-safe-area-context";
import { Evento } from "../../../services/evento";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useHome } from "../../../contexts/home/HomeContext";
import { useAuth } from "../../../contexts/auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeCrearBodaScreen = () => {
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(true);
  const [fechaBoda, setFechaBoda] = useState<Date | undefined>(undefined);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<any>>();
  const { crearBoda } = useHome();
  const [user, setUser] = useState<any>();

  const [evento, setEvento] = useState<Partial<Evento>>({
    titulo: "Mi Boda",
    descripcion: "Hola, te invito a mi boda",
    novio: "Juan",
    novia: "Maria",
    fechaEvento: new Date().toISOString(),
  });

  type DatePickerResponse = {
    date: Date;
    type: "dismissed" | "confirmed";
  };

  const onConfirm = ({ date }: DatePickerResponse) => {
    setFechaBoda(date);
    setTimeout(() => {
      setShowDatePicker(false);
    }, 0);
  };

  const onDismiss = () => {
    setTimeout(() => {
      setShowDatePicker(false);
    }, 0);
  };

  useEffect(() => {
    (async () => {
      const user = JSON.parse((await AsyncStorage.getItem("user")) || "{}");

      if (user) {
        setUser(user);
      }
    })();
  }, []);

  const handleCrearBoda = async () => {
    const newData: Evento = {
      titulo: evento?.titulo || "",
      descripcion: evento?.descripcion || "",
      novio: evento?.novio || "",
      novia: evento?.novia || "",
      fechaEvento: fechaBoda?.toISOString() || "",
      usuarioID: user?.UsuarioID,
      ubicacion: "",
    };

    try {
      const response = await crearBoda(newData);
      if (response > 0) {
        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", padding: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
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
              label="Titulo"
              value={evento?.titulo}
              onChangeText={(text) => setEvento({ ...evento, titulo: text })}
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
              label="Mensaje"
              value={evento?.descripcion}
              onChangeText={(text) =>
                setEvento({ ...evento, descripcion: text })
              }
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
              label="Novio"
              value={evento?.novio}
              onChangeText={(text) => setEvento({ ...evento, novio: text })}
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
              label="Novia"
              value={evento?.novia}
              onChangeText={(text) => setEvento({ ...evento, novia: text })}
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
              value={fechaBoda ? fechaBoda.toLocaleDateString() : ""}
              editable={false}
              onPressIn={() => setShowDatePicker(true)}
            />
            <DatePickerModal
              locale="es"
              mode="single"
              presentationStyle="pageSheet"
              visible={showDatePicker}
              onDismiss={onDismiss}
              date={fechaBoda}
              onConfirm={(date) => onConfirm(date as DatePickerResponse)}
              allowEditing={false}
              inputEnabled={false}
              label="Fecha de nacimiento"
            />
          </View>

          <Button
            mode="text"
            disabled={!submitEnabled}
            onPress={handleCrearBoda}
            style={{ marginTop: 20 }}
          >
            Crear Boda
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
