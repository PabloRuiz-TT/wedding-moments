import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import { Appbar, Text, TextInput } from "react-native-paper";
import { SubmitComponent } from "../components/SubmitComponent";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Register, useAuthStore } from "../../../store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogService } from "../../../services/LogService";

const logService = LogService.getInstance();

export const RegisterScreen = () => {
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register } = useAuthStore();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [user, setUser] = useState<Register>({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    setEnableSubmit(false);
    try {
      await register(user);
    } catch (error: any) {
      logService.addLog({ error: error.message });
      Alert.alert("Error", "Hubo un error al registrar tu cuenta");
    } finally {
      setIsSubmitting(false);
      setEnableSubmit(true);
    }
  };

  useEffect(() => {
    if (user.nombre && user.apellido && user.email && user.password) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [user]);

  return (
    <>
      {Platform.OS === "android" && (
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Registrame" />
        </Appbar.Header>
      )}

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text
          variant="headlineLarge"
          style={{ fontFamily: "Raleway_400Regular" }}
        >
          Bienvenido, registra tus datos para continuar
        </Text>

        <View style={{ marginTop: 20, gap: 12 }}>
          <TextInput
            value={user?.nombre}
            onChangeText={(nombre) => setUser({ ...user, nombre })}
            mode="flat"
            inputMode="text"
            label="Nombre"
            placeholder="Nombre"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="account-outline" />}
          />

          <TextInput
            value={user?.apellido}
            onChangeText={(apellido) => setUser({ ...user, apellido })}
            mode="flat"
            inputMode="text"
            label="Apellido(s)"
            placeholder="Apellido"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="account-outline" />}
          />

          <TextInput
            value={user?.email}
            onChangeText={(email) => setUser({ ...user, email })}
            mode="flat"
            inputMode="email"
            label="Correo electrónico"
            placeholder="usuario@email.com"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="email-outline" />}
          />

          <TextInput
            value={user?.password}
            onChangeText={(password) => setUser({ ...user, password })}
            mode="flat"
            inputMode="text"
            label="Contraseña"
            secureTextEntry
            placeholder="********"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="lock-outline" />}
          />

          <TextInput
            value={user?.telefono}
            onChangeText={(telefono) => setUser({ ...user, telefono })}
            mode="flat"
            inputMode="tel"
            label="Teléfono"
            placeholder="123-456-7890"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="phone-outline" />}
          />
        </View>

        <SubmitComponent
          onPress={onSubmit}
          loading={isSubmitting}
          submitEnabled={!enableSubmit}
          mainText="Registrarme"
          secondaryText="Creando cuenta..."
        />
      </ScrollView>
    </>
  );
};
