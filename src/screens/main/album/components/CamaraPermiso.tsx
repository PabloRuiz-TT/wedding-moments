import React, { useEffect, useState } from "react";
import {
  Platform,
  ScrollView,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { Appbar, Button, List, Text, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../types/navigation.types";
import { permisosCamara } from "../../../../_mocks/permisos";
import { MotiView } from "moti";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera } from "expo-camera";

export const CamaraPermiso = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const [, setHasCameraPermission] = useState(false);

  const isTablet = width >= 768;

  const handleRequestCameraPermission = async () => {
    const cameraPermissions = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraPermissions.status === "granted");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" && (
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={colors.primary}
          />
          <Appbar.Content title="" />
        </Appbar.Header>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollViewContent,
          isTablet && styles.tabletContent,
        ]}
        showsVerticalScrollIndicator={false}
      >
        <MotiView
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "timing", duration: 800 }}
          style={styles.imageContainer}
        >
          <Image
            style={styles.image}
            source={require("../../../../../assets/images/smartphone.png")}
            contentFit="contain"
            transition={500}
          />
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800, delay: 200 }}
        >
          <Text style={styles.title}>
            Permitir a Wedding Moments acceder a la cámara de tu dispositivo
          </Text>
        </MotiView>

        <View
          style={[
            styles.permissionsContainer,
            isTablet && styles.tabletPermissions,
          ]}
        >
          {permisosCamara.map((permiso, index) => (
            <MotiView
              key={permiso.title}
              from={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: "spring",
                delay: 400 + index * 200,
                damping: 15,
              }}
              style={styles.permissionItem}
            >
              <List.Item
                titleStyle={styles.permissionTitle}
                descriptionStyle={styles.permissionDescription}
                title={permiso.title}
                description={permiso.description}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon={permiso.icon}
                    color={colors.primary}
                  />
                )}
                style={styles.listItem}
              />
            </MotiView>
          ))}
        </View>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800, delay: 1000 }}
          style={styles.buttonContainer}
        >
          <Button mode="text" onPress={handleRequestCameraPermission}>
            Continuar
          </Button>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 24,
    paddingBottom: 40,
  },
  tabletContent: {
    paddingHorizontal: 48,
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  image: {
    width: 160,
    height: 160,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 36,
  },
  permissionsContainer: {
    marginBottom: 32,
  },
  tabletPermissions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  permissionItem: {
    backgroundColor: "rgba(0,0,0,0.02)",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  permissionDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  listItem: {
    padding: 16,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    borderRadius: 12,
    minWidth: 200,
    elevation: 0,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
