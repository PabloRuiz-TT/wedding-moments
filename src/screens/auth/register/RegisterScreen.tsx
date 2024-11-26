import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { SubmitComponent } from "../components/SubmitComponent";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { getFirebaseAuthError } from "../../../database/firebase";
import { PersonaService } from "../../../services/persona";

type User = {
  email: string;
  password: string;
  nombre: string;
  telefono: string;
};

const RegisterScreen = () => {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
    nombre: "",
    telefono: "",
  });

  const { signUp }: any = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    const personaService = PersonaService.getInstance();

    try {
      const response = await personaService.createPersona(
        user.nombre,
        user.email,
        user.password,
        user.telefono,
        "Admin"
      );

      if (response > 1) {
        try {
          await signUp(user.email, user.password);
        } catch (error: any) {
          const msgError = getFirebaseAuthError(error.code);
          Alert.alert("Error", msgError);
        }
      }
    } catch (error) {
      console.error("Error registrando usuario:", error);
      Alert.alert("Error", "No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.nombre.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.telefono.length > 0
    ) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
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
            secureTextEntry={hidePassword}
            label="Contraseña"
            placeholder="********"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="lock-outline" />}
          />

          <TextInput
            value={user?.telefono}
            onChangeText={(telefono) => setUser({ ...user, telefono })}
            mode="flat"
            inputMode="email"
            label="Correo electrónico"
            placeholder="usuario@email.com"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="phone-outline" />}
          />
        </View>

        <SubmitComponent
          handleSignIn={handleSignUp}
          loading={loading}
          submitEnabled={submitEnabled}
          mainText="Registrarse"
          secondaryText="Registrando..."
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
