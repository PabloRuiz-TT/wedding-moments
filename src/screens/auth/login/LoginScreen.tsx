import React, { useEffect, useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import { Appbar, Text, TextInput, useTheme } from "react-native-paper";
import { SubmitComponent } from "../components/SubmitComponent";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation.types";
import { useAuthStore } from "../../../store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

type UserLogin = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const { colors } = useTheme();
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { login } = useAuthStore();

  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onSubmit = async () => {
    setIsSubmitting(true);
    setEnableSubmit(false);
    try {
      const result = await login(userLogin.email, userLogin.password);

      await AsyncStorage.setItem("user", JSON.stringify(result));

      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error", error);
    } finally {
      setIsSubmitting(false);
      setEnableSubmit(true);
    }
  };

  useEffect(() => {
    if (userLogin.email && userLogin.password) {
      setEnableSubmit(true);
    } else {
      setEnableSubmit(false);
    }
  }, [userLogin]);

  return (
    <>
      {Platform.OS === "android" && (
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="Iniciar sesión" />
        </Appbar.Header>
      )}

      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 32, opacity: 0.9 }}>
          Bienvenido, ingresa tus datos para continuar
        </Text>

        <Text style={{ marginTop: 20 }}>
          ¿No tienes cuenta?{" "}
          <Text
            onPress={() =>
              navigation.navigate("Auth", {
                screen: "Register",
              })
            }
            variant="labelLarge"
            style={{ color: colors.primary }}
          >
            Regístrate aquí
          </Text>
        </Text>

        <View style={{ marginTop: 20, gap: 12 }}>
          <TextInput
            value={userLogin.email}
            onChangeText={(email) => setUserLogin({ ...userLogin, email })}
            mode="flat"
            inputMode="email"
            label="Correo electrónico"
            placeholder="usuario@email.com"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="email-outline" />}
          />

          <TextInput
            value={userLogin.password}
            onChangeText={(password) =>
              setUserLogin({ ...userLogin, password })
            }
            mode="flat"
            label="Contraseña"
            inputMode="text"
            secureTextEntry
            placeholder="********"
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon="lock-outline" />}
            right={<TextInput.Icon icon="eye-off" />}
          />
        </View>

        <SubmitComponent
          onPress={onSubmit}
          loading={isSubmitting}
          submitEnabled={!enableSubmit}
          mainText="Iniciar sesión"
          secondaryText="Iniciando sesión..."
        />
      </ScrollView>
    </>
  );
};
