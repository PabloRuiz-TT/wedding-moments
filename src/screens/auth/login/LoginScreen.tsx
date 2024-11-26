import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, useTheme } from "react-native-paper";
import { SubmitComponent } from "../components/SubmitComponent";
import { useAuth } from "../../../contexts/auth/AuthContext";
import { getFirebaseAuthError } from "../../../database/firebase";

type User = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [submitEnabled, setSubmitEnabled] = useState<boolean>(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);

  const { signIn }: any = useAuth();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    setLoading(true);

    try {
      await signIn(user.email, user.password);
    } catch (error: any) {
      const msgError = getFirebaseAuthError(error.code);
      Alert.alert("Error", msgError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setSubmitEnabled(true);
    } else {
      setSubmitEnabled(false);
    }
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ fontSize: 32, opacity: 0.9, marginTop: 12 }}>
          Bienvenido, ingresa tus datos para continuar
        </Text>

        <Text style={{ marginTop: 20 }}>
          ¿No tienes cuenta?{" "}
          <Text variant="labelLarge" style={{ color: colors.primary }}>
            Regístrate aquí
          </Text>
        </Text>

        <View style={{ marginTop: 20, gap: 12 }}>
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
            label="Contraseña"
            inputMode="text"
            secureTextEntry={hidePassword}
            placeholder="********"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="lock-outline" />}
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye" : "eye-off"}
                onPress={() => setHidePassword(!hidePassword)}
              />
            }
          />
        </View>

        <SubmitComponent
          handleSignIn={handleSignIn}
          loading={loading}
          submitEnabled={submitEnabled}
          mainText="Iniciar sesión"
          secondaryText="Iniciando sesión..."
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
