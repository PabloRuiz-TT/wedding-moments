import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  CameraMode,
  CameraType,
  CameraView,
  FlashMode,
  PermissionStatus,
  useCameraPermissions,
} from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParamList } from "../../../types/navigation.types";
import { Appbar, Card, IconButton, Surface, Text } from "react-native-paper";
import { MotiText, MotiView } from "moti";

export const AuthSkipScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [permission, requestPermissions] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [mode, setMode] = useState<CameraMode>("picture");
  const [flash, setFlash] = useState<FlashMode>("off");
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    if (permission?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permiso denegado",
        "Necesitamos permisos para acceder a la cámara",
        [
          {
            text: "Cancelar",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          {
            text: "Abrir configuración",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    } else {
      requestPermissions();
    }
  }, [permission?.status, permission?.granted, permission?.canAskAgain]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 12,
        gap: 12,
        marginTop: Platform.OS !== "android" ? 20 : 0,
      }}
    >
      {Platform.OS === "android" && (
        <Appbar.Header style={{ backgroundColor: "white" }}>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
      )}

      <TouchableOpacity style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1, borderRadius: 16, overflow: "hidden" }}
          ref={cameraRef}
          flash={flash}
          mode={mode}
          facing={facing}
        />
      </TouchableOpacity>

      <MotiView
        from={{
          opacity: 0,
          translateY: 50,
        }}
        animate={{
          opacity: 1,
          translateY: 0,
        }}
        transition={{
          type: "timing",
          duration: 500,
          delay: 300,
        }}
        style={{ flex: 0.3 }}
      >
        <Card mode="contained">
          <Card.Content>
            <View>
              <Text variant="titleMedium">
                Escanea el código QR de tu amigo para unirte a su grupo
              </Text>
              <Text variant="bodyMedium">
                Al escanear el código QR podrás ver los detalles de la
                invitación que te envió tu amigo y unirte a su grupo
              </Text>
            </View>
          </Card.Content>
        </Card>
      </MotiView>
    </View>
  );
};
