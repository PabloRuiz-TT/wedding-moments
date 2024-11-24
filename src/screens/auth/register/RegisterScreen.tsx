import { Raleway_400Regular, useFonts } from "@expo-google-fonts/raleway";
import { MotiView } from "moti";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, ScrollView, View } from "react-native";
import { HelperText, IconButton, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { authService, RegisterDTO } from "../../../services/auth";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../../types/navigation.types";

interface RegisterFormData {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
}

const DEFAULT_VALUES: RegisterFormData = {
  nombre: "Pablo Yair",
  email: "pablo@email.com",
  password: "admin123",
  telefono: "998103588",
};

interface FormFieldProps {
  name: keyof RegisterFormData;
  control: any;
  label: string;
  icon: string;
  inputMode?: "text" | "numeric" | "email";
  isPassword?: boolean;
}

const FormField = ({
  name,
  control,
  label,
  icon,
  inputMode = "text",
  isPassword = false,
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <>
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            label={label}
            inputMode={inputMode}
            style={{ backgroundColor: "white" }}
            left={<TextInput.Icon icon={icon} />}
            secureTextEntry={isPassword && !showPassword}
            right={
              isPassword && (
                <TextInput.Icon
                  icon={showPassword ? "eye-off" : "eye"}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )
            }
          />
          {error && (
            <HelperText padding="none" type="error" visible={true}>
              {label} es requerido
            </HelperText>
          )}
        </>
      )}
    />
  );
};

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm<RegisterFormData>({
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  let [] = useFonts({
    Raleway_400Regular,
  });

  const handleRegister = async (data: RegisterFormData) => {
    const { nombre, telefono, email, password } = data;

    try {
      const dto: RegisterDTO = {
        nombre,
        telefono,
        correo: email,
        password,
      };

      const result = await authService.register(dto);

      if (result === null) {
        Alert.alert(
          "Correo duplicado",
          "El correo electrónico ya se encuentra registrado, intenta con otro"
        );
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: ROUTES.ROOT.MAIN }],
        });
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al intentar registrar el usuario");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Text
          variant="headlineLarge"
          style={{ fontFamily: "Raleway_400Regular" }}
        >
          Bienvenido, registra tus datos para continuar
        </Text>

        <View style={{ marginTop: 36, gap: 24 }}>
          <FormField
            name="nombre"
            control={control}
            label="Nombre completo"
            icon="badge-account-outline"
          />

          <FormField
            name="telefono"
            control={control}
            label="Teléfono"
            icon="phone-outline"
            inputMode="numeric"
          />

          <FormField
            name="email"
            control={control}
            label="Correo electrónico"
            icon="email-outline"
            inputMode="email"
          />

          <FormField
            name="password"
            control={control}
            label="Contraseña"
            icon="lock-outline"
            isPassword
          />

          <MotiView
            from={{ opacity: 0, translateY: 50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 1000 }}
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
              onPress={handleSubmit(handleRegister)}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                opacity: 0.9,
              }}
            >
              Registrarme
            </Text>
          </MotiView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
