import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { HelperText, IconButton, Text, TextInput } from "react-native-paper";
import { Raleway_400Regular, useFonts } from "@expo-google-fonts/raleway";
import { MotiView } from "moti";
const defaultValues = {
  nombre: "",
  email: "",
  password: "",
  telefono: "",
};

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ defaultValues });

  let [fontsLoaded] = useFonts({
    Raleway_400Regular,
  });

  const onSubmit = handleSubmit((data) => {
    Alert.alert("Datos del formulario", JSON.stringify(data));
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <Text
        variant="headlineLarge"
        style={{
          fontFamily: "Raleway_400Regular",
        }}
      >
        Bienvenido, registra tus datos para continuar
      </Text>

      <View style={{ marginTop: 36, gap: 24 }}>
        <Controller
          name="nombre"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                label="Nombre completo"
                inputMode="text"
                style={{
                  backgroundColor: "white",
                }}
                left={<TextInput.Icon icon="badge-account-outline" />}
              />
              {error && (
                <HelperText padding="none" type="error" visible={true}>
                  El nombre es requerido
                </HelperText>
              )}
            </>
          )}
        />

        <Controller
          name="telefono"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                label="Telefono"
                inputMode="tel"
                style={{
                  backgroundColor: "white",
                }}
                left={<TextInput.Icon icon="badge-account-outline" />}
              />
              {error && (
                <HelperText padding="none" type="error" visible={true}>
                  El telefono es requerido
                </HelperText>
              )}
            </>
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                label="Correo electronico"
                placeholder="user@email.com"
                inputMode="email"
                style={{
                  backgroundColor: "white",
                }}
                left={<TextInput.Icon icon="email-outline" />}
              />
              {error && (
                <HelperText padding="none" type="error" visible={true}>
                  El correo electronico es requerido
                </HelperText>
              )}
            </>
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field, fieldState: { error } }) => (
            <>
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                label="Contraseña"
                placeholder="********"
                secureTextEntry={false}
                style={{
                  backgroundColor: "white",
                }}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={false ? "eye-off" : "eye"}
                    onPress={() => {}}
                  />
                }
              />

              {error && (
                <HelperText type="error" visible={true}>
                  La contraseña es requerida
                </HelperText>
              )}
            </>
          )}
        />

        <MotiView
          from={{ opacity: 0, translateY: 50 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 1000, delay: 0 }}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            marginTop: 20,
          }}
        >
          <IconButton
            icon="arrow-right"
            mode="contained"
            disabled={!isDirty || !isValid}
            onPress={onSubmit}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              opacity: 0.9,
            }}
          >
            Iniciar sesión
          </Text>
        </MotiView>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
